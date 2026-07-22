import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Vector3,
  type Points as ThreePoints,
} from "three";
import { WebGLBoundary } from "@/components/WebGLBoundary";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

type Scale = "solar" | "stellar" | "galactic" | "local";

interface CosmicObject {
  id: string;
  name: string;
  type: string;
  scale: Scale;
  pos: [number, number, number];
  color: string;
  size: number;
  distance: string;   // human-readable
  desc_ru: string;
  desc_en: string;
}

// Positions are stylised but relative distances inside a scale are meaningful.
const OBJECTS: CosmicObject[] = [
  // Solar system (AU scale, compressed)
  { id: "sun",      name: "Sun",       type: "G-type star",    scale: "solar", pos: [0, 0, 0],       color: "#ffd27a", size: 0.6,  distance: "0",           desc_ru: "Наша звезда. Возраст ~4.6 млрд лет.", desc_en: "Our star. About 4.6 billion years old." },
  { id: "mercury",  name: "Mercury",   type: "Planet",         scale: "solar", pos: [0.9, 0, 0.1],   color: "#b6b1a8", size: 0.06, distance: "0.39 AU",     desc_ru: "Ближайшая к Солнцу планета.", desc_en: "Closest planet to the Sun." },
  { id: "venus",    name: "Venus",     type: "Planet",         scale: "solar", pos: [1.4, 0, -0.2],  color: "#e8c07a", size: 0.09, distance: "0.72 AU",     desc_ru: "Самая горячая планета.", desc_en: "Hottest planet." },
  { id: "earth",    name: "Earth",     type: "Planet",         scale: "solar", pos: [2.0, 0, 0.3],   color: "#6ab0ff", size: 0.10, distance: "1 AU",        desc_ru: "Наш дом.", desc_en: "Our home." },
  { id: "mars",     name: "Mars",      type: "Planet",         scale: "solar", pos: [2.7, 0, -0.4],  color: "#d0664a", size: 0.08, distance: "1.52 AU",     desc_ru: "Красная планета.", desc_en: "The red planet." },
  { id: "jupiter",  name: "Jupiter",   type: "Gas giant",      scale: "solar", pos: [4.3, 0, 0.2],   color: "#d9b58a", size: 0.28, distance: "5.2 AU",      desc_ru: "Крупнейшая планета.", desc_en: "Largest planet." },
  { id: "saturn",   name: "Saturn",    type: "Gas giant",      scale: "solar", pos: [5.9, 0, -0.5],  color: "#e8cfa0", size: 0.24, distance: "9.5 AU",      desc_ru: "Ледяные кольца.", desc_en: "Iconic rings." },
  { id: "uranus",   name: "Uranus",    type: "Ice giant",      scale: "solar", pos: [7.4, 0, 0.7],   color: "#a8dbe6", size: 0.16, distance: "19.2 AU",     desc_ru: "Ледяной гигант.", desc_en: "Tilted ice giant." },
  { id: "neptune",  name: "Neptune",   type: "Ice giant",      scale: "solar", pos: [8.8, 0, -0.6],  color: "#4a6ef5", size: 0.16, distance: "30.1 AU",     desc_ru: "Дальний ледяной гигант.", desc_en: "Farthest ice giant." },

  // Nearby stars (parsecs)
  { id: "alpha-cen", name: "Alpha Centauri", type: "Star system", scale: "stellar", pos: [1.2, 0.1, 0.4],  color: "#ffe4b8", size: 0.14, distance: "4.37 ly", desc_ru: "Ближайшая звёздная система.", desc_en: "Nearest star system." },
  { id: "proxima",   name: "Proxima Centauri", type: "Red dwarf", scale: "stellar", pos: [1.15, 0.05, 0.45], color: "#ff8060", size: 0.09, distance: "4.24 ly", desc_ru: "Ближайшая одиночная звезда.", desc_en: "Closest single star." },
  { id: "barnard",   name: "Barnard's Star", type: "Red dwarf", scale: "stellar", pos: [-1.6, 0.6, -0.3],  color: "#ff9060", size: 0.10, distance: "5.96 ly", desc_ru: "Быстрое собственное движение.", desc_en: "Fastest proper motion." },
  { id: "sirius",    name: "Sirius",        type: "Binary A-star", scale: "stellar", pos: [2.3, -0.5, 1.2], color: "#eaf3ff", size: 0.20, distance: "8.6 ly",  desc_ru: "Ярчайшая звезда ночного неба.", desc_en: "Brightest star in the night sky." },
  { id: "vega",      name: "Vega",          type: "A-type star", scale: "stellar", pos: [-2.9, 1.4, 1.8],   color: "#c9d8ff", size: 0.19, distance: "25 ly",   desc_ru: "Полярная звезда 12000 лет назад.", desc_en: "Northern pole star 12,000 years ago." },
  { id: "altair",    name: "Altair",        type: "A-type star", scale: "stellar", pos: [-3.2, -0.8, 2.4],  color: "#dceaff", size: 0.16, distance: "17 ly",   desc_ru: "Вершина Летнего треугольника.", desc_en: "Corner of the Summer Triangle." },
  { id: "trappist",  name: "TRAPPIST-1",    type: "Ultra-cool dwarf", scale: "stellar", pos: [3.6, 0.9, -2.5], color: "#ff7a5c", size: 0.09, distance: "40 ly",   desc_ru: "7 планет размером с Землю.", desc_en: "Seven Earth-sized planets." },
  { id: "betelgeuse",name: "Betelgeuse",    type: "Red supergiant", scale: "stellar", pos: [-4.1, 2.2, -3.4], color: "#ff5a3a", size: 0.44, distance: "548 ly",  desc_ru: "Кандидат в сверхновую.", desc_en: "Future supernova candidate." },
  { id: "rigel",     name: "Rigel",         type: "Blue supergiant", scale: "stellar", pos: [-4.4, -1.5, -3.9], color: "#a7c8ff", size: 0.30, distance: "860 ly",  desc_ru: "Голубой сверхгигант в Орионе.", desc_en: "Blue supergiant in Orion." },

  // Milky Way features (kiloparsecs)
  { id: "sgra",      name: "Sagittarius A*", type: "Supermassive BH", scale: "galactic", pos: [0, 0, 0],    color: "#ffb04a", size: 0.55, distance: "26 000 ly", desc_ru: "Чёрная дыра в центре Млечного Пути.", desc_en: "The Milky Way's central black hole." },
  { id: "sol",       name: "Solar System",  type: "You are here",   scale: "galactic", pos: [5.4, 0, -1.6], color: "#8fd6ff", size: 0.22, distance: "8 kpc from core", desc_ru: "Мы находимся в рукаве Ориона.", desc_en: "We sit in the Orion Arm." },
  { id: "orion-neb", name: "Orion Nebula",  type: "Star nursery",   scale: "galactic", pos: [5.0, 0.1, -2.4], color: "#c78bff", size: 0.42, distance: "1 344 ly", desc_ru: "Ближайший активный роддом звёзд.", desc_en: "Nearest active star nursery." },
  { id: "eagle",     name: "Eagle Nebula",  type: "H II region",    scale: "galactic", pos: [2.8, 0.3, 3.4], color: "#b0e6ff", size: 0.36, distance: "7 000 ly", desc_ru: "Знаменитые «Столпы Творения».", desc_en: "Home of the Pillars of Creation." },
  { id: "crab",      name: "Crab Nebula",   type: "Supernova remnant", scale: "galactic", pos: [3.9, -0.4, 2.1], color: "#ff9ac6", size: 0.30, distance: "6 500 ly", desc_ru: "Остаток сверхновой 1054 года.", desc_en: "Remnant of the AD 1054 supernova." },
  { id: "pleiades",  name: "Pleiades",      type: "Open cluster",   scale: "galactic", pos: [5.9, 0.4, -1.0], color: "#cfe0ff", size: 0.24, distance: "444 ly",   desc_ru: "«Семь сестёр».", desc_en: "The Seven Sisters." },
  { id: "omega-cen", name: "Omega Centauri",type: "Globular cluster", scale: "galactic", pos: [-3.2, -1.6, 2.8], color: "#ffe1a8", size: 0.28, distance: "17 700 ly", desc_ru: "Крупнейшее шаровое скопление.", desc_en: "Largest known globular cluster." },

  // Local Group (megaparsecs)
  { id: "milkyway",  name: "Milky Way",     type: "Barred spiral galaxy", scale: "local", pos: [0, 0, 0],      color: "#ffffff", size: 1.2, distance: "0",         desc_ru: "Наш галактический дом.", desc_en: "Our galactic home." },
  { id: "andromeda", name: "Andromeda (M31)", type: "Spiral galaxy",     scale: "local", pos: [-6.2, 1.2, -3.4], color: "#f2d0ff", size: 1.4, distance: "2.54 Mly", desc_ru: "Крупнейшая галактика Местной группы.", desc_en: "Largest galaxy in the Local Group." },
  { id: "triangulum",name: "Triangulum (M33)", type: "Spiral galaxy",    scale: "local", pos: [-5.8, 2.0, -2.0], color: "#d8b8ff", size: 0.9, distance: "2.73 Mly", desc_ru: "Третья по величине в Местной группе.", desc_en: "Third-largest in the Local Group." },
  { id: "lmc",       name: "Large Magellanic Cloud", type: "Dwarf galaxy", scale: "local", pos: [2.2, -2.4, 1.6], color: "#ffd3a3", size: 0.7, distance: "163 kly",  desc_ru: "Спутник Млечного Пути.", desc_en: "Milky Way satellite." },
  { id: "smc",       name: "Small Magellanic Cloud", type: "Dwarf galaxy", scale: "local", pos: [2.8, -2.5, 2.2], color: "#ffe3c0", size: 0.55,distance: "200 kly",  desc_ru: "Спутник Млечного Пути.", desc_en: "Milky Way satellite." },
  { id: "m87",       name: "M87",            type: "Elliptical + SMBH",   scale: "local", pos: [7.4, -1.8, 4.6], color: "#ffcf7a", size: 1.1, distance: "53 Mly",   desc_ru: "Первая сфотографированная чёрная дыра.", desc_en: "Home of the first photographed black hole." },
  { id: "sombrero",  name: "Sombrero (M104)", type: "Spiral galaxy",       scale: "local", pos: [6.6, 2.4, -4.8], color: "#e0d3b8", size: 0.85,distance: "29 Mly",   desc_ru: "Галактика с ярким балджем.", desc_en: "Bright bulge, thick dust lane." },
];

