import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n";

// Mapping des pages traduites (anglais -> français)
const pageMappings = {
  "who-is-heidi": "qui-est-heidi",
  "terms-and-conditions": "cgv",
  "legal-notice": "mentions-legales",
};

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // Toujours afficher le préfixe de langue dans l'URL
});

const proxy = (request) => {
  const { pathname } = request.nextUrl;

  // Vérifier si c'est une URL traduite en anglais
  for (const [enSlug, frSlug] of Object.entries(pageMappings)) {
    if (pathname === `/en/${enSlug}`) {
      // Réécrire vers la route française
      const url = request.nextUrl.clone();
      url.pathname = `/en/${frSlug}`;
      return NextResponse.rewrite(url);
    }
  }

  // Sinon, utiliser le middleware next-intl normal
  return intlMiddleware(request);
};

export default proxy;
export { proxy };

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques, les API routes et le studio
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
