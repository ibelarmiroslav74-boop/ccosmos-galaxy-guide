import mercury from "@/assets/planets/mercury.jpg.asset.json";
import venus from "@/assets/planets/venus.jpg.asset.json";
import earth from "@/assets/planets/earth.jpg.asset.json";
import mars from "@/assets/planets/mars.jpg.asset.json";
import jupiter from "@/assets/planets/jupiter.jpg.asset.json";
import saturn from "@/assets/planets/saturn.jpg.asset.json";
import uranus from "@/assets/planets/uranus.jpg.asset.json";
import neptune from "@/assets/planets/neptune.jpg.asset.json";
import saturnRing from "@/assets/planets/saturn_ring.png.asset.json";

export const planetTextures: Record<string, string> = {
  mercury: mercury.url,
  venus: venus.url,
  earth: earth.url,
  mars: mars.url,
  jupiter: jupiter.url,
  saturn: saturn.url,
  uranus: uranus.url,
  neptune: neptune.url,
};

export const saturnRingTexture = saturnRing.url;
