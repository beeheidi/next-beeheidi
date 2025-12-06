"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent backdrop-blur-xs fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-end max-w-laptop mx-auto">
        <svg
          className={`w-24 h-24 z-52 transition-text duration-300 ${isOpen ? "stroke-black" : "stroke-white"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          stroke="#eee"
          strokeWidth=".6"
          fill="rgba(0,0,0,0)"
          strokeLinecap="round"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
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
              begin="click"
            />
          </rect>
          <rect width="10" height="10" stroke="none">
            <animate
              dur="0.001s"
              id="start"
              attributeName="width"
              values="10;0"
              fill="freeze"
              begin="click"
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
        className={`flex items-center justify-center fixed top-0 right-0 z-51 w-screen px-12 h-screen transition-all duration-600 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
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
            <li>
              <Link href="/" className="text-6xl text-primary font-bold">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-6xl font-bold text-primary flex  items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <Image
                  src="/images/accueil/home-explore.png"
                  alt="Explore"
                  width={192}
                  height={192}
                  className="object-contain w-46 h-46"
                />
                <span>Explore</span>
              </Link>
            </li>
            <li>
              <Link href="/qui-est-heidi" className="text-6xl font-bold text-[#cbb68b]">
                Qui est Heidi ?
              </Link>
            </li>
            <li>
              <Link href="/" className="text-6xl font-bold text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/" className="text-6xl font-bold text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
