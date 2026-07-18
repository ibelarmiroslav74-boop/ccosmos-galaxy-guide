import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { planets } from "@/lib/planets-data";

export const Route = createFileRoute("/planets/")({
  head: () => ({
    meta: [
      { title: "Планеты Солнечной системы · ccosmos.space" },
      { name: "description", content: "Восемь планет Солнечной системы: факты, 3D-модели, орбиты, спутники." },
      { property: "og:title", content: "Планеты Солнечной системы" },
      { property: "og:url", content: "/planets" },
    ],
    links: [{ rel: "canonical", href: "/planets" }],
  }),
  component: PlanetsIndex,
});

function PlanetsIndex() {
  const { t, lang } = useI18n();
  return (
    <div>
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("planets.title")}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">{t("planets.sub")}</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {planets.map((p) => (
          <Link
            key={p.slug}
            to="/planets/$slug"
            params={{ slug: p.slug }}
            className="group glass rounded-2xl p-5 hover:bg-white/10 transition"
          >
            <div
              className="relative aspect-square rounded-2xl mb-4 overflow-hidden"
              style={{ background: `radial-gradient(circle at 30% 30%, white, ${p.color} 45%, ${p.accent} 80%, #000)` }}
            >
              <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 70px rgba(0,0,0,0.6)" }} />
              <div className="absolute bottom-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest">
                #{p.order}
              </div>
            </div>
            <div className="text-lg font-display font-semibold">{p.name[lang]}</div>
            <div className="text-xs text-muted-foreground">{p.type[lang]}</div>
            <p className="text-sm text-foreground/80 mt-3 line-clamp-2">{p.intro[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
