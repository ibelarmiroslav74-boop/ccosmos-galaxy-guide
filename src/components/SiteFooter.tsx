import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 px-4 pb-8">
      <div className="mx-auto max-w-7xl glass rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} · {t("footer.tag")}</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-foreground transition">{t("nav.about")}</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">{t("footer.contribute")}</a>
        </div>
      </div>
    </footer>
  );
}
