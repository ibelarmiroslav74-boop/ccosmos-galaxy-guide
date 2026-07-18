import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-32 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} · {t("footer.tag")}</p>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-foreground transition-colors">{t("nav.about")}</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t("footer.contribute")}</a>
        </div>
      </div>
    </footer>
  );
}
