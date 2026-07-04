"use client";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n";
import { useEffect, useState, useRef } from "react";

const Culture = ({ className = "", variant = "light" }) => {
  const defaultLocale = useLocale();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = window.location.pathname;
    const localeFromPath = path.match(/^\/(fr|en)/)?.[1];
    if (localeFromPath && locales.includes(localeFromPath)) {
      setCurrentLocale(localeFromPath);
    } else {
      setCurrentLocale(defaultLocale);
    }

    if (pathname !== "/explore/[slug]" && window.__LOCALIZED_SLUGS__) {
      delete window.__LOCALIZED_SLUGS__;
    }
  }, [defaultLocale, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const switchLocale = (newLocale) => {
    if (newLocale === currentLocale) return;

    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, "");

    if (pathname === "/explore/[slug]" && window.__LOCALIZED_SLUGS__) {
      const localizedSlugs = window.__LOCALIZED_SLUGS__;
      const newSlug = localizedSlugs[newLocale];

      if (newSlug) {
        const newPath = `/${newLocale}/explore/${newSlug}${window.location.search}`;
        window.location.href = newPath;
        return;
      }
    }

    const newPath = `/${newLocale}${pathWithoutLocale}${window.location.search}`;
    window.location.href = newPath;
  };

  const otherLocale = locales.find((loc) => loc !== currentLocale);

  const variantStyles = {
    light: {
      active: "text-white hover:text-white/70",
      inactive: "bg-white/30 text-white",
    },
    dark: {
      active: "text-anthracite hover:text-anthracite/70",
      inactive: "bg-anthracite/25 text-anthracite",
    },
  };

  const styles = variantStyles[variant] ?? variantStyles.light;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-sm font-medium lowercase transition-all duration-200 cursor-pointer ${styles.active}`}
        aria-label={`Langue actuelle : ${currentLocale}`}
        aria-expanded={isOpen}
      >
        {currentLocale}
      </button>

      {isOpen && otherLocale && (
        <button
          type="button"
          onClick={() => {
            switchLocale(otherLocale);
            setIsOpen(false);
          }}
          className={`mt-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium lowercase transition-opacity duration-200 cursor-pointer ${styles.inactive}`}
          aria-label={`Passer en ${otherLocale}`}
        >
          {otherLocale}
        </button>
      )}
    </div>
  );
};

export default Culture;
