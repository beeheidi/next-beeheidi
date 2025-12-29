import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "../i18n";

const pathnames = {
  "/": "/",
  "/explore": {
    fr: "/explore",
    en: "/explore",
  },
  "/qui-est-heidi": {
    fr: "/qui-est-heidi",
    en: "/who-is-heidi",
  },
  "/contact": {
    fr: "/contact",
    en: "/contact",
  },
  "/services": {
    fr: "/services",
    en: "/services",
  },
  "/explore/[slug]": {
    fr: "/explore/[slug]",
    en: "/explore/[slug]",
  },
};

const navigation = createNavigation({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames,
});

export const Link = navigation.Link;
export const redirect = navigation.redirect;
export const usePathname = navigation.usePathname;
export const useRouter = navigation.useRouter;

export const getTranslatedPathname = (pathname, locale) => {
  const pathnameConfig = pathnames[pathname];

  if (typeof pathnameConfig === "object" && pathnameConfig[locale]) {
    return pathnameConfig[locale];
  }
  return pathname;
};
