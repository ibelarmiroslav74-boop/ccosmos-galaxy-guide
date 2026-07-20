import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy } from "react";
import { useI18n } from "@/lib/i18n";
import { planets } from "@/lib/planets-data";
import { PlanetSphere } from "@/components/PlanetSphere";
import { ClientOnly } from "@/components/ClientOnly";

const Planet3D = lazy(() => import("@/components/Planet3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ccosmos.space — энциклопедия космоса" },
      {
        name: "description",
        content:
          "3D-модели планет, интерактивная карта галактик и глубокие статьи о космосе. Открытая энциклопедия на русском и английском.",
      },
      { property: "og:title", content: "ccosmos.space — энциклопедия космоса" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  return (
    <div>
      {/* HERO */}
      <section className="pt-16 sm:pt-24 pb-20 sm:pb-32 text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground animate-fade-up">
          {t("hero.eyebrow")}
        </p>
        <h1 className="mt-6 mx-auto max-w-4xl text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[1.03] tracking-[-0.04em] whitespace-pre-line animate-fade-up" style={{ animationDelay: "80ms" }}>
          {t("hero.title")}
        </h1>
        <p className="mt-8 mx-auto max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
          {t("hero.sub")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "240ms" }}>
          <Link to="/planets" className="btn-primary">{t("hero.cta.explore")}</Link>
          <Link to="/map" className="btn-ghost">{t("hero.cta.map")} →</Link>
        </div>

        {/* Signature planet — real 3D Earth */}
        <div className="mt-20 mx-auto max-w-3xl aspect-square animate-fade-up" style={{ animationDelay: "320ms" }}>
          <ClientOnly fallback={<PlanetSphere slug="earth" size={520} className="mx-auto" />}>
            <Planet3D slug="earth" className="h-full w-full" />
          </ClientOnly>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          {lang === "ru" ? "Земля · 6 371 км радиус · 1 спутник" : "Earth · 6,371 km radius · 1 moon"}
        </p>
      </section>

      {/* PLANETS STRIP */}
      <section className="py-24 border-t border-hairline">
        <div className="mb-14 max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            {lang === "ru" ? "Солнечная система" : "The Solar System"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t("planets.title")}</h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("planets.sub")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14">
          {planets.map((p) => (
            <Link
              key={p.slug}
              to="/planets/$slug"
              params={{ slug: p.slug }}
              className="group text-center"
            >
              <div className="mx-auto mb-6 aspect-square max-w-[180px]">
                <PlanetSphere slug={p.slug} size={180} className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">#{p.order}</div>
              <div className="mt-1 text-lg font-medium">{p.name[lang]}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{p.type[lang]}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-24 border-t border-hairline">
        <div className="mb-14 max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            {lang === "ru" ? "Разделы" : "Sections"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t("sections.explore")}</h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("sections.explore.sub")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FeatureCard to="/map" eyebrow={lang === "ru" ? "Интерактив" : "Interactive"} title={t("map.title")} sub={t("map.sub")} large />
          <FeatureCard to="/galaxies" eyebrow={lang === "ru" ? "Наблюдения" : "Observations"} title={t("galaxies.title")} sub={t("galaxies.sub")} />
          <FeatureCard to="/black-holes" eyebrow={lang === "ru" ? "Экстремальные объекты" : "Extreme objects"} title={t("bh.title")} sub={t("bh.sub")} />
          <FeatureCard to="/stars" eyebrow={lang === "ru" ? "Термоядерный синтез" : "Fusion"} title={t("stars.title")} sub={t("stars.sub")} />
          <FeatureCard to="/missions" eyebrow={lang === "ru" ? "История" : "History"} title={t("missions.title")} sub={t("missions.sub")} />
          <FeatureCard to="/timeline" eyebrow={lang === "ru" ? "13.8 млрд лет" : "13.8 Byr"} title={t("timeline.title")} sub={t("timeline.sub")} />
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-t border-hairline">
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { k: "200 млрд+", ke: "200B+", v_ru: "галактик в наблюдаемой Вселенной", v_en: "galaxies in the observable Universe" },
            { k: "13.8 млрд", ke: "13.8B", v_ru: "лет с Большого взрыва", v_en: "years since the Big Bang" },
            { k: "5 000+", ke: "5,000+", v_ru: "подтверждённых экзопланет", v_en: "confirmed exoplanets" },
          ].map((s) => (
            <div key={s.ke}>
              <div className="text-5xl sm:text-6xl font-semibold tracking-tight">{lang === "ru" ? s.k : s.ke}</div>
              <div className="mt-3 text-sm text-muted-foreground max-w-[220px] mx-auto">{lang === "ru" ? s.v_ru : s.v_en}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  to, eyebrow, title, sub, large,
}: { to: string; eyebrow: string; title: string; sub: string; large?: boolean }) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-3xl panel p-8 sm:p-10 transition-colors hover:bg-white/[0.06] ${large ? "md:col-span-2 min-h-[320px]" : "min-h-[220px]"}`}
    >
      <div className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight max-w-md">{title}</h3>
      <p className="mt-3 text-muted-foreground max-w-md">{sub}</p>
      <div className="mt-6 text-sm text-accent inline-flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
        Explore <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