/* ------------------------------------------------------------------ */
/*  Milky Way point cloud                                             */
/* ------------------------------------------------------------------ */

function MilkyWay({ visible }: { visible: boolean }) {
  const ref = useRef<ThreePoints>(null);

  const geometry = useMemo(() => {
    const arms = 4;
    const stars = 14000;
    const positions = new Float32Array(stars * 3);
    const colors = new Float32Array(stars * 3);
    const inner = new Color("#ffd18a");
    const outer = new Color("#7fb8ff");

    for (let i = 0; i < stars; i++) {
      // radius biased toward centre (bulge)
      const r = Math.pow(Math.random(), 1.6) * 9 + 0.15;
      const arm = i % arms;
      const armAngle = (arm / arms) * Math.PI * 2;
      const spiral = r * 0.55;
      const scatter = (Math.random() - 0.5) * 0.6 / (r * 0.4 + 0.5);
      const theta = armAngle + spiral + scatter * 2;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // thin disk, thicker near bulge
      const y = (Math.random() - 0.5) * (0.25 + Math.max(0, 1.6 - r) * 0.6);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mix = Math.min(1, r / 8);
      const c = inner.clone().lerp(outer, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (ref.current && visible) ref.current.rotation.y += dt * 0.02;
  });

  if (!visible) return null;

  return (
    <group>
      {/* bulge glow */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#ffcf88" transparent opacity={0.55} />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#ffb060" transparent opacity={0.12} blending={AdditiveBlending} />
      </mesh>
      <points ref={ref} geometry={geometry}>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Node primitive                                                    */
/* ------------------------------------------------------------------ */

function Node({
  obj,
  onSelect,
  isSelected,
}: {
  obj: CosmicObject;
  onSelect: (o: CosmicObject) => void;
  isSelected: boolean;
}) {
  const [hover, setHover] = useState(false);
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8 + obj.pos[0]) * 0.05;
    const target = (hover || isSelected) ? 1.35 : 1;
    group.current.scale.setScalar(pulse * target);
  });

  return (
    <group ref={group} position={obj.pos}>
      {/* core */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(obj); }}
      >
        <sphereGeometry args={[obj.size, 24, 24]} />
        <meshBasicMaterial color={obj.color} />
      </mesh>
      {/* soft halo */}
      <mesh scale={2.4}>
        <sphereGeometry args={[obj.size, 16, 16]} />
        <meshBasicMaterial color={obj.color} transparent opacity={0.18} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[obj.size * 2.6, obj.size * 2.75, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
      )}
      {(hover || isSelected) && (
        <Html center distanceFactor={12} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
          <div className="rounded-md border border-white/15 bg-black/70 backdrop-blur px-2 py-1 text-[11px] whitespace-nowrap -translate-y-8">
            <div className="font-medium text-white">{obj.name}</div>
            <div className="text-white/60">{obj.type} · {obj.distance}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Galactic plane (subtle grid)                                      */
/* ------------------------------------------------------------------ */

function GalacticPlane({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[0, 11, 96]} />
        <meshBasicMaterial color="#1a2438" transparent opacity={0.18} />
      </mesh>
      <gridHelper args={[22, 22, "#25334c", "#182338"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera focus                                                      */
/* ------------------------------------------------------------------ */

function CameraRig({ target }: { target: Vector3 | null }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!target) return;
    const desired = target.clone().add(new Vector3(0, 1.6, 4.5));
    camera.position.lerp(desired, 0.06);
    camera.lookAt(target);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */

const SCALES: { id: Scale; ru: string; en: string; hint_ru: string; hint_en: string }[] = [
  { id: "solar",    ru: "Солнечная система", en: "Solar System",  hint_ru: "AU",  hint_en: "AU" },
  { id: "stellar",  ru: "Ближние звёзды",    en: "Nearby stars",  hint_ru: "св. годы", hint_en: "light-years" },
  { id: "galactic", ru: "Млечный Путь",      en: "Milky Way",     hint_ru: "тыс. св. лет", hint_en: "kilo-ly" },
  { id: "local",    ru: "Местная группа",    en: "Local Group",   hint_ru: "млн св. лет",  hint_en: "mega-ly" },
];

export function CosmosMap3D({ className }: { className?: string }) {
  const [scale, setScale] = useState<Scale>("galactic");
  const [selected, setSelected] = useState<CosmicObject | null>(null);
  const [focus, setFocus] = useState<Vector3 | null>(null);

  // Reset selection when switching scale
  useEffect(() => {
    setSelected(null);
    setFocus(null);
  }, [scale]);

  const visible = useMemo(() => OBJECTS.filter((o) => o.scale === scale), [scale]);

  const fallback = (
    <div className={className}>
      <div className="h-full w-full grid place-items-center bg-black text-center p-6">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">3D unavailable</div>
          <p className="mt-3 text-sm text-white/60 max-w-sm">
            WebGL недоступен на этом устройстве.<br />WebGL is disabled on this device.
          </p>
        </div>
      </div>
    </div>
  );

  const activeScale = SCALES.find((s) => s.id === scale)!;

  return (
    <WebGLBoundary fallback={fallback}>
      <div className={`${className ?? ""} relative`}>
        <Canvas
          camera={{ position: [0, 5, 14], fov: 50, near: 0.05, far: 500 }}
          dpr={[1, 2]}
          gl={{ failIfMajorPerformanceCaveat: false, powerPreference: "default", antialias: true }}
        >
          <color attach="background" args={["#02040a"]} />
          <fog attach="fog" args={["#02040a", 28, 90]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[0, 0, 0]} intensity={0.6} color="#ffd07a" />

          <Suspense fallback={null}>
            <Stars radius={180} depth={110} count={12000} factor={4} fade speed={0.3} />
            <GalacticPlane visible={scale === "galactic" || scale === "local"} />
            <MilkyWay visible={scale === "galactic"} />
            {visible.map((o) => (
              <Node
                key={o.id}
                obj={o}
                isSelected={selected?.id === o.id}
                onSelect={(picked) => {
                  setSelected(picked);
                  setFocus(new Vector3(...picked.pos));
                }}
              />
            ))}
          </Suspense>

          <CameraRig target={focus} />
          <OrbitControls
            enablePan
            enableZoom
            minDistance={2}
            maxDistance={60}
            autoRotate={!selected}
            autoRotateSpeed={0.12}
            makeDefault
          />
        </Canvas>

        {/* Top HUD — scale selector (horizontally scrollable on tiny screens) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-2 sm:p-4">
          <div
            className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SCALES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScale(s.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition ${
                  scale === s.id
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {s.en}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom scale hint — desktop only (mobile has the pills up top) */}
        <div className="pointer-events-none absolute left-4 bottom-4 z-10 hidden sm:block">
          <div className="rounded-lg border border-white/10 bg-black/55 px-3 py-2 backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Scale</div>
            <div className="text-sm text-white">{activeScale.en}</div>
            <div className="text-[11px] text-white/50">units: {activeScale.hint_en}</div>
          </div>
        </div>

        {/* Desktop hint */}
        <div className="pointer-events-none absolute right-3 top-16 z-10 hidden sm:block">
          <div className="max-w-[220px] rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-[11px] leading-relaxed text-white/60 backdrop-blur">
            Drag to orbit · scroll to zoom · tap any object to focus.
          </div>
        </div>

        {/* Info panel — bottom sheet on mobile, card on desktop */}
        {selected && (
          <div
            className="absolute inset-x-0 bottom-0 z-10 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[340px] sm:px-0 sm:pb-0"
          >
            <div className="rounded-t-2xl border border-white/10 border-b-0 bg-black/80 p-4 backdrop-blur-md sm:rounded-2xl sm:border-b">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20 sm:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">{selected.type}</div>
                  <div className="truncate text-lg font-semibold leading-tight text-white">{selected.name}</div>
                </div>
                <button
                  onClick={() => { setSelected(null); setFocus(null); }}
                  className="shrink-0 rounded-full border border-white/10 px-2 text-lg leading-none text-white/60 hover:text-white"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/60">
                <span className="rounded-full border border-white/10 px-2 py-0.5">{selected.distance}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 capitalize">{selected.scale}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{selected.desc_en}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/55">{selected.desc_ru}</p>
            </div>
          </div>
        )}
      </div>
    </WebGLBoundary>
  );
}

export default CosmosMap3D;
