"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, getTranslatedPathname } from "@/i18n/navigation";
import Culture from "@/components/ui/Culture/Culture";
import { locales } from "@/i18n";
import SocialItems from "../ui/SocialItems/SocialItems";

const Footer = () => {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");
  const defaultLocale = useLocale();
  const [locale, setLocale] = useState(defaultLocale);
  const currentYear = new Date().getFullYear();

  // Détecter la locale depuis l'URL pour être sûr qu'elle est à jour
  useEffect(() => {
    const path = window.location.pathname;
    const localeFromPath = path.match(/^\/(fr|en)/)?.[1];
    if (localeFromPath && locales.includes(localeFromPath)) {
      setLocale(localeFromPath);
    } else {
      setLocale(defaultLocale);
    }
  }, [defaultLocale]);

  return (
    <footer className=" text-black border-t border-gray-200">
      <div className="max-w-laptop mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo/logo-dore.svg"
                alt="Logo Beeheidi"
                width={200}
                height={200}
                className="object-contain h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-md">
              {tFooter("description")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {tFooter("followUs")}
              </span>

              <SocialItems />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              {tFooter("navigation")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("explore")}
                </Link>
              </li>
              <li>
                <Link
                  href={getTranslatedPathname("/qui-est-heidi", locale)}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("whoIsHeidi")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              {tFooter("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {tFooter("legal")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {tFooter("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            {tFooter("copyright", { year: currentYear })}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">{tFooter("madeWith")}</span>
            <span className="text-primary">❤️</span>
            {/*  <span className="text-gray-600 text-sm">{tFooter("in")}</span>
            <span className="text-primary font-semibold">
              {tFooter("valais")}
            </span> */}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">
              {tFooter("navigation")}:
            </span>
            <Culture />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
