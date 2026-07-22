import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { ClientOnly } from "@/components/ClientOnly";

const CosmosMap3D = lazy(() => import("@/components/CosmosMap3D"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "3D-карта космоса · ccosmos.space" },
      { name: "description", content: "Интерактивная 3D-карта Солнечной системы, ближайших звёзд, Млечного Пути и Местной группы." },
      { property: "og:title", content: "3D-карта космоса" },
      { property: "og:description", content: "Четыре масштаба Вселенной в одном интерактиве." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/map" }],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    // Break out of the centered <main> container so the map is truly fullscreen
    // on mobile (edge-to-edge, no side padding, no vertical page scroll competing
    // with the WebGL gestures).
    <div className="fixed inset-x-0 bottom-0 top-[56px] z-0 bg-black">
      <ClientOnly
        fallback={
          <div className="grid h-full w-full place-items-center text-xs uppercase tracking-[0.22em] text-white/50">
            Loading scene…
          </div>
        }
      >
        <CosmosMap3D className="h-full w-full" />
      </ClientOnly>
    </div>
  );
}
