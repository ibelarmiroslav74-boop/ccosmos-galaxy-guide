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

  // Ring dimensions — tuned so ring center coincides with planet center
  const ringW = size * 1.95;
  const ringH = size * 0.5;
  const tilt = -20; // degrees

  const ringBg =
    "radial-gradient(ellipse at center, transparent 34%, rgba(120,95,60,0.0) 36%, rgba(215,185,135,0.75) 44%, rgba(160,125,80,0.9) 54%, rgba(220,190,140,0.65) 66%, rgba(150,120,80,0.35) 74%, transparent 80%)";

  const ringBase: React.CSSProperties = {
    width: ringW,
    height: ringH,
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
    background: ringBg,
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "none",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Back half of the ring (behind the planet) */}
      {hasRings && (
        <div
          aria-hidden
          style={{
            ...ringBase,
            zIndex: 0,
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 50%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 50%)",
          }}
        />
      )}

      {/* Planet */}
      <div
        className="planet-sphere relative"
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${url})`,
          zIndex: 1,
        }}
      />

      {/* Front half of the ring (in front of the planet) */}
      {hasRings && (
        <div
          aria-hidden
          style={{
            ...ringBase,
            zIndex: 2,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%)",
          }}
        />
      )}
    </div>
  );
}
