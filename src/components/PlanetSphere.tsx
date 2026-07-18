import { planetTextures } from "@/lib/planet-textures";

interface Props {
  slug: string;
  size?: number;
  className?: string;
  hasRings?: boolean;
}

/**
 * CSS-based "planet" rendered from a real equirectangular NASA texture.
 * Cheap enough to use in grids — no WebGL context per card.
 */
export function PlanetSphere({ slug, size = 160, className = "", hasRings }: Props) {
  const url = planetTextures[slug];
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {hasRings && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 1.85,
            height: size * 0.55,
            transform: `translate(-50%, -50%) rotate(-18deg)`,
            background:
              "radial-gradient(ellipse at center, rgba(200,180,140,0) 30%, rgba(210,180,130,0.55) 42%, rgba(160,130,90,0.7) 55%, rgba(210,180,140,0.5) 68%, transparent 78%)",
            filter: "blur(0.3px)",
            zIndex: 0,
          }}
        />
      )}
      <div
        className="planet-sphere relative z-10"
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${url})`,
        }}
      />
    </div>
  );
}
