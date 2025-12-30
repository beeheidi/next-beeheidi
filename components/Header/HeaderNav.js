import React from "react";
import { Link, getTranslatedPathname } from "@/i18n/navigation";

export default function HeaderNav({
  t,
  handleLinkClick,
  menuItemsRef,
  locale,
}) {
  const startIndex = 6;

  return (
    <nav className="flex items-center justify-center relative z-53">
      <ul className="flex items-center flex-col justify-center lg:gap-12 gap-6 text-black">
        <li ref={(el) => (menuItemsRef.current[startIndex] = el)}>
          <Link
            href="/"
            className="lg:text-6xl text-4xl text-primary font-bold flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
            onClick={handleLinkClick}
          >
            {t("home")}
          </Link>
        </li>
        <li ref={(el) => (menuItemsRef.current[startIndex + 1] = el)}>
          <Link
            href="/explore"
            className="lg:text-6xl text-4xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
            onClick={handleLinkClick}
          >
            <span>{t("explore")}</span>
          </Link>
        </li>
        <li ref={(el) => (menuItemsRef.current[startIndex + 2] = el)}>
          <Link
            href={getTranslatedPathname("/qui-est-heidi", locale)}
            className="lg:text-6xl text-4xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
            onClick={handleLinkClick}
          >
            {t("whoIsHeidi")}
          </Link>
        </li>
        <li ref={(el) => (menuItemsRef.current[startIndex + 3] = el)}>
          <Link
            href="/services"
            className="lg:text-6xl text-4xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
            onClick={handleLinkClick}
          >
            {t("services")}
          </Link>
        </li>
        <li ref={(el) => (menuItemsRef.current[startIndex + 4] = el)}>
          <Link
            href="/contact"
            className="lg:text-6xl text-4xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
            onClick={handleLinkClick}
          >
            {t("contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
