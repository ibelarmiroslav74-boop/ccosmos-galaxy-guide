import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { TextureLoader, DoubleSide, SRGBColorSpace, RingGeometry, type Mesh, type Group } from "three";
import { planetTextures, saturnRingTexture } from "@/lib/planet-textures";
import { Loader } from "@/components/Loader";
import { PlanetSphere } from "@/components/PlanetSphere";
import { WebGLBoundary } from "@/components/WebGLBoundary";


interface Props {
  slug: string;
  hasRings?: boolean;
  className?: string;
  autoRotate?: boolean;
}

function Sphere({ url }: { url: string }) {
  const ref = useRef<Mesh>(null);
  const tex = useLoader(TextureLoader, url);
  tex.colorSpace = SRGBColorSpace;
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <meshStandardMaterial map={tex} roughness={1} metalness={0} />
    </mesh>
  );
}

function Rings() {
  const tex = useLoader(TextureLoader, saturnRingTexture);
  tex.colorSpace = SRGBColorSpace;
  const inner = 1.9;
  const outer = 3.1;
  const geometry = useMemo(() => {
    const g = new RingGeometry(inner, outer, 256, 1);
    // Remap UVs so texture goes radially from inner to outer edge
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const u = (r - inner) / (outer - inner);
      uv.setXY(i, u, 0.5);
    }
    uv.needsUpdate = true;
    return g;
  }, []);
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={tex} side={DoubleSide} transparent opacity={0.95} />
    </mesh>
  );
}

export function Planet3D({ slug, hasRings, className, autoRotate = true }: Props) {
  const url = planetTextures[slug];
  const tilt =
    slug === "uranus" ? Math.PI / 2 :
    slug === "saturn" ? 0.466 :
    slug === "earth" ? 0.41 : 0.15;

  const groupRef = useRef<Group>(null);
  function TiltedSystem() {
    useFrame((_, delta) => {
      if (groupRef.current && hasRings) groupRef.current.rotation.y += delta * 0.02;
    });
    return (
      <group ref={groupRef} rotation={[0, 0, tilt]}>
        {url && <Sphere url={url} />}
        {hasRings && <Rings />}
      </group>
    );
  }

  const fallback = (
    <div className={className}>
      <div className="h-full w-full grid place-items-center bg-black rounded-3xl">
        <PlanetSphere slug={slug} size={420} hasRings={hasRings} />
      </div>
    </div>
  );

  return (
    <WebGLBoundary fallback={fallback}>
      <div className={className}>
        <Canvas
          camera={{ position: [0, 0.4, 4.8], fov: 42 }}
          dpr={[1, 2]}
          gl={{ failIfMajorPerformanceCaveat: false, powerPreference: "default" }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.18} />
          <directionalLight position={[5, 2, 5]} intensity={1.6} color="#ffffff" />
          <Suspense fallback={<Html center><Loader label="Loading" /></Html>}>
            <TiltedSystem />
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
    </WebGLBoundary>
  );
}

export default Planet3D;
