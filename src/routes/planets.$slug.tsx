import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy } from "react";
import { useI18n } from "@/lib/i18n";
import { planetBySlug, planets } from "@/lib/planets-data";
import { ClientOnly } from "@/components/ClientOnly";

const Planet3D = lazy(() => import("@/components/Planet3D"));

export const Route = createFileRoute("/planets/$slug")({
  loader: ({ params }) => {
    const planet = planetBySlug(params.slug);
    if (!planet) throw notFound();
    return { planet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Планета не найдена · ccosmos.space" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.planet;
    return {
      meta: [
        { title: `${p.name.ru} / ${p.name.en} · ccosmos.space` },
        { name: "description", content: p.intro.ru },
        { property: "og:title", content: `${p.name.ru} — ${p.type.ru}` },
        { property: "og:description", content: p.intro.ru },
        { property: "og:url", content: `/planets/${p.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/planets/${p.slug}` }],
    };
  },
  component: PlanetPage,
  notFoundComponent: () => (
    <div className="glass-strong rounded-2xl p-10 text-center">
      <h1 className="text-2xl font-display font-semibold">Планета не найдена</h1>
      <Link to="/planets" className="btn-ghost inline-block mt-6">← Все планеты</Link>
    </div>
  ),
});

function PlanetPage() {
  const { planet: p } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const idx = planets.findIndex((x) => x.slug === p.slug);
  const prev = planets[(idx - 1 + planets.length) % planets.length];
  const next = planets[(idx + 1) % planets.length];

  const facts: [string, string][] = [
    [t("planet.distance"), p.facts.distance[lang]],
    [t("planet.radius"), p.facts.radius],
    [t("planet.mass"), p.facts.mass],
    [t("planet.day"), p.facts.day[lang]],
    [t("planet.year"), p.facts.year[lang]],
    [t("planet.moons"), String(p.facts.moons)],
    [t("planet.temp"), p.facts.temp[lang]],
    [t("planet.gravity"), p.facts.gravity],
  ];

  return (
    <article className="space-y-10">
      <nav className="text-sm text-muted-foreground">
        <Link to="/planets" className="hover:text-foreground">← {t("planets.title")}</Link>
      </nav>

      <header className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            #{p.order} · {p.type[lang]}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-gradient">{p.name[lang]}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{p.intro[lang]}</p>
        </div>

        <div className="panel rounded-3xl p-2 aspect-square max-w-[520px] w-full mx-auto overflow-hidden">
          <ClientOnly fallback={<div className="h-full w-full grid place-items-center text-muted-foreground text-sm">Loading 3D…</div>}>
            <Planet3D
              slug={p.slug}
              hasRings={p.hasRings}
              className="h-full w-full rounded-2xl overflow-hidden"
            />
          </ClientOnly>
        </div>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {facts.map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-base font-display font-semibold mt-1">{v}</div>
          </div>
        ))}
      </section>

      <section className="glass rounded-3xl p-8 prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/90">{p.long[lang]}</p>
      </section>

      <nav className="grid sm:grid-cols-2 gap-3">
        <Link to="/planets/$slug" params={{ slug: prev.slug }} className="glass rounded-2xl p-4 hover:bg-white/10 transition">
          <div className="text-xs text-muted-foreground">← {lang === "ru" ? "Предыдущая" : "Previous"}</div>
          <div className="font-display font-semibold">{prev.name[lang]}</div>
        </Link>
        <Link to="/planets/$slug" params={{ slug: next.slug }} className="glass rounded-2xl p-4 hover:bg-white/10 transition text-right">
          <div className="text-xs text-muted-foreground">{lang === "ru" ? "Следующая" : "Next"} →</div>
          <div className="font-display font-semibold">{next.name[lang]}</div>
        </Link>
      </nav>
    </article>
  );
}
