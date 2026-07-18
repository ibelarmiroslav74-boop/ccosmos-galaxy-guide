import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О проекте · ccosmos.space" },
      { name: "description", content: "ccosmos.space — открытая двуязычная энциклопедия космоса." },
      { property: "og:title", content: "О проекте ccosmos.space" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { t, lang } = useI18n();
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("about.title")}</h1>
      <div className="glass rounded-3xl p-8 mt-8 space-y-4 text-foreground/90 leading-relaxed">
        {lang === "ru" ? (
          <>
            <p><strong>ccosmos.space</strong> — открытая энциклопедия космоса на двух языках. Мы объединяем достоверные научные факты, интерактивные 3D-визуализации и живой дизайн, чтобы делать знания о Вселенной по-настоящему увлекательными.</p>
            <p>Каждая статья содержит краткую сводку, ключевые характеристики и глубокое описание. 3D-модели планет и карта космоса работают на WebGL прямо в браузере — без установки.</p>
            <p>Проект открыт для сообщества: в ближайших обновлениях появится регистрация и совместное редактирование статей.</p>
          </>
        ) : (
          <>
            <p><strong>ccosmos.space</strong> is an open bilingual encyclopedia of the cosmos. We combine rigorous science, interactive 3D visualisations and living design to make knowledge about the Universe genuinely engaging.</p>
            <p>Every article carries a short intro, key parameters and a deep-dive description. 3D planet models and the cosmos map run on WebGL directly in your browser — no installation required.</p>
            <p>The project is open to the community — user registration and collaborative editing are coming next.</p>
          </>
        )}
      </div>
    </div>
  );
}
