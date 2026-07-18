import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StarField } from "@/components/StarField";
import { ClientOnly } from "@/components/ClientOnly";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--nebula)] animate-float-slow" />
        <h1 className="text-3xl font-display font-semibold text-gradient">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Lost in space · Потерялись в космосе</p>
        <div className="mt-6">
          <Link to="/" className="btn-primary inline-block">Go home / На главную</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-xl font-semibold">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Retry
          </button>
          <a href="/" className="btn-ghost">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0f1f" },
      { title: "ccosmos.space — энциклопедия космоса" },
      {
        name: "description",
        content:
          "3D-модели планет, интерактивная карта галактик и глубокие статьи о космосе. Открытая энциклопедия на русском и английском.",
      },
      { name: "author", content: "ccosmos.space" },
      { property: "og:site_name", content: "ccosmos.space" },
      { property: "og:title", content: "ccosmos.space — энциклопедия космоса" },
      {
        property: "og:description",
        content: "3D-модели планет, интерактивная карта галактик и глубокие статьи о космосе. Открытая энциклопедия на русском и английском.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ccosmos.space — энциклопедия космоса" },
      { name: "twitter:description", content: "3D-модели планет, интерактивная карта галактик и глубокие статьи о космосе. Открытая энциклопедия на русском и английском." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/17be2dad-8b7c-4d1d-8d44-b8d8a39a499f/id-preview-1caa5c05--68dec340-398c-476e-bb6a-8ad15999072b.lovable.app-1784363921106.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/17be2dad-8b7c-4d1d-8d44-b8d8a39a499f/id-preview-1caa5c05--68dec340-398c-476e-bb6a-8ad15999072b.lovable.app-1784363921106.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ClientOnly><StarField /></ClientOnly>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-5">
          <Outlet />
        </main>
        <SiteFooter />
      </I18nProvider>
    </QueryClientProvider>
  );
}
