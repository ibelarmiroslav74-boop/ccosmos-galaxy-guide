import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageToggle, useI18n, type DictKey } from "@/lib/i18n";

const NAV: { to: string; key: DictKey }[] = [
  { to: "/planets", key: "nav.planets" },
  { to: "/galaxies", key: "nav.galaxies" },
  { to: "/stars", key: "nav.stars" },
  { to: "/black-holes", key: "nav.blackholes" },
  { to: "/missions", key: "nav.missions" },
  { to: "/timeline", key: "nav.timeline" },
  { to: "/map", key: "nav.map" },
];

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto max-w-7xl glass-strong rounded-2xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="relative inline-block h-8 w-8 rounded-full bg-gradient-to-br from-[color:var(--accent)] via-[color:var(--primary)] to-[color:var(--nebula)] shadow-[var(--shadow-glow)] animate-spin-slow" />
          <span className="font-display text-lg font-semibold tracking-tight text-gradient">
            ccosmos<span className="text-muted-foreground">.space</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-1.5 text-sm text-muted-foreground rounded-lg hover:text-foreground hover:bg-white/5 transition"
              activeProps={{ className: "text-foreground bg-white/10" }}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
          <button
            className="lg:hidden btn-ghost !py-1.5 !px-3 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 glass rounded-2xl p-2 grid grid-cols-2 gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm rounded-lg hover:bg-white/5"
              activeProps={{ className: "bg-white/10" }}
            >
              {t(n.key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
