import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { useI18n } from "@/lib/i18n";
import { ClientOnly } from "@/components/ClientOnly";

const CosmosMap3D = lazy(() => import("@/components/CosmosMap3D"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "3D-карта космоса · ccosmos.space" },
      { name: "description", content: "Интерактивная 3D-карта ближайших звёзд, галактик и туманностей. WebGL." },
      { property: "og:title", content: "3D-карта космоса" },
      { property: "og:url", content: "/map" },
    ],
    links: [{ rel: "canonical", href: "/map" }],
  }),
  component: MapPage,
});

function MapPage() {
  const { t } = useI18n();
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("map.title")}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">{t("map.sub")}</p>
      </header>
      <div className="glass-strong rounded-3xl p-2 overflow-hidden">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
          <ClientOnly fallback={<div className="h-full w-full grid place-items-center text-muted-foreground text-sm">Loading WebGL scene…</div>}>
            <CosmosMap3D className="h-full w-full" />
          </ClientOnly>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{t("map.hint")}</p>
    </div>
  );
}
