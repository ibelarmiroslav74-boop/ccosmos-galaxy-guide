import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { TextureLoader, DoubleSide, SRGBColorSpace, type Mesh } from "three";
import { planetTextures, saturnRingTexture } from "@/lib/planet-textures";
import { Loader } from "@/components/Loader";

interface Props {
  slug: string;
  hasRings?: boolean;
  className?: string;
  autoRotate?: boolean;
}

function Sphere({ url, tilt = 0 }: { url: string; tilt?: number }) {
  const ref = useRef<Mesh>(null);
  const tex = useLoader(TextureLoader, url);
  tex.colorSpace = SRGBColorSpace;
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, tilt]}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <meshStandardMaterial map={tex} roughness={1} metalness={0} />
    </mesh>
  );
}

function Rings() {
  const ref = useRef<Mesh>(null);
  const tex = useLoader(TextureLoader, saturnRingTexture);
  tex.colorSpace = SRGBColorSpace;
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[2.05, 3.2, 128]} />
      <meshBasicMaterial map={tex} side={DoubleSide} transparent opacity={0.9} />
    </mesh>
  );
}

export function Planet3D({ slug, hasRings, className, autoRotate = true }: Props) {
  const url = planetTextures[slug];
  const tilt = slug === "uranus" ? Math.PI / 2 : slug === "earth" ? 0.41 : 0.15;

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.4, 4.8], fov: 42 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[5, 2, 5]} intensity={1.6} color="#ffffff" />
        <Suspense fallback={<Html center><Loader label="Loading" /></Html>}>
          {url && <Sphere url={url} tilt={tilt} />}
          {hasRings && <Rings />}
          <Stars radius={80} depth={40} count={1500} factor={2.5} fade speed={0.3} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3}
          maxDistance={9}
          autoRotate={autoRotate}
          autoRotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}

export default Planet3D;
