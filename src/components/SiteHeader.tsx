import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageToggle, useI18n, type DictKey } from "@/lib/i18n";

const NAV: { to: string; key: DictKey }[] = [
  { to: "/planets", key: "nav.planets" },
  { to: "/galaxies", key: "nav.galaxies" },
  { to: "/stars", key: "nav.stars" },
  { to: "/black-holes", key: "nav.blackholes" },
  { to: "/missions", key: "nav.missions" },
  { to: "/map", key: "nav.map" },
];

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="panel">
        <div className="mx-auto max-w-6xl px-5 h-11 flex items-center gap-6 text-[13px]">
          <Link to="/" className="font-medium tracking-tight shrink-0">
            ccosmos<span className="text-muted-foreground">.space</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageToggle />
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground text-base"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden panel border-t">
          <div className="mx-auto max-w-6xl px-5 py-2 grid grid-cols-2 gap-1 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-2 py-2 text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {t(n.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
