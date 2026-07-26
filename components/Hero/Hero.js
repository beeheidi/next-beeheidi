"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = ({ title, whoAreWe }) => {
  const slides = [
    {
      image: "/images/accueil/BeeheidiSwitzerlandFlower.jpg",
      alt: "Fleurs de Suisse",
    },
    {
      image: "/images/accueil/2020BeeheidiRandonnevalais.jpg",
      alt: "Randonnée Valais",
    },
  ];

  return (
    <section className="h-screen w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Logo + baseline — centrés, légèrement au-dessus du milieu */}
      <div className="absolute w-fit left-6 md:left-[250px]  inset-0 flex flex-col  justify-center z-10 pointer-events-none px-6">
        <Image
          src="/images/logo/logo.svg"
          alt="Beeheidi"
          width={400}
          height={200}
          className="object-contain w-72 md:w-96 h-auto mb-6"
        />
        <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide text-center">
          {title}
        </h1>
      </div>

      {/* Scroll CTA — bas de page, design original */}
      <div className="absolute bottom-24 left-0 flex items-center gap-4 z-10">
        <div className="w-12 md:w-65 h-px bg-white" />
        <div className="text-white flex items-center gap-4">
          <p className="text-lg font-light">{whoAreWe}</p>
          <ChevronDown
            onClick={() =>
              window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" })
            }
            className="w-8 h-8 bg-white text-black rounded-full p-1 animate-bounce cursor-pointer pointer-events-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
