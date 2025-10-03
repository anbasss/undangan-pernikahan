"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
const BOAT_HEADING = Math.PI / 1.4; // match BoatModel yaw so animation follows boat orientation
const BOAT_APPROACH_DISTANCE = 6;

function isPositionClose(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
  epsilon = 0.01
) {
  return (
    Math.abs(a.x - b.x) <= epsilon &&
    Math.abs(a.y - b.y) <= epsilon &&
    Math.abs(a.z - b.z) <= epsilon
  );
}

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
  lockHeading = false,
}: { 
  children: React.ReactNode; 
  reduceMotion?: boolean;
  targetPosition?: { x: number; y: number; z: number };
  initialPosition?: { x: number; y: number; z: number };
  onArrived?: () => void;
  lockHeading?: boolean;
}) {
  const ref = useRef<Group>(null!);
  const currentPosition = useRef({ ...initialPosition });
  const hasArrived = useRef(false);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const progressRef = useRef(0);
  const animatingRef = useRef(false);
  const yawRef = useRef(0);
  const driftPhase = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    if (lockHeading && ref.current) {
      yawRef.current = ref.current.rotation.y;
    }
  }, [lockHeading]);

  useEffect(() => {
    currentPosition.current = { ...initialPosition };
    if (ref.current) {
      ref.current.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    }
  }, [initialPosition]);

  useEffect(() => {
    hasArrived.current = false;
    if (reduceMotion) {
      curveRef.current = null;
      animatingRef.current = false;
      progressRef.current = 0;
      currentPosition.current = { ...targetPosition };
      if (ref.current) {
        ref.current.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      }
      return;
    }

    const start = new THREE.Vector3(
      currentPosition.current.x,
      currentPosition.current.y,
      currentPosition.current.z
    );
    const end = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);

    if (isPositionClose(currentPosition.current, targetPosition, 0.001)) {
      curveRef.current = null;
      animatingRef.current = false;
      progressRef.current = 1;
      return;
    }

  const mid = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.15, 0));
  const control1 = start.clone().lerp(mid, 0.6);
  const control2 = end.clone().lerp(mid, 0.6);

  curveRef.current = new THREE.CatmullRomCurve3([start, control1, control2, end]);
  curveRef.current.curveType = "centripetal";
  curveRef.current.tension = 0;
    progressRef.current = 0;
    animatingRef.current = true;
  }, [targetPosition, reduceMotion]);
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const base = WATER_Y;
    const amp = reduceMotion ? 0 : WAVE_AMP;
    const freq = 0.8;
    const x = 0, z = 0;
    const h = base + amp * Math.sin(freq * x + t) * Math.cos(freq * z + t);
    const clearance = BOAT_CLEARANCE;

    if (!reduceMotion && animatingRef.current && curveRef.current) {
      const speed = 0.25; // normalized units per second
      progressRef.current = Math.min(progressRef.current + delta * speed, 1);
      const point = curveRef.current.getPointAt(progressRef.current);
      const tangent = curveRef.current.getTangentAt(Math.max(progressRef.current - 0.001, 0));
      currentPosition.current = { x: point.x, y: point.y, z: point.z };
      if (!lockHeading) {
        yawRef.current = Math.atan2(tangent.x, tangent.z);
      }

      if (progressRef.current >= 0.999) {
        animatingRef.current = false;
        currentPosition.current = { ...targetPosition };
      }
    } else {
      const damping = reduceMotion ? 1.6 : 2.6;
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
      currentPosition.current.y = THREE.MathUtils.damp(
        currentPosition.current.y ?? 0,
        targetPosition.y,
        damping,
        delta
      );
      if (!lockHeading) {
        const heading = Math.atan2(
          targetPosition.x - currentPosition.current.x,
          targetPosition.z - currentPosition.current.z
        );
        yawRef.current = reduceMotion
          ? 0
          : THREE.MathUtils.damp(yawRef.current, heading, 3, delta);
      }
    }

  const driftEnabled = !reduceMotion && !animatingRef.current;
  const driftX = driftEnabled ? 0.08 * Math.sin(t * 0.25 + driftPhase.current) : 0;
  const driftZ = driftEnabled ? 0.05 * Math.cos(t * 0.22 + driftPhase.current) : 0;

  ref.current.position.x = currentPosition.current.x + driftX;
  ref.current.position.z = currentPosition.current.z + driftZ;
    ref.current.position.y = h + clearance + targetPosition.y;
    ref.current.rotation.y = yawRef.current;

    if (!reduceMotion) {
      ref.current.rotation.z = 0.03 * Math.sin(freq * x + t + Math.PI / 2);
      ref.current.rotation.x = 0.02 * Math.cos(freq * z + t + Math.PI / 2);
    } else {
      ref.current.rotation.x = 0;
      ref.current.rotation.z = 0;
    }

    const distanceXZ = Math.hypot(
      targetPosition.x - currentPosition.current.x,
      targetPosition.z - currentPosition.current.z
    );

    if (!hasArrived.current && !animatingRef.current && distanceXZ < 0.05) {
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
  const centerPosition = useMemo(() => ({ x: 0, y: 0, z: 0 }), []);
  const approachDirection = useMemo(() => {
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), BOAT_HEADING);
    return { x: forward.x, y: forward.y, z: forward.z };
  }, []);
  const entranceStart = useMemo(
    () => ({
      x: centerPosition.x - approachDirection.x * BOAT_APPROACH_DISTANCE,
      y: centerPosition.y - approachDirection.y * BOAT_APPROACH_DISTANCE,
      z: centerPosition.z - approachDirection.z * BOAT_APPROACH_DISTANCE,
    }),
    [centerPosition, approachDirection]
  );
  const [boatPosition, setBoatPosition] = useState(entranceStart); // Kapal memulai di belakang mengikuti orientasi awal
  const [boatLoaded, setBoatLoaded] = useState(false);
  const [boatReady, setBoatReady] = useState(false);
  const boatReadyNotified = useRef(false);
  const [name, setName] = useState("");

  const updateBoatPosition = useCallback(
    (next: { x: number; y: number; z: number }) => {
      setBoatPosition((prev) => (isPositionClose(prev, next) ? prev : next));
    },
    []
  );

  useEffect(() => {
    setMounted(true);
    const opened = typeof window !== 'undefined' ? sessionStorage.getItem("inv-opened") : null;
    if (opened === "1") {
      setIsIntroActive(false);
      updateBoatPosition(centerPosition); // Kapal tetap di tengah
      setBoatReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (boatLoaded) {
      updateBoatPosition(centerPosition);
    } else {
      setBoatReady(false);
      boatReadyNotified.current = false;
    }
  }, [boatLoaded, centerPosition, updateBoatPosition]);

  useEffect(() => {
    const to = params?.get("to");
    if (to) setName(decodeURIComponent(to.replaceAll("+", " ")));
  }, [params]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (boatReady) {
      sessionStorage.setItem("boat-ready", "1");
      window.dispatchEvent(new CustomEvent("boat-ready"));
    } else {
      sessionStorage.removeItem("boat-ready");
    }
  }, [boatReady]);

  useEffect(() => {
    // Listen for invitation open event
    const handleInvitationOpen = () => {
      setIsIntroActive(false);
      // Kapal tetap di tengah, tidak bergeser
      updateBoatPosition(centerPosition); // Tetap di tengah
      setBoatReady(true);
    };

    window.addEventListener("invitation-open", handleInvitationOpen);
    return () => window.removeEventListener("invitation-open", handleInvitationOpen);
  }, [centerPosition, updateBoatPosition]);

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
  if (!boatReady) return;
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
        borderImage: "linear-gradient(45deg,var(--gold),var(--gold-bright),var(--gold)) 1",
        boxShadow: "0 0 40px rgba(255,215,130,0.15) inset",
      }} />

      {/* Animated gradient sky */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(5,20,42,0.95) 0%, rgba(13,54,94,0.92) 45%, rgba(32,110,173,0.85) 70%, rgba(112,177,224,0.75) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Gentle wave texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"240\" height=\"240\" viewBox=\"0 0 240 240\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 120c30-20 60-20 90 0s60 20 90 0 60-20 90 0v120H0V120z\" fill=\"rgba(20,70,120,0.22)\"/%3E%3C/svg%3E')",
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
          mixBlendMode: "overlay",
        }}
      />

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
          <Environment preset="sunset" />
          <FloatBoat 
            reduceMotion={reduceMotion} 
            targetPosition={boatPosition}
            initialPosition={entranceStart}
            lockHeading
            onArrived={() => {
              if (boatLoaded && !boatReadyNotified.current) {
                boatReadyNotified.current = true;
                setBoatReady(true);
                onBoatReady?.();
              }
            }}
          >
            <Suspense fallback={<Html center style={{ color: 'white' }}>Memuat kapal...</Html>}>
              <BoatModel scale={0.9} onLoaded={() => setBoatLoaded(true)} />
            </Suspense>
          </FloatBoat>
          
          <Waves reduceMotion={reduceMotion} />
          <OrbitControls
            enabled={boatReady}
            enablePan={!reduceMotion}
            enableZoom={!reduceMotion}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0, 0]}
            enableDamping
            dampingFactor={0.08}
          />
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
                <p className="text-golden-muted text-sm font-light tracking-[0.3em] uppercase font-sans">
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
                <p className="text-golden text-lg font-semibold px-4 py-2 bg-white/10 rounded-lg border border-golden-soft font-sans">
                  {name || "Nama Tamu"}
                </p>
              </div>

              <div className="space-y-4">
                {/* You're Invited */}
                <p className="text-center text-ivory font-medium text-lg font-sans">
                  You&apos;re Invited to Our Wedding Celebration
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  {boatReady ? (
                    <motion.button
                      key="open-invite"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      onClick={openInvitation}
                      className="w-full py-4 px-6 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-[var(--gold-soft)] text-[#0b2a4a] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-[rgba(203,185,138,0.45)] font-sans"
                      aria-label={`Buka undangan pernikahan ${coupleNames.bride} dan ${coupleNames.groom}`}
                    >
                      Buka Undangan
                    </motion.button>
                  ) : (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0.6, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex items-center justify-center gap-2 text-golden-muted"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="inline-flex h-2 w-2 rounded-full bg-golden animate-pulse" />
                      <span className="inline-flex h-2 w-2 rounded-full bg-golden-soft animate-pulse" style={{ animationDelay: "120ms" }} />
                      <span className="inline-flex h-2 w-2 rounded-full bg-golden-deep animate-pulse" style={{ animationDelay: "240ms" }} />
                      <span className="sr-only">Kapal sedang menuju dermaga</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 text-golden text-sm">
                <span className="h-px flex-1 bg-[rgba(203,185,138,0.35)]" aria-hidden />
                <span aria-hidden>⎯⎯⎯⎯⎯⎯⎯</span>
                <span className="h-px flex-1 bg-[rgba(203,185,138,0.35)]" aria-hidden />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Names and shimmer - muncul setelah IntroOverlay hilang */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: "0.35em" }}
            animate={{
              opacity: isIntroActive ? 0 : 1,
              y: isIntroActive ? 20 : 0,
              letterSpacing: isIntroActive ? "0.35em" : "0.08em",
            }}
            transition={{ duration: 1, delay: isIntroActive ? 0 : 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-wide text-ivory drop-shadow-lg foil-shimmer flex flex-wrap items-center justify-center gap-x-4 gap-y-2 leading-tight"
          aria-label={`${coupleNames.bride} dan ${coupleNames.groom}`}
        >
          <span className="whitespace-nowrap">{coupleNames.bride}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl">&amp;</span>
          <span className="whitespace-nowrap">{coupleNames.groom}</span>
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
          className="mt-6 flex items-center gap-4 text-golden-soft"
        >
          <span aria-hidden className="h-px w-16 bg-[rgba(var(--gold-rgb),0.45)]" />
          <span className="font-serif italic text-base text-[rgba(var(--gold-rgb),0.9)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] tracking-wide">
            Where love sails forever
          </span>
          <span aria-hidden className="h-px w-16 bg-[rgba(var(--gold-rgb),0.45)]" />
        </motion.div>
      </div>
    </section>
  );
}

// Preload GLB model
useGLTF.preload("/models/svitzer_gelliswick_-_fishing_boat_3d_scan.glb");