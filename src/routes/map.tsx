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
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-10">
      <header className="max-w-3xl">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
          {lang === "ru" ? "Интерактив" : "Interactive"}
        </p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{t("map.title")}</h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t("map.sub")}</p>
      </header>

      <div className="panel rounded-3xl p-1.5 sm:p-2 overflow-hidden">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
          <ClientOnly fallback={<div className="h-full w-full grid place-items-center text-muted-foreground text-sm">Loading WebGL scene…</div>}>
            <CosmosMap3D className="h-full w-full" />
          </ClientOnly>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { t_ru: "Вращение", t_en: "Rotate", d_ru: "Перетаскивайте мышью или пальцем.", d_en: "Drag with mouse or finger." },
          { t_ru: "Зум", t_en: "Zoom", d_ru: "Колесо мыши или щипок.", d_en: "Scroll wheel or pinch." },
          { t_ru: "Объекты", t_en: "Objects", d_ru: "Кликните по звезде — появится информация.", d_en: "Click a body to reveal details." },
        ].map((h) => (
          <div key={h.t_en} className="panel rounded-2xl p-5">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{lang === "ru" ? h.t_ru : h.t_en}</div>
            <p className="text-sm text-foreground/85 mt-2 leading-relaxed">{lang === "ru" ? h.d_ru : h.d_en}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{t("map.hint")}</p>
    </div>
  );
}
