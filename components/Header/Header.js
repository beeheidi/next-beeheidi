"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, getTranslatedPathname } from "@/i18n/navigation";
import Culture from "@/components/ui/Culture/Culture";
import { locales } from "@/i18n";
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
  const isHomePage =
    pathname === "/fr" || pathname === "/en" || pathname?.endsWith("/");
  const showLogo = !isHomePage;

  // Déterminer la couleur du SVG
  const getSvgColor = () => {
    if (isOpen) return "stroke-black";
    if (isHomePage) {
      // Sur la page d'accueil, noir si on a scrollé au-delà de 100vh, sinon blanc
      return scrolledPast100vh ? "stroke-black" : "stroke-white";
    }
    return "stroke-black";
  };

  const handleClick = () => {
    if (isOpen) {
      const menuItems = menuItemsRef.current.filter(Boolean);
      if (menuItems.length > 0) {
        gsap.to(menuItems, {
          x: 100,
          opacity: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.in",
          onComplete: () => {
            setIsOpen(false);
          },
        });
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(true);
    }
  };
  const handleLinkClick = () => {
    const menuItems = menuItemsRef.current.filter(Boolean);
    if (menuItems.length > 0) {
      gsap.to(menuItems, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
        },
      });
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (svgRef.current) {
      const startAnim = svgRef.current.querySelector("#start");
      const reverseAnim = svgRef.current.querySelector("#reverse");

      if (isOpen) {
        if (startAnim) {
          startAnim.beginElement();
        }
      } else {
        if (reverseAnim) {
          reverseAnim.beginElement();
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && menuItemsRef.current.length > 0) {
      const menuItems = menuItemsRef.current.filter(Boolean);

      gsap.set(menuItems, { x: 100, opacity: 0 });

      gsap.to(menuItems, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  // Détecter le scroll au-delà de 100vh sur la page d'accueil
  useEffect(() => {
    if (!isHomePage) {
      setScrolledPast100vh(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight - 100;
      setScrolledPast100vh(scrollY > viewportHeight);
    };

    // Vérifier la position initiale
    handleScroll();

    // Ajouter l'écouteur de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Nettoyer l'écouteur au démontage
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <header className="bg-transparent backdrop-blur-xs fixed top-0 left-0 right-0 z-50 ">
      <div className="flex items-center justify-between max-w-laptop mx-auto">
        {showLogo && (
          <div>
            <Link href="/">
              <Image
                src="/images/logo/logo-dore.svg"
                alt="Logo or"
                width={500}
                height={500}
                className="object-contain w-full h-18"
              />
            </Link>
          </div>
        )}
        <div className="w-full flex items-center justify-end gap-4">
          <Culture />
          <svg
            ref={svgRef}
            className={`w-24 h-24 scale-50 z-52 outline-none transition-colors duration-300 ${getSvgColor()}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            strokeWidth=".6"
            fill="rgba(0,0,0,0)"
            strokeLinecap="round"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick();
            }}
            role="button"
            tabIndex={0}
          >
            <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
              <animate
                dur="0.2s"
                attributeName="d"
                values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                fill="freeze"
                begin="start.begin"
              />
              <animate
                dur="0.2s"
                attributeName="d"
                values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                fill="freeze"
                begin="reverse.begin"
              />
            </path>
            <rect width="10" height="10" stroke="none">
              <animate
                dur="2s"
                id="reverse"
                attributeName="width"
                begin="indefinite"
              />
            </rect>
            <rect width="10" height="10" stroke="none">
              <animate
                dur="0.001s"
                id="start"
                attributeName="width"
                values="10;0"
                fill="freeze"
                begin="indefinite"
              />
              <animate
                dur="0.001s"
                attributeName="width"
                values="0;10"
                fill="freeze"
                begin="reverse.begin"
              />
            </rect>
          </svg>
        </div>

        <div
          className={`flex items-center justify-center fixed top-0 right-0 z-51 w-screen px-12 h-screen transition-all duration-800 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-0 left-0 right-0 h-screen bg-white flex flex-col items-center justify-center gap-12">
            <Image
              src="/images/logo/logo-heidi-white.svg"
              alt="Logo Heidi White"
              width={500}
              height={500}
              className="object-contain  lg:w-[500px] w-[300px] h-auto "
            />
            <HeaderNav
              t={t}
              handleLinkClick={handleLinkClick}
              menuItemsRef={menuItemsRef}
              locale={locale}
            />
            <div className="mt-8">
              <Culture />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
