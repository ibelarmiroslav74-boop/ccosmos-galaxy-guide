import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { planets } from "@/lib/planets-data";
import { PlanetSphere } from "@/components/PlanetSphere";

export const Route = createFileRoute("/planets/")({
  head: () => ({
    meta: [
      { title: "Планеты Солнечной системы · ccosmos.space" },
      { name: "description", content: "Восемь планет Солнечной системы: факты, реальные текстуры NASA, орбиты, спутники." },
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
      <header className="pt-14 pb-20 text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
          {lang === "ru" ? "Солнечная система" : "Solar System"}
        </p>
        <h1 className="mt-5 text-5xl sm:text-7xl font-semibold tracking-[-0.035em]">{t("planets.title")}</h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">{t("planets.sub")}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 pb-24">
        {planets.map((p) => (
          <Link
            key={p.slug}
            to="/planets/$slug"
            params={{ slug: p.slug }}
            className="group text-center panel rounded-3xl p-8 hover:bg-white/[0.05] transition-colors"
          >
            <div className="mx-auto aspect-square max-w-[220px] mb-6">
              <PlanetSphere slug={p.slug} size={220} hasRings={p.hasRings} className="transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              #{p.order} · {p.type[lang]}
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{p.name[lang]}</div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2 max-w-[260px] mx-auto">{p.intro[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
