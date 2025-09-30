"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls, Environment, Html, useGLTF, Center } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Group } from "three";
import * as THREE from "three";
import { useSearchParams } from "next/navigation";

type Props = {
  reduceMotion?: boolean;
  coupleNames: { bride: string; groom: string };
  date: string;
  onBoatReady?: () => void;
};

// Water surface baseline and amplitude
const WATER_Y = 0.3; // Water at sea level
const WAVE_AMP = 0.05; // must match wave height in Waves
const BOAT_CLEARANCE = 0.5; // vertical distance from water crest to boat bottom

function BoatModel({ scale = 0.02, onLoaded }: { scale?: number; onLoaded?: () => void }) {
  const { scene } = useGLTF("/models/svitzer_gelliswick_-_fishing_boat_3d_scan.glb");

  const optimizedScene = useMemo(() => scene.clone(true), [scene]);
  const hasNotified = useRef(false);

  useEffect(() => {
    optimizedScene.traverse((child: THREE.Object3D) => {
      if (!("isMesh" in child) || !(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mat = mesh.material;
      if (!mat) return;
      const materials = Array.isArray(mat) ? mat : [mat];

      materials.forEach((material) => {
        if (!(material instanceof THREE.MeshStandardMaterial)) return;
        material.roughness = material.roughness ?? 0.5;
        material.metalness = material.metalness ?? 0.0;

        const texture = material.map;
        if (!texture || !texture.image || material.userData.optimizedTexture) return;
        const image = texture.image as HTMLImageElement | HTMLCanvasElement;
        const MAX_SIZE = 1024;
        if (image.width <= MAX_SIZE && image.height <= MAX_SIZE) return;

        const canvas = document.createElement("canvas");
        canvas.width = Math.min(MAX_SIZE, image.width);
        canvas.height = Math.min(MAX_SIZE, image.height);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          texture.image = canvas;
          texture.needsUpdate = true;
          material.userData.optimizedTexture = true;
        }
      });
    });

    if (!hasNotified.current) {
      hasNotified.current = true;
      onLoaded?.();
    }
  }, [optimizedScene, onLoaded]);

  return (
    <group scale={scale} position={[0, 1, 0]}>
      <Center bottom rotation={[0, Math.PI / 1.4, 0]}>
        <primitive object={optimizedScene} />
      </Center>
    </group>
  );
}

function FloatBoat({ 
  children, 
  reduceMotion, 
  targetPosition = { x: 0, y: 0, z: 0 },
  initialPosition = targetPosition,
  onArrived,
}: { 
  children: React.ReactNode; 
  reduceMotion?: boolean;
  targetPosition?: { x: number; y: number; z: number };
  initialPosition?: { x: number; y: number; z: number };
  onArrived?: () => void;
}) {
  const ref = useRef<Group>(null!);
  const currentPosition = useRef({ ...initialPosition });
  const hasArrived = useRef(false);

  useEffect(() => {
    currentPosition.current = { ...initialPosition };
    if (ref.current) {
      ref.current.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    }
  }, [initialPosition]);

  useEffect(() => {
    hasArrived.current = false;
  }, [targetPosition]);
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const base = WATER_Y; // water baseline
    const amp = reduceMotion ? 0 : WAVE_AMP;
    const freq = 0.8;
    const x = 0, z = 0; // boat at origin
    const h = base + amp * Math.sin(freq * x + t) * Math.cos(freq * z + t);
    const clearance = BOAT_CLEARANCE; // keep hull above peak waves

    // Lerp to target position with delta-based damping
    const damping = reduceMotion ? 4 : 6;
    currentPosition.current.x = THREE.MathUtils.damp(
      currentPosition.current.x,
      targetPosition.x,
      damping,
      delta
    );
    currentPosition.current.z = THREE.MathUtils.damp(
      currentPosition.current.z,
      targetPosition.z,
      damping,
      delta
    );
    
    ref.current.position.y = h + clearance + targetPosition.y;
    ref.current.position.x = currentPosition.current.x;
    ref.current.position.z = currentPosition.current.z;
    
    if (!reduceMotion) {
      ref.current.rotation.z = 0.03 * Math.sin(freq * x + t + Math.PI / 2);
      ref.current.rotation.x = 0.02 * Math.cos(freq * z + t + Math.PI / 2);
    }

    const distanceXZ = Math.hypot(
      targetPosition.x - currentPosition.current.x,
      targetPosition.z - currentPosition.current.z
    );

    if (!hasArrived.current && distanceXZ < 0.05) {
      hasArrived.current = true;
      onArrived?.();
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Waves({ reduceMotion }: { reduceMotion?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
const basePositions = useRef<Float32Array>(new Float32Array());
  const frameSkip = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const attribute = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    basePositions.current = new Float32Array(attribute.array as Float32Array);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const attribute = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const base = basePositions.current ?? positions;

    // Skip frames to reduce CPU cost when animations are heavy
    const skipModulo = reduceMotion ? 4 : 2;
    frameSkip.current = (frameSkip.current + 1) % skipModulo;
    if (frameSkip.current !== 0) return;

    const t = state.clock.getElapsedTime();
    const amp = reduceMotion ? 0 : WAVE_AMP;
    const freq = 0.6;

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      positions[i + 2] = amp * Math.sin(freq * x + t) * Math.cos(freq * y + t);
    }

    attribute.needsUpdate = true;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, WATER_Y, 0]} receiveShadow>
      <planeGeometry args={[10, 10, 49, 49]} />
      <meshStandardMaterial color="#0b2a4a" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function HeroScene({ reduceMotion, coupleNames, date, onBoatReady }: Props) {
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const entranceStart = useMemo(() => ({ x: 0, y: 0, z: -6 }), []);
  const [boatPosition, setBoatPosition] = useState(entranceStart); // Kapal mulai dari belakang
  const [boatLoaded, setBoatLoaded] = useState(false);
  const boatReadyNotified = useRef(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setMounted(true);
    const opened = typeof window !== 'undefined' ? sessionStorage.getItem("inv-opened") : null;
    if (opened === "1") {
      setIsIntroActive(false);
      setBoatPosition({ x: 0, y: 0, z: 0 }); // Kapal tetap di tengah
    }
  }, []);

  useEffect(() => {
    if (boatLoaded) {
      setBoatPosition({ x: 0, y: 0, z: 0 });
    }
  }, [boatLoaded]);

  useEffect(() => {
    const to = params?.get("to");
    if (to) setName(decodeURIComponent(to.replaceAll("+", " ")));
  }, [params]);

  useEffect(() => {
    // Listen for invitation open event
    const handleInvitationOpen = () => {
      setIsIntroActive(false);
      // Kapal tetap di tengah, tidak bergeser
      setBoatPosition({ x: 0, y: 0, z: 0 }); // Tetap di tengah
    };

    window.addEventListener("invitation-open", handleInvitationOpen);
    return () => window.removeEventListener("invitation-open", handleInvitationOpen);
  }, []);

  // Prevent scrolling when intro overlay is active
  useEffect(() => {
    if (isIntroActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isIntroActive]);

  function openInvitation() {
    // Dispatch event untuk animasi kapal dan show couple names (dengan musik otomatis)
    const ev = new CustomEvent("invitation-open", { detail: { playMusic: true, inviteeName: name } });
    window.dispatchEvent(ev);
    // Hilangkan overlay dengan animasi smooth
    setIsIntroActive(false);
    sessionStorage.setItem("inv-opened", "1");
  }

  if (!mounted) return null;
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Golden rope border */}
      <div aria-hidden className="pointer-events-none absolute inset-0 border-[10px] rounded-[24px]" style={{
        borderImage: "linear-gradient(45deg,#caa969,#f3d27c,#caa969) 1",
        boxShadow: "0 0 40px rgba(255,215,130,0.15) inset",
      }} />

      <Canvas
        camera={{
          position: [0, 1.5, 4], // Posisi kamera tetap untuk melihat kapal di tengah
          fov: 60,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          {sceneVisible && <Environment preset="sunset" />}
          <FloatBoat 
            reduceMotion={reduceMotion} 
            targetPosition={boatPosition}
            initialPosition={entranceStart}
            onArrived={() => {
              if (boatLoaded && !boatReadyNotified.current) {
                boatReadyNotified.current = true;
                setSceneVisible(true);
                onBoatReady?.();
              }
            }}
          >
            <Suspense fallback={<Html center style={{ color: 'white' }}>Memuat kapal...</Html>}>
              <BoatModel scale={0.9} onLoaded={() => setBoatLoaded(true)} />
            </Suspense>
          </FloatBoat>
          
          <Waves reduceMotion={reduceMotion} />
          {sceneVisible && (
            <OrbitControls
              enablePan={!reduceMotion}
              enableZoom={!reduceMotion}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 0, 0]}
              enableDamping
              dampingFactor={0.08}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Sun glow */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f6e7b3]/30 to-transparent" />

      {/* IntroOverlay - tampil di atas background kapal */}
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[rgba(11,42,74,0.2)] to-[rgba(11,42,74,0.4)] z-50 overflow-hidden"
          >
            {/* Main invitation content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md space-y-6 my-auto"
            >
              {/* The Wedding Of */}
              <div className="text-center space-y-4">
                <p className="text-golden/80 text-sm font-light tracking-[0.3em] uppercase font-sans">
                  The Wedding Of
                </p>
                <div className="foil-shimmer text-4xl md:text-5xl font-bold italic tracking-wide font-serif">
                  {coupleNames.bride} & {coupleNames.groom}
                </div>
                <p className="text-blue-100/90 text-sm font-sans italic">
                  Save the date for our special celebration
                </p>
              </div>

              <div className="space-y-2 text-blue-100">
                <p className="font-medium font-sans">Kepada Yth:</p>
                <p className="text-golden text-lg font-semibold px-4 py-2 bg-white/10 rounded-lg border border-golden/30 font-sans">
                  {name || "Nama Tamu"}
                </p>
              </div>

              <div className="space-y-4">
                {/* You're Invited */}
                <p className="text-center text-ivory font-medium text-lg font-sans">
                  You&apos;re Invited to Our Wedding Celebration
                </p>

                <button
                  onClick={openInvitation}
                  className="w-full py-4 px-6 bg-gradient-to-r from-golden to-[#f3d27c] text-[#0b2a4a] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-golden/50 font-sans"
                  aria-label={`Buka undangan pernikahan ${coupleNames.bride} dan ${coupleNames.groom}`}
                >
                  Buka Undangan
                </button>
              </div>

              <div className="flex items-center gap-2 text-golden text-sm">
                <span className="h-px flex-1 bg-golden/40" aria-hidden />
                <span aria-hidden>⎯⎯⎯⎯⎯⎯⎯</span>
                <span className="h-px flex-1 bg-golden/40" aria-hidden />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Names and shimmer - muncul setelah IntroOverlay hilang */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isIntroActive ? 0 : 1, y: isIntroActive ? 20 : 0 }}
          transition={{ duration: 0.8, delay: isIntroActive ? 0 : 0.5 }}
          className="font-serif text-5xl md:text-7xl tracking-wide text-ivory drop-shadow-lg foil-shimmer"
          aria-label={`${coupleNames.bride} dan ${coupleNames.groom}`}
        >
          {coupleNames.bride} & {coupleNames.groom}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isIntroActive ? 0 : 1, y: isIntroActive ? 20 : 0 }}
          transition={{ duration: 0.8, delay: isIntroActive ? 0 : 0.9 }}
          className="mt-1 text-blue-100/80 font-sans"
        >
          {new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" })}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isIntroActive ? 0 : 1, y: isIntroActive ? 20 : 0 }}
          transition={{ duration: 0.8, delay: isIntroActive ? 0 : 1.1 }}
          className="mt-6 flex items-center gap-3 text-blue-100"
        >
          <span aria-hidden className="h-px w-16 bg-blue-100/40" />
          <span className="font-sans italic text-sm">Where love sails forever</span>
          <span aria-hidden className="h-px w-16 bg-blue-100/40" />
        </motion.div>
      </div>
    </section>
  );
}

// Preload GLB model
useGLTF.preload("/models/svitzer_gelliswick_-_fishing_boat_3d_scan.glb");