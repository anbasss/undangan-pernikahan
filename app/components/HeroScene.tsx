"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { OrbitControls, Environment, Html, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { motion } from "framer-motion";
import { SRGBColorSpace, FrontSide, Group } from "three";

type Props = {
  reduceMotion?: boolean;
  coupleNames: { bride: string; groom: string };
  date: string;
};

// Water surface baseline and amplitude
const WATER_Y = -0.2; // must match Waves mesh position.y
const WAVE_AMP = 0.05; // must match wave height in Waves
const BOAT_CLEARANCE = 3; // vertical distance from water crest to boat bottom

function BoatModel({ scale = 0.02 }: { scale?: number }) {
  const materials = useLoader(MTLLoader, "/models/12219_boat_v2_L2.mtl", (loader) => {
    // Pastikan tekstur dicari di folder yang sama
    loader.setResourcePath?.("/models/");
    loader.setPath?.("/models/");
  });
  materials.preload?.();
  const obj = useLoader(OBJLoader, "/models/12219_boat_v2_L2.obj", (loader) => {
    // Some typings may miss setMaterials; assign through any
    (loader as any).setMaterials?.(materials);
  });
  // Perbaiki color space dan shadow pada material agar tidak terlihat hitam
  useEffect(() => {
    obj.traverse((child: any) => {
      if (child?.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            if (m?.map) { m.map.colorSpace = SRGBColorSpace; m.map.needsUpdate = true; }
            m.side = FrontSide;
            m.needsUpdate = true;
          });
        } else if (mat) {
          if (mat.map) { mat.map.colorSpace = SRGBColorSpace; mat.map.needsUpdate = true; }
          mat.side = FrontSide;
          mat.needsUpdate = true;
        }
      }
    });
  }, [obj]);
  return (
    <Center bottom>
      {/* Banyak model OBJ memakai Z-up; rotasi -90° ke X agar tegak di Y-up Three.js */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={obj} scale={scale} />
      </group>
    </Center>
  );
}

function FloatBoat({ children, reduceMotion }: { children: React.ReactNode; reduceMotion?: boolean }) {
  const ref = useRef<Group>(null!);
  useFrame((state) => {
  if (!ref.current) return;
    const t = state.clock.getElapsedTime();
  const base = WATER_Y; // water baseline
  const amp = reduceMotion ? 0 : WAVE_AMP;
    const freq = 0.8;
    const x = 0, z = 0; // boat at origin
    const h = base + amp * Math.sin(freq * x + t) * Math.cos(freq * z + t);
  const clearance = BOAT_CLEARANCE; // keep hull above peak waves
    ref.current.position.y = h + clearance;
    if (!reduceMotion) {
      ref.current.rotation.z = 0.03 * Math.sin(freq * x + t + Math.PI / 2);
      ref.current.rotation.x = 0.02 * Math.cos(freq * z + t + Math.PI / 2);
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Waves({ reduceMotion }: { reduceMotion?: boolean }) {
  const ref = useRef<any>(null);
  const geo = useMemo(() => new Float32Array(200), []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const el = ref.current.geometry.attributes.position;
    for (let i = 0; i < el.count; i++) {
      const x = i % 50;
      const y = Math.floor(i / 50);
      const height = reduceMotion ? 0 : Math.sin(x / 2 + t) * Math.cos(y / 2 + t) * WAVE_AMP;
      el.setZ(i, height);
    }
    el.needsUpdate = true;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, WATER_Y, 0]} receiveShadow>
      <planeGeometry args={[10, 10, 49, 49]} />
      <meshStandardMaterial color="#0b2a4a" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function HeroScene({ reduceMotion, coupleNames, date }: Props) {
  return (
    <section className="relative h-[90svh] overflow-hidden">
      {/* Golden rope border */}
      <div aria-hidden className="pointer-events-none absolute inset-0 border-[10px] rounded-[24px]" style={{
        borderImage: "linear-gradient(45deg,#caa969,#f3d27c,#caa969) 1",
        boxShadow: "0 0 40px rgba(255,215,130,0.15) inset",
      }} />

      <Canvas camera={{ position: [0, 1, 4], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <FloatBoat reduceMotion={reduceMotion}>
            <Suspense fallback={<Html center style={{ color: 'white' }}>Memuat kapal...</Html>}>
              <BoatModel scale={0.002} />
            </Suspense>
          </FloatBoat>
          <Waves reduceMotion={reduceMotion} />
          {!reduceMotion && <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} />}
        </Suspense>
      </Canvas>

      {/* Sun glow */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f6e7b3]/30 to-transparent" />

      {/* Names and shimmer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-[var(--font-display-serif)] text-5xl md:text-7xl tracking-wide text-ivory drop-shadow-lg foil-shimmer"
          aria-label={`${coupleNames.bride} dan ${coupleNames.groom}`}
        >
          {coupleNames.bride} & {coupleNames.groom}
        </motion.h1>
        <p className="mt-3 text-blue-100/90 text-lg md:text-xl uppercase tracking-[0.25em]">Nautical Wedding</p>
        <p className="mt-1 text-blue-100/80">{new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" })}</p>
        <div className="mt-6 flex items-center gap-3 text-blue-100">
          <span aria-hidden className="h-px w-16 bg-blue-100/40" />
          <span className="inline-flex items-center gap-2"><span aria-hidden>⚓</span> By the Sea <span aria-hidden>🕊️</span></span>
          <span aria-hidden className="h-px w-16 bg-blue-100/40" />
        </div>
      </div>
    </section>
  );
}
