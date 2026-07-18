import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { planets } from "@/lib/planets-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ccosmos.space — энциклопедия космоса" },
      {
        name: "description",
        content:
          "3D-модели планет, интерактивная карта галактик и глубокие статьи о космосе. Открытая энциклопедия на русском и английском.",
      },
      { property: "og:title", content: "ccosmos.space" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative pt-6 sm:pt-14">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="max-w-2xl">
            <p className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              {t("hero.eyebrow")}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] whitespace-pre-line text-gradient">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/planets" className="btn-primary inline-flex items-center gap-2">
                {t("hero.cta.explore")} →
              </Link>
              <Link to="/map" className="btn-ghost inline-flex items-center gap-2">
                🌌 {t("hero.cta.map")}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              {[
                { k: "200B+", v: lang === "ru" ? "галактик" : "galaxies" },
                { k: "13.8B", v: lang === "ru" ? "лет" : "years" },
                { k: "5000+", v: lang === "ru" ? "экзопланет" : "exoplanets" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl p-3 text-center">
                  <div className="font-display text-xl font-semibold text-gradient">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative solar orbit */}
          <div className="relative aspect-square max-w-xl mx-auto w-full">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
            <div className="absolute inset-8 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
            <div className="absolute inset-16 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: "80s" }} />
            {/* Sun */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #fff4c9, #ffb84d 40%, #ff6a1a 75%, #4a1a02)",
                boxShadow: "0 0 80px 10px rgba(255,180,80,0.5)",
              }}
            />
            {/* orbiting planets */}
            {planets.slice(0, 6).map((p, i) => {
              const radius = 20 + i * 8; // percent
              const dur = 20 + i * 8;
              return (
                <div
                  key={p.slug}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${radius * 2}%`,
                    height: `${radius * 2}%`,
                    marginLeft: `-${radius}%`,
                    marginTop: `-${radius}%`,
                    animation: `spin-slow ${dur}s linear infinite`,
                  }}
                >
                  <Link
                    to="/planets/$slug"
                    params={{ slug: p.slug }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 block rounded-full transition hover:scale-125"
                    style={{
                      width: `${8 + i}px`,
                      height: `${8 + i}px`,
                      background: `radial-gradient(circle at 30% 30%, white, ${p.color} 60%, ${p.accent})`,
                      boxShadow: `0 0 12px ${p.color}`,
                    }}
                    aria-label={p.name[lang]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTIONS GRID */}
      <section>
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t("sections.explore")}</h2>
          <p className="text-muted-foreground mt-2">{t("sections.explore.sub")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionCard to="/planets" title={t("planets.title")} sub={t("planets.sub")} emoji="🪐" tint="var(--accent)" />
          <SectionCard to="/galaxies" title={t("galaxies.title")} sub={t("galaxies.sub")} emoji="🌌" tint="var(--nebula)" />
          <SectionCard to="/stars" title={t("stars.title")} sub={t("stars.sub")} emoji="⭐" tint="#f5c96a" />
          <SectionCard to="/black-holes" title={t("bh.title")} sub={t("bh.sub")} emoji="🕳️" tint="#7a5cff" />
          <SectionCard to="/missions" title={t("missions.title")} sub={t("missions.sub")} emoji="🚀" tint="#ff6b3d" />
          <SectionCard to="/map" title={t("map.title")} sub={t("map.sub")} emoji="🧭" tint="#7fd0ff" />
        </div>
      </section>

      {/* PLANETS PREVIEW */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t("planets.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("planets.sub")}</p>
          </div>
          <Link to="/planets" className="btn-ghost text-sm shrink-0">{t("cta.viewAll")} →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {planets.map((p) => (
            <Link
              key={p.slug}
              to="/planets/$slug"
              params={{ slug: p.slug }}
              className="group glass rounded-2xl p-4 hover:bg-white/10 transition"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3" style={{ background: `radial-gradient(circle at 30% 30%, white, ${p.color} 45%, ${p.accent} 80%, #000)` }}>
                <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 60px rgba(0,0,0,0.6)` }} />
              </div>
              <div className="text-sm font-semibold">{p.name[lang]}</div>
              <div className="text-xs text-muted-foreground">{p.type[lang]}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionCard({ to, title, sub, emoji, tint }: { to: string; title: string; sub: string; emoji: string; tint: string }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden glass rounded-2xl p-6 hover:bg-white/10 transition"
    >
      <div
        className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-40 group-hover:opacity-70 blur-2xl transition"
        style={{ background: tint }}
      />
      <div className="relative">
        <div className="text-3xl mb-4">{emoji}</div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{sub}</p>
        <div className="mt-4 text-xs text-foreground/70 group-hover:text-foreground transition">→</div>
      </div>
    </Link>
  );
}
