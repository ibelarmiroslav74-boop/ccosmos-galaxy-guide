import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { searchItems, type SearchItem, allSearchItems } from "@/lib/search-index";
import { aiSearch } from "@/lib/ai-search.functions";

interface Props {
  onClose: () => void;
}

interface AiState {
  loading: boolean;
  answer: string | null;
  extra: SearchItem[];
}

export function SearchBar({ onClose }: Props) {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [ai, setAi] = useState<AiState>({ loading: false, answer: null, extra: [] });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const callAiSearch = useServerFn(aiSearch);
  const reqIdRef = useRef(0);

  const local = searchItems(q, lang, 10);

  // merge: AI ids first (that aren't already at top of local), then local
  const merged: SearchItem[] = (() => {
    if (!q.trim()) return local;
    const seen = new Set<string>();
    const out: SearchItem[] = [];
    for (const it of ai.extra) {
      if (!seen.has(it.id)) { seen.add(it.id); out.push(it); }
    }
    for (const it of local) {
      if (!seen.has(it.id)) { seen.add(it.id); out.push(it); }
    }
    return out.slice(0, 10);
  })();

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  // Debounced AI enrichment
  useEffect(() => {
    const query = q.trim();
    if (query.length < 3) {
      setAi({ loading: false, answer: null, extra: [] });
      return;
    }
    const myId = ++reqIdRef.current;
    setAi((s) => ({ ...s, loading: true }));
    const t = setTimeout(async () => {
      try {
        const res = await callAiSearch({ data: { query, lang } });
        if (myId !== reqIdRef.current) return;
        const idMap = new Map(allSearchItems.map((i) => [i.id, i]));
        const extra = res.ids.map((id) => idMap.get(id)).filter((x): x is SearchItem => !!x);
        setAi({ loading: false, answer: res.answer, extra });
      } catch {
        if (myId !== reqIdRef.current) return;
        setAi({ loading: false, answer: null, extra: [] });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [q, lang, callAiSearch]);

  const go = (it: SearchItem) => {
    onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: it.to, params: it.params } as any);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, merged.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { const hit = merged[active]; if (hit) go(hit); }
  };

  const showDropdown = q.trim().length > 0 || ai.answer;

  return (
    <>
      <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => { setQ(e.target.value); setActive(0); }}
        onKeyDown={onKey}
        placeholder={lang === "ru" ? "Спросите что угодно о космосе…" : "Ask anything about the cosmos…"}
        className="flex-1 min-w-0 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={lang === "ru" ? "Поиск" : "Search"}
      />
      {ai.loading && (
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-pulse" />
          AI
        </span>
      )}
      <button
        onClick={onClose}
        aria-label={lang === "ru" ? "Закрыть" : "Close"}
        className="shrink-0 h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-2 px-3 sm:px-0 pointer-events-none">
          <div className="mx-auto max-w-6xl">
            <div
              className="panel rounded-2xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto"
              onMouseDown={(e) => e.preventDefault()}
            >
              {ai.answer && (
                <div className="px-4 py-3 border-b border-hairline">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/80" />
                    {lang === "ru" ? "AI-ответ" : "AI answer"}
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-foreground/90">{ai.answer}</p>
                </div>
              )}

              <ul className="max-h-[55vh] overflow-y-auto py-1 overscroll-contain">
                {merged.length === 0 && !ai.loading && (
                  <li className="px-4 py-8 text-sm text-center text-muted-foreground">
                    {lang === "ru" ? "Ничего не найдено" : "No results"}
                  </li>
                )}
                {ai.loading && merged.length === 0 && (
                  <li className="px-4 py-8 text-sm text-center text-muted-foreground">
                    {lang === "ru" ? "AI думает…" : "AI thinking…"}
                  </li>
                )}
                {merged.map((it, i) => {
                  const isAi = ai.extra.some((e) => e.id === it.id);
                  return (
                    <li key={it.id}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(it)}
                        className={`w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm transition-colors ${
                          i === active ? "bg-white/[0.06]" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium">{it.title[lang]}</span>
                            {isAi && (
                              <span className="shrink-0 text-[9px] uppercase tracking-widest text-muted-foreground border border-hairline rounded px-1 py-px">
                                AI
                              </span>
                            )}
                          </div>
                          <div className="truncate text-xs text-muted-foreground mt-0.5">{it.subtitle[lang]}</div>
                        </div>
                        <span className="text-muted-foreground text-xs shrink-0">↵</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="hidden sm:flex px-4 py-2 border-t border-hairline items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>↑↓ {lang === "ru" ? "навигация" : "navigate"}</span>
                <span>↵ {lang === "ru" ? "открыть" : "open"}</span>
                <span>esc {lang === "ru" ? "закрыть" : "close"}</span>
                <span className="ml-auto">⌘K</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
