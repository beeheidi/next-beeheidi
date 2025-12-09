"use client";

import Image from "next/image";
import Link from "next/link";
import TrekkingPath from "@/components/QuiEstHeidi/TrekkingPath";
import Button from "@/components/ui/Button/Button";
import { useEffect } from "react";
import gsap from "gsap";
import { useRef } from "react";

export default function QuiEstHeidi() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title section
      gsap.from(".title-section > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate first block
      gsap.from(".block-1", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // Animate second block
      gsap.from(".block-2", {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-white text-black pt-32 pb-32 overflow-hidden relative"
    >
      <TrekkingPath />
      {/* Decorative Sun/Light effect using Primary Color */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-[var(--color-primary)] opacity-[0.03] rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-[var(--color-primary)] opacity-[0.05] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Title Section */}
        <section className="mb-32 text-center title-section">
          <span className="block text-[var(--color-primary)] font-bold tracking-[0.2em] text-sm uppercase mb-4">
            Nature & Passion
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-8">
            Qui est Heidi ?
          </h1>
          <div className="w-px h-20 bg-[var(--color-primary)] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Une passionnée de la nature, gardienne des abeilles et créatrice
            d'émotions.
          </p>
        </section>

        {/* First Block: Image Left, Text Right */}
        <section className="flex flex-col md:flex-row items-center mb-40 relative group block-1">
          <div className="md:w-7/12 w-full relative aspect-[3/4] md:aspect-[4/3] rounded-[3rem] md:rounded-tr-[8rem] md:rounded-bl-[4rem] overflow-hidden shadow-2xl z-10 transition-all duration-700 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/qui-est-heidi/portrait.jpg"
              alt="Portrait de Heidi"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="md:w-5/12 w-[90%] -mt-20 md:mt-0 md:-ml-32 z-20">
            <div className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-4xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-[var(--color-primary)] opacity-10 rounded-full blur-xl animate-pulse"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--color-primary)]"></span>A
                propos de Heidi
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light mb-8">
                Fondatrice & "Happiness Dealer" de Beeheidi, Sandra, c’est la
                petite fille d’un alpiniste qui lui a soufflé le goût de la
                montagne.
              </p>
              <Button
                href="/contact"
                variant="primary"
                rounded="full"
                size="md"
                className="px-8 py-3"
              >
                Me contacter
              </Button>
            </div>
          </div>
        </section>

        {/* Second Block: Text Left, Image Right */}
        <section className="flex flex-col md:flex-row items-center relative group block-2">
          <div className="md:w-5/12 w-[90%] -mb-20 md:mb-0 md:-mr-32 z-20 order-2 md:order-1">
            <div className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative">
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-primary opacity-10 rounded-full blur-xl animate-pulse"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-primary"></span>
                L'équipe de Heidi
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light mb-8">
                Authentiques amoureux de la nature et du terroir, découvrez les
                membres de notre équipe, toujours prête à vous faire vivre de
                belles émotions !
              </p>
              <Button
                href="/explore"
                variant="outline"
                rounded="full"
                size="md"
                className="px-8 py-3"
              >
                Explorer avec nous
              </Button>
            </div>
          </div>
          <div className="md:w-7/12 w-full relative aspect-[3/4] md:aspect-[4/3] rounded-[3rem] md:rounded-tl-[8rem] md:rounded-br-[4rem] overflow-hidden shadow-2xl z-10 order-1 md:order-2 transition-all duration-700 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/qui-est-heidi/qui-est-heidi-img-2.jpg"
              alt="L'équipe de Heidi"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
