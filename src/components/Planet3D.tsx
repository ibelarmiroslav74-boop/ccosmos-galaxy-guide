import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { Mesh } from "three";
import { AdditiveBlending, DoubleSide } from "three";

interface Props {
  color: string;
  accent: string;
  hasRings?: boolean;
  className?: string;
}

function Sphere({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.4, 96, 96]} />
        <meshStandardMaterial
          color={color}
          roughness={0.85}
          metalness={0.15}
          emissive={accent}
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Rings({ accent }: { accent: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.03;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.3, 0, 0]}>
      <ringGeometry args={[1.9, 2.9, 128]} />
      <meshBasicMaterial color={accent} side={DoubleSide} transparent opacity={0.55} />
    </mesh>
  );
}

export function Planet3D({ color, accent, hasRings, className }: Props) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.6, 4.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#0a0f1f"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.3} color={accent} />
        <Suspense fallback={null}>
          <Sphere color={color} accent={accent} />
          {hasRings && <Rings accent={accent} />}
          <Stars radius={60} depth={40} count={2500} factor={3} fade speed={0.5} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}

export default Planet3D;
