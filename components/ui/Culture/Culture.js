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
  }, [defaultLocale, pathname]);

  const switchLocale = (newLocale) => {
    if (newLocale === currentLocale) return;

    router.replace(pathname, { locale: newLocale });
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
