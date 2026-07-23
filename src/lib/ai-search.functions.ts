import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allSearchItems } from "@/lib/search-index";

const Input = z.object({
  query: z.string().min(2).max(200),
  lang: z.enum(["ru", "en"]),
});

export const aiSearch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { answer: null as string | null, ids: [] as string[] };

    const catalog = allSearchItems.map((it) => ({
      id: it.id,
      title: it.title[data.lang],
      subtitle: it.subtitle[data.lang],
    }));

    const sysRu =
      "Ты помощник поиска по энциклопедии космоса ccosmos.space. По запросу пользователя выбери самые релевантные страницы из каталога и, если это вопрос, дай ОЧЕНЬ короткий ответ (1–2 предложения). Отвечай СТРОГО JSON вида {\"answer\": string|null, \"ids\": string[]}. До 6 id, отсортированных по релевантности. Только id из каталога.";
    const sysEn =
      'You are a search assistant for the ccosmos.space cosmos encyclopedia. Pick the most relevant pages from the catalog and, if the query is a question, give a VERY short answer (1-2 sentences). Reply STRICTLY as JSON {"answer": string|null, "ids": string[]}. Up to 6 ids ordered by relevance. Only ids from the catalog.';

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: data.lang === "ru" ? sysRu : sysEn },
            {
              role: "user",
              content: `Catalog:\n${JSON.stringify(catalog)}\n\nQuery: ${data.query}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });
      if (!res.ok) return { answer: null, ids: [] };
      const j = await res.json();
      const content = j?.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(content);
      const validIds = new Set(allSearchItems.map((i) => i.id));
      const ids = Array.isArray(parsed.ids)
        ? parsed.ids.filter((x: unknown): x is string => typeof x === "string" && validIds.has(x)).slice(0, 6)
        : [];
      const answer = typeof parsed.answer === "string" && parsed.answer.trim() ? parsed.answer.trim() : null;
      return { answer, ids };
    } catch {
      return { answer: null, ids: [] };
    }
  });
