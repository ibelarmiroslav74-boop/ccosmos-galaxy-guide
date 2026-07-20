import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LanguageToggle, useI18n, type DictKey } from "@/lib/i18n";
import { SearchDialog } from "@/components/SearchDialog";

const NAV: { to: string; key: DictKey }[] = [
  { to: "/planets", key: "nav.planets" },
  { to: "/galaxies", key: "nav.galaxies" },
  { to: "/stars", key: "nav.stars" },
  { to: "/black-holes", key: "nav.blackholes" },
  { to: "/missions", key: "nav.missions" },
  { to: "/map", key: "nav.map" },
];

export function SiteHeader() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !searchOpen) {
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="panel rounded-full mx-auto max-w-6xl">
          <div className="h-12 px-3 sm:px-4 flex items-center gap-3 sm:gap-6 text-[13px]">
            <Link to="/" className="font-medium tracking-tight shrink-0 pl-2">
              ccosmos<span className="text-muted-foreground">.space</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-5 ml-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {t(n.key)}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={lang === "ru" ? "Поиск" : "Search"}
                className="h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>

              <LanguageToggle />

              <button
                className="lg:hidden h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Menu"
              >
                {open ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden absolute left-0 right-0 px-3 mt-2">
            <div className="mx-auto max-w-6xl panel rounded-2xl animate-fade-in shadow-xl">
              <div className="px-3 py-2 grid grid-cols-2 gap-1 text-sm">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
                    activeProps={{ className: "text-foreground bg-white/[0.04]" }}
                  >
                    {t(n.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
