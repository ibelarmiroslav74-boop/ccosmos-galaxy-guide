import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy } from "react";
import { useI18n } from "@/lib/i18n";
import { planetBySlug, planets } from "@/lib/planets-data";
import { ClientOnly } from "@/components/ClientOnly";
import { PlanetSphere } from "@/components/PlanetSphere";

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
    <div className="panel rounded-3xl p-16 text-center max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <Link to="/planets" className="btn-ghost inline-flex mt-8">← All planets</Link>
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
    <article className="pb-24">
      <nav className="pt-6 text-sm">
        <Link to="/planets" className="text-muted-foreground hover:text-foreground transition-colors">← {t("planets.title")}</Link>
      </nav>

      {/* Hero */}
      <header className="pt-16 pb-24 text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
          #{p.order} · {p.type[lang]}
        </p>
        <h1 className="mt-5 text-6xl sm:text-8xl font-semibold tracking-[-0.04em]">{p.name[lang]}</h1>
        <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">{p.intro[lang]}</p>

        <div className="mt-16 mx-auto aspect-square max-w-[560px]">
          <ClientOnly fallback={<PlanetSphere slug={p.slug} size={480} hasRings={p.hasRings} className="mx-auto" />}>
            <Planet3D slug={p.slug} hasRings={p.hasRings} className="h-full w-full rounded-3xl overflow-hidden" />
          </ClientOnly>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          {lang === "ru" ? "Перетаскивайте, чтобы вращать · колесо для масштаба" : "Drag to rotate · scroll to zoom"}
        </p>
      </header>

      {/* Facts */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline rounded-3xl overflow-hidden panel">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-background p-6">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="mt-2 text-lg font-medium tracking-tight">{v}</div>
          </div>
        ))}
      </section>

      {/* Long-form */}
      <section className="max-w-2xl mx-auto py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          {lang === "ru" ? "Подробнее" : "In detail"}
        </h2>
        <p className="text-lg leading-relaxed text-foreground/85">{p.long[lang]}</p>
      </section>

      {/* Prev / Next */}
      <nav className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-hairline">
        <Link to="/planets/$slug" params={{ slug: prev.slug }} className="group flex items-center gap-4 p-5 hover:bg-white/[0.04] rounded-2xl transition-colors">
          <PlanetSphere slug={prev.slug} size={56} hasRings={prev.hasRings} />
          <div>
            <div className="text-xs text-muted-foreground">← {lang === "ru" ? "Предыдущая" : "Previous"}</div>
            <div className="font-medium">{prev.name[lang]}</div>
          </div>
        </Link>
        <Link to="/planets/$slug" params={{ slug: next.slug }} className="group flex items-center gap-4 p-5 hover:bg-white/[0.04] rounded-2xl transition-colors sm:justify-end sm:text-right">
          <div className="sm:order-1 sm:ml-0 order-2">
            <div className="text-xs text-muted-foreground">{lang === "ru" ? "Следующая" : "Next"} →</div>
            <div className="font-medium">{next.name[lang]}</div>
          </div>
          <PlanetSphere slug={next.slug} size={56} hasRings={next.hasRings} />
        </Link>
      </nav>
    </article>
  );
}
