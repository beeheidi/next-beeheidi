"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const svgRef = useRef(null);
  const menuItemsRef = useRef([]);
  const isHomePage = pathname === "/";
  const svgColor = isHomePage ? "stroke-white" : "stroke-black";
  const showLogo = !isHomePage;

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
        <div className="w-full flex items-center justify-end ">
          <svg
            ref={svgRef}
            className={`w-24 h-24 z-52 outline-none  transition-colors duration-300 ${
              isOpen
                ? "stroke-black"
                : isHomePage
                  ? "stroke-white"
                  : "stroke-black"
            }`}
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
          <div className="absolute top-0 left-0 right-0 h-screen bg-white">
            <Image
              src="/images/logo/logo-heidi-white.svg"
              alt="Logo Heidi White"
              width={384}
              height={384}
              className="object-contain w-96 h-auto absolute top-56 left-56 -rotate-20"
            />
          </div>
          <nav className="flex items-center justify-center relative z-53">
            <ul className="flex items-center flex-col justify-center gap-12 text-black">
              <li ref={(el) => (menuItemsRef.current[0] = el)}>
                <Link
                  href="/"
                  className="text-6xl text-primary font-bold flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
                  onClick={handleLinkClick}
                >
                  Accueil
                </Link>
              </li>
              <li ref={(el) => (menuItemsRef.current[1] = el)}>
                <Link
                  href="/explore"
                  className="text-6xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
                  onClick={handleLinkClick}
                >
                  <span>Explore</span>
                </Link>
              </li>
              <li ref={(el) => (menuItemsRef.current[2] = el)}>
                <Link
                  href="/qui-est-heidi"
                  className="text-6xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
                  onClick={handleLinkClick}
                >
                  Qui est Heidi ?
                </Link>
              </li>
              <li ref={(el) => (menuItemsRef.current[3] = el)}>
                <Link
                  href="/"
                  className="text-6xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
                  onClick={handleLinkClick}
                >
                  Services
                </Link>
              </li>
              <li ref={(el) => (menuItemsRef.current[4] = el)}>
                <Link
                  href="/"
                  className="text-6xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-scale duration-300"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
