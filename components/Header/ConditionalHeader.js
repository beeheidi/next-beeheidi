"use client";

import { usePathname } from "@/i18n/navigation";
import Header from "@/components/Header/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Ne pas afficher le Header sur les routes du studio Sanity
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <Header />;
}
