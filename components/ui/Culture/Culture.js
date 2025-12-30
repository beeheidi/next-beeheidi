"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n";
import { useEffect, useState } from "react";

const Culture = ({ className = "" }) => {
  const defaultLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);

  useEffect(() => {
    const path = window.location.pathname;
    const localeFromPath = path.match(/^\/(fr|en)/)?.[1];
    if (localeFromPath && locales.includes(localeFromPath)) {
      setCurrentLocale(localeFromPath);
    } else {
      setCurrentLocale(defaultLocale);
    }
    
    // Nettoyer les slugs localisés si on n'est plus sur une page de détail
    if (pathname !== "/explore/[slug]" && window.__LOCALIZED_SLUGS__) {
      delete window.__LOCALIZED_SLUGS__;
    }
  }, [defaultLocale, pathname]);

  const switchLocale = (newLocale) => {
    if (newLocale === currentLocale) return;

    // Extraire le chemin actuel sans le locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, "");
    
    // Vérifier si on est sur une page de détail de prestation avec des slugs localisés
    if (pathname === "/explore/[slug]" && window.__LOCALIZED_SLUGS__) {
      const localizedSlugs = window.__LOCALIZED_SLUGS__;
      const newSlug = localizedSlugs[newLocale];
      
      if (newSlug) {
        // Utiliser le slug localisé correspondant à la nouvelle langue
        const newPath = `/${newLocale}/explore/${newSlug}${window.location.search}`;
        window.location.href = newPath;
        return;
      }
    }
    
    // Pour les autres pages, construire la nouvelle URL avec le nouveau locale
    const newPath = `/${newLocale}${pathWithoutLocale}${window.location.search}`;
    
    // Utiliser window.location pour naviguer (plus fiable pour les routes dynamiques)
    window.location.href = newPath;
  };

  const languageNames = {
    fr: "FR",
    en: "EN",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200  ${
            currentLocale === loc
              ? "bg-primary text-white shadow-md"
              : "text-black hover:text-primary hover:bg-gray-100 cursor-pointer"
          }`}
          aria-label={`Switch to ${languageNames[loc]}`}
        >
          {languageNames[loc]}
        </button>
      ))}
    </div>
  );
};

export default Culture;
