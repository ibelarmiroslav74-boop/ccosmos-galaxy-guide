import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const MISSIONS = [
  { year: 1957, name: "Sputnik 1", agency: "СССР / USSR", d: { ru: "Первый искусственный спутник Земли.", en: "First artificial Earth satellite." } },
  { year: 1961, name: "Vostok 1", agency: "СССР / USSR", d: { ru: "Юрий Гагарин — первый человек в космосе.", en: "Yuri Gagarin — first human in space." } },
  { year: 1969, name: "Apollo 11", agency: "NASA", d: { ru: "Первая высадка человека на Луну.", en: "First crewed Moon landing." } },
  { year: 1977, name: "Voyager 1 & 2", agency: "NASA", d: { ru: "Отправились в межзвёздное пространство.", en: "Now travelling in interstellar space." } },
  { year: 1990, name: "Hubble Space Telescope", agency: "NASA / ESA", d: { ru: "Революция в наблюдательной астрономии.", en: "Revolutionised observational astronomy." } },
  { year: 1997, name: "Mars Pathfinder", agency: "NASA", d: { ru: "Первый успешный ровер на Марсе (Sojourner).", en: "First successful Mars rover (Sojourner)." } },
  { year: 2004, name: "Cassini–Huygens", agency: "NASA / ESA", d: { ru: "13 лет исследования Сатурна и Титана.", en: "13 years exploring Saturn and Titan." } },
  { year: 2015, name: "New Horizons", agency: "NASA", d: { ru: "Первая близкая съёмка Плутона.", en: "First close-up flyby of Pluto." } },
  { year: 2021, name: "James Webb", agency: "NASA / ESA / CSA", d: { ru: "Инфракрасный преемник Hubble на L2.", en: "Infrared successor to Hubble at L2." } },
  { year: 2022, name: "Artemis I", agency: "NASA", d: { ru: "Начало программы возвращения на Луну.", en: "Kickoff of the return-to-Moon programme." } },
  { year: 2024, name: "Europa Clipper", agency: "NASA", d: { ru: "Полёт к ледяной луне Юпитера в поисках океана.", en: "Mission to Jupiter's icy moon in search of an ocean." } },
];

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Космические миссии · ccosmos.space" },
      { name: "description", content: "Хронология ключевых космических миссий от Sputnik-1 до Artemis и James Webb." },
      { property: "og:title", content: "Космические миссии" },
      { property: "og:url", content: "/missions" },
    ],
    links: [{ rel: "canonical", href: "/missions" }],
  }),
  component: Missions,
});

function Missions() {
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <header className="max-w-3xl">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
          {lang === "ru" ? "История" : "History"}
        </p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{t("missions.title")}</h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t("missions.sub")}</p>
      </header>

      <ol className="relative border-l border-hairline ml-4 space-y-6">
        {MISSIONS.map((m) => (
          <li key={m.name} className="pl-8 relative">
            <span className="absolute -left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
            <div className="panel rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">{m.year}</span>
                <span className="text-lg font-medium">{m.name}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">· {m.agency}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.d[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
