import { client } from "@/lib/sanity";
import { prestationsSlugsQuery } from "@/lib/sanity.queries";
import { locales } from "@/i18n";

const baseUrl = "https://beeheidi.ch";

const staticPathnames = {
  "/": { fr: "/", en: "/" },
  "/explore": { fr: "/explore", en: "/explore" },
  "/qui-est-heidi": { fr: "/qui-est-heidi", en: "/who-is-heidi" },
  "/contact": { fr: "/contact", en: "/contact" },
  "/services": { fr: "/services", en: "/services" },
  "/cgv": { fr: "/cgv", en: "/terms-and-conditions" },
  "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
  "/plan-du-site": { fr: "/plan-du-site", en: "/sitemap" },
};

function localizedUrl(locale, path) {
  return path === "/" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${path}`;
}

export default async function sitemap() {
  const entries = [];

  for (const pathsByLocale of Object.values(staticPathnames)) {
    const alternates = Object.fromEntries(
      locales.map((locale) => [locale, localizedUrl(locale, pathsByLocale[locale])])
    );

    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, pathsByLocale[locale]),
        alternates: { languages: alternates },
      });
    }
  }

  for (const locale of locales) {
    try {
      const slugs = await client.fetch(prestationsSlugsQuery(locale));
      for (const { slug } of slugs) {
        entries.push({ url: `${baseUrl}/${locale}/explore/${slug}` });
      }
    } catch (error) {
      console.error("sitemap: error fetching prestation slugs", error);
    }
  }

  return entries;
}
