import React from "react";
import { Link, getTranslatedPathname } from "@/i18n/navigation";

export default function HeaderNav({ t, handleLinkClick, menuItemsRef, locale }) {
  const startIndex = 6;

  const linkClass =
    "text-xl lg:text-2xl font-light text-anthracite hover:text-primary transition-colors duration-200 tracking-wide";

  const navItems = [
    { key: "home", href: "/" },
    { key: "explore", href: "/explore" },
    { key: "whoIsHeidi", href: getTranslatedPathname("/qui-est-heidi", locale) },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <nav aria-label="Menu principal">
      <ul className="flex flex-col gap-7">
        {navItems.map((item, i) => (
          <li key={item.key} ref={(el) => (menuItemsRef.current[startIndex + i] = el)}>
            <Link href={item.href} className={linkClass} onClick={handleLinkClick}>
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
