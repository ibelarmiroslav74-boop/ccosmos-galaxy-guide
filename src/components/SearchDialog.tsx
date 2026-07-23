import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { searchItems } from "@/lib/search-index";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: Props) {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = searchItems(q, lang);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter") {
        const hit = results[active];
        if (hit) go(hit.to, hit.params);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!open) return null;

  const go = (to: string, params?: Record<string, string>) => {
    onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to, params } as any);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex flex-col sm:items-start sm:justify-center sm:pt-[10vh] sm:px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl sm:mx-auto flex-1 sm:flex-none flex flex-col panel sm:rounded-2xl rounded-none overflow-hidden sm:shadow-2xl"
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 sm:px-4 border-b border-hairline">
          <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder={lang === "ru" ? "Планеты, галактики, миссии…" : "Planets, galaxies, missions…"}
            className="flex-1 min-w-0 bg-transparent py-4 text-[16px] sm:text-[15px] outline-none placeholder:text-muted-foreground"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {q && (
            <button
              onClick={() => { setQ(""); inputRef.current?.focus(); }}
              aria-label={lang === "ru" ? "Очистить" : "Clear"}
              className="shrink-0 h-7 w-7 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-3.5 w-3.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="sm:hidden shrink-0 text-[13px] text-muted-foreground hover:text-foreground pl-1 pr-1"
          >
            {lang === "ru" ? "Отмена" : "Cancel"}
          </button>
          <kbd className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        <ul className="flex-1 sm:flex-none sm:max-h-[55vh] overflow-y-auto py-1 overscroll-contain">
          {results.length === 0 && (
            <li className="px-4 py-12 text-sm text-center text-muted-foreground">
              {lang === "ru" ? "Ничего не найдено" : "No results"}
            </li>
          )}
          {results.map((it, i) => (
            <li key={`${it.to}-${it.params?.slug ?? i}`}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(it.to, it.params)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 sm:py-2.5 text-sm transition-colors active:bg-white/[0.08] ${
                  i === active ? "bg-white/[0.06]" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{it.title[lang]}</div>
                  <div className="truncate text-xs text-muted-foreground mt-0.5">{it.subtitle[lang]}</div>
                </div>
                <span className="text-muted-foreground text-xs shrink-0">↵</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex px-4 py-2 border-t border-hairline items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>↑↓ {lang === "ru" ? "навигация" : "navigate"}</span>
          <span>↵ {lang === "ru" ? "открыть" : "open"}</span>
          <span className="ml-auto">⌘K</span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
