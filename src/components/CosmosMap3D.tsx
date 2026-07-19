import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import type { Group } from "three";
import { WebGLBoundary } from "@/components/WebGLBoundary";


interface Node {
  name: string;
  type: string;
  pos: [number, number, number];
  color: string;
  size: number;
}

const NODES: Node[] = [
  { name: "Sagittarius A*", type: "SMBH", pos: [0, 0, 0], color: "#f5c96a", size: 0.4 },
  { name: "Solar System", type: "System", pos: [3.2, 0.2, -1.4], color: "#7fd0ff", size: 0.28 },
  { name: "Alpha Centauri", type: "Star system", pos: [3.5, 0.1, -0.9], color: "#ffd9a1", size: 0.22 },
  { name: "Sirius", type: "Star", pos: [3.9, -0.4, -1.6], color: "#e6f0ff", size: 0.24 },
  { name: "Betelgeuse", type: "Red supergiant", pos: [2.4, 1.3, -3.2], color: "#ff6b3d", size: 0.4 },
  { name: "Orion Nebula", type: "Nebula", pos: [1.5, 2.1, -3.6], color: "#c48bff", size: 0.5 },
  { name: "Pleiades", type: "Cluster", pos: [4.5, 1.6, -2.2], color: "#b8d4ff", size: 0.3 },
  { name: "Andromeda", type: "Galaxy", pos: [-5.5, 2.4, 3.6], color: "#f7c9ff", size: 0.7 },
  { name: "Triangulum", type: "Galaxy", pos: [-5.9, 3.1, 2.2], color: "#d5b3ff", size: 0.55 },
  { name: "LMC", type: "Dwarf galaxy", pos: [-2.6, -3.2, 1.8], color: "#ffd1a1", size: 0.4 },
  { name: "SMC", type: "Dwarf galaxy", pos: [-1.4, -3.4, 2.4], color: "#ffe0b8", size: 0.35 },
  { name: "M87*", type: "SMBH", pos: [-6.5, -1.8, -4.2], color: "#ffb84d", size: 0.5 },
  { name: "TRAPPIST-1", type: "Exoplanets", pos: [4.2, -0.9, 2.5], color: "#ff8a9b", size: 0.22 },
  { name: "Proxima b", type: "Exoplanet", pos: [3.6, 0.4, -0.7], color: "#a5f3d0", size: 0.18 },
];

function Node({ n, onSelect }: { n: Node; onSelect: (n: Node) => void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + n.pos[0]) * 0.05;
      ref.current.scale.setScalar(hover ? s * 1.5 : s);
    }
  });
  return (
    <group ref={ref} position={n.pos}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(n); }}
      >
        <sphereGeometry args={[n.size, 32, 32]} />
        <meshBasicMaterial color={n.color} />
      </mesh>
      <mesh scale={2.5}>
        <sphereGeometry args={[n.size, 24, 24]} />
        <meshBasicMaterial color={n.color} transparent opacity={0.12} />
      </mesh>
      {hover && (
        <Html distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="glass-strong text-xs whitespace-nowrap rounded-lg px-2 py-1 -translate-x-1/2 -translate-y-8">
            <div className="font-semibold">{n.name}</div>
            <div className="text-muted-foreground">{n.type}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function CosmosMap3D({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Node | null>(null);
  const nodes = useMemo(() => NODES, []);
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 3, 12], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={["#05070f"]} />
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Stars radius={120} depth={80} count={8000} factor={5} fade speed={0.4} />
          {nodes.map((n) => (
            <Node key={n.name} n={n} onSelect={setSelected} />
          ))}
        </Suspense>
        <OrbitControls enablePan enableZoom minDistance={3} maxDistance={40} autoRotate autoRotateSpeed={0.15} />
      </Canvas>
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm glass-strong rounded-2xl p-4 z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{selected.type}</div>
              <div className="text-lg font-display font-semibold text-gradient">{selected.name}</div>
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-lg leading-none">×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CosmosMap3D;
