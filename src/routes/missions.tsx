import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const MISSIONS = [
  { year: 1957, name: "Sputnik 1", agency: "СССР", d: { ru: "Первый искусственный спутник Земли.", en: "First artificial Earth satellite." } },
  { year: 1961, name: "Vostok 1", agency: "СССР", d: { ru: "Юрий Гагарин — первый человек в космосе.", en: "Yuri Gagarin — first human in space." } },
  { year: 1969, name: "Apollo 11", agency: "NASA", d: { ru: "Первая высадка человека на Луну.", en: "First crewed Moon landing." } },
  { year: 1977, name: "Voyager 1 & 2", agency: "NASA", d: { ru: "Отправились в межзвёздное пространство.", en: "Now travelling in interstellar space." } },
  { year: 1990, name: "Hubble Space Telescope", agency: "NASA/ESA", d: { ru: "Революция в наблюдательной астрономии.", en: "Revolutionised observational astronomy." } },
  { year: 1997, name: "Mars Pathfinder", agency: "NASA", d: { ru: "Первый успешный ровер на Марсе (Sojourner).", en: "First successful Mars rover (Sojourner)." } },
  { year: 2004, name: "Cassini–Huygens", agency: "NASA/ESA", d: { ru: "13 лет исследования Сатурна и Титана.", en: "13 years exploring Saturn and Titan." } },
  { year: 2015, name: "New Horizons", agency: "NASA", d: { ru: "Первая близкая съёмка Плутона.", en: "First close-up flyby of Pluto." } },
  { year: 2021, name: "James Webb", agency: "NASA/ESA/CSA", d: { ru: "Инфракрасный преемник Hubble, L2.", en: "Infrared successor to Hubble at L2." } },
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
    <div>
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("missions.title")}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">{t("missions.sub")}</p>
      </header>

      <ol className="relative border-l border-white/10 ml-3 space-y-4">
        {MISSIONS.map((m) => (
          <li key={m.name} className="pl-6 relative">
            <span className="absolute -left-[7px] top-3 h-3 w-3 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--primary)] shadow-[0_0_12px_var(--accent)]" />
            <div className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-2xl font-semibold text-gradient">{m.year}</span>
                <span className="font-semibold">{m.name}</span>
                <span className="text-xs text-muted-foreground">· {m.agency}</span>
              </div>
              <p className="text-sm text-foreground/85 mt-2">{m.d[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
