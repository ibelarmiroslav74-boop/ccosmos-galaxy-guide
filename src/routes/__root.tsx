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
      <div className="panel max-w-md rounded-3xl p-12 text-center">
        <div className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground">404</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Lost in space</h1>
        <p className="mt-3 text-sm text-muted-foreground">Потерялись в космосе — такой страницы нет в наблюдаемой Вселенной.</p>
        <div className="mt-8">
          <Link to="/" className="btn-primary inline-block">На главную · Go home</Link>
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
      <div className="panel max-w-md rounded-3xl p-12 text-center">
        <div className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground">Error</div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Что-то пошло не так</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something went wrong while loading this view.</p>
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-ghost">На главную</a>
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
