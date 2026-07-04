"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, getTranslatedPathname } from "@/i18n/navigation";
import Culture from "@/components/ui/Culture/Culture";
import HeaderNav from "./HeaderNav";

const Header = () => {
  const pathname = usePathname();
  const defaultLocale = useLocale();
  const t = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState(defaultLocale);
  const [scrolledPast100vh, setScrolledPast100vh] = useState(false);
  const svgRef = useRef(null);
  const menuItemsRef = useRef([]);

  // next-intl's usePathname retourne le path sans préfixe de locale
  const isHomePage = pathname === "/";
  const showLogo = !isHomePage;

  const getSvgColor = () => {
    if (isOpen) return "stroke-black";
    if (isHomePage) {
      return scrolledPast100vh ? "stroke-black" : "stroke-white";
    }
    return "stroke-black";
  };

  const closeMenu = (callback) => {
    const menuItems = menuItemsRef.current.filter(Boolean);
    if (menuItems.length > 0) {
      gsap.to(menuItems, {
        x: 40,
        opacity: 0,
        duration: 0.25,
        stagger: 0.06,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
          callback?.();
        },
      });
    } else {
      setIsOpen(false);
      callback?.();
    }
  };

  const handleClick = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const handleLinkClick = () => closeMenu();

  useEffect(() => {
    if (svgRef.current) {
      const startAnim = svgRef.current.querySelector("#start");
      const reverseAnim = svgRef.current.querySelector("#reverse");
      if (isOpen) {
        startAnim?.beginElement();
      } else {
        reverseAnim?.beginElement();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const menuItems = menuItemsRef.current.filter(Boolean);
      gsap.set(menuItems, { x: 40, opacity: 0 });
      gsap.to(menuItems, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isHomePage) {
      setScrolledPast100vh(false);
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolledPast100vh(scrollY > window.innerHeight - 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Fermer le menu sur changement de route (retour navigateur inclus)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloquer le scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="bg-transparent backdrop-blur-xs relative z-50">
        <div className="flex items-center justify-between max-w-laptop mx-auto px-6">
          {showLogo && (
            <Link href="/">
              <Image
                src="/images/logo/logo-dore.svg"
                alt="Logo Beeheidi"
                width={500}
                height={500}
                className="object-contain w-full h-18"
              />
            </Link>
          )}
          <div className="w-full flex items-center justify-end gap-4">
            <Culture
              variant={
                isHomePage && !scrolledPast100vh ? "light" : "dark"
              }
            />
            <svg
              ref={svgRef}
              className={`w-24 h-24 scale-50 z-52 outline-none transition-colors duration-300 cursor-pointer ${getSvgColor()}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              strokeWidth=".6"
              fill="rgba(0,0,0,0)"
              strokeLinecap="round"
              onClick={handleClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleClick()}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
                <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
              </path>
              <rect width="10" height="10" stroke="none">
                <animate dur="2s" id="reverse" attributeName="width" begin="indefinite" />
              </rect>
              <rect width="10" height="10" stroke="none">
                <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="indefinite" />
                <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
              </rect>
            </svg>
          </div>
        </div>
      </header>

      {/* Backdrop semi-opaque */}
      <div
        className={`fixed inset-0 z-51 bg-black transition-opacity duration-400 ${
          isOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClick}
        aria-hidden="true"
      />

      {/* Panneau latéral droit */}
      <div
        className={`fixed top-0 right-0 z-52 h-screen bg-white/60 backdrop-blur-sm flex flex-col justify-center px-10 py-16 w-80 lg:w-96 shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Logo watermark */}
        <div className="relative mb-8 w-full pointer-events-none select-none">
          <Image
            src="/images/logo/logo-dore.svg"
            alt=""
            width={200}
            height={100}
            className="object-contain"
          />
        </div>

        <HeaderNav
          t={t}
          handleLinkClick={handleLinkClick}
          menuItemsRef={menuItemsRef}
          locale={locale}
        />

        <div className="mt-10 pt-8 border-t border-gray-100">
          <Culture variant="dark" />
        </div>
      </div>
    </>
  );
};

export default Header;
