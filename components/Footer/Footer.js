"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, getTranslatedPathname } from "@/i18n/navigation";
import Culture from "@/components/ui/Culture/Culture";
import { locales } from "@/i18n";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");
  const defaultLocale = useLocale();
  const [locale, setLocale] = useState(defaultLocale);
  const currentYear = new Date().getFullYear();

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
    <footer className="text-black border-t border-gray-200">
      <div className="max-w-laptop mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Logo + description + Instagram */}
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
            <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 max-w-sm">
              {tFooter("descriptionLine1")}
              <br />
              {tFooter("descriptionLine2")}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-light">
                {tFooter("followUs")}
              </span>
              <Link
                href="https://www.instagram.com/beeheidi.ch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              {tFooter("contactTitle")}
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-500 text-sm font-light">
                {tFooter("company")}
              </li>
              <li>
                <a
                  href="tel:+41275654440"
                  className="flex items-center gap-2 text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  <Phone size={14} />
                  {tFooter("phone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@beeheidi.ch"
                  className="flex items-center gap-2 text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  <Mail size={14} />
                  {tFooter("email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              {tFooter("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={getTranslatedPathname("/mentions-legales", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("legal")}
                </Link>
              </li>
              <li>
                <Link
                  href={getTranslatedPathname("/cgv", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={getTranslatedPathname("/plan-du-site", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("sitemap")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-100 my-8" />

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-light text-center md:text-left">
            {tFooter("copyright", { year: currentYear })}
          </p>

          <div className="flex items-center gap-1 text-gray-400 text-xs font-light">
            {tFooter("madeWith")}
            <span className="text-primary mx-1">♥</span>
            {tFooter("in")} {tFooter("valais")}
          </div>

          <div className="flex items-center gap-4">
            <Culture variant="dark" />
            <a
              href="/studio"
              className="text-gray-200 text-xs hover:text-gray-400 transition-colors duration-200"
              aria-label="Administration"
            >
              ✦
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
