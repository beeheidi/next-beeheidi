"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = ({ title, whoAreWe }) => {
  const slides = [
    {
      image: "/images/accueil/Beeheidi.jpg",
      alt: "Beeheidi",
    },
    {
      image: "/images/accueil/2020BeeheidiRandonnevalais.jpg",
      alt: "Randonnée Valais",
    },
    {
      image: "/images/accueil/BeeheidiSwitzerlandFlower.jpg",
      alt: "Fleurs de Suisse",
    },
  ];

  return (
    <section className="h-screen w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
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
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 items-start justify-center z-10 pointer-events-none">
        <Image
          src="/images/logo/logo.svg"
          alt="Beeheidi"
          width={200}
          height={200}
          className="object-contain w-96 h-auto"
        />
        <h1 className="text-white text-4xl font-bold">{title}</h1>
      </div>

      <div className="absolute bottom-24 left-0 flex items-center gap-4 z-10">
        <div className="w-24 md:w-96 h-px bg-white "></div>
        <div className="text-white flex items-center gap-4">
          <p className="text-lg font-bold">{whoAreWe}</p>
          <ChevronDown
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 100,
                behavior: "smooth",
              });
            }}
            className="w-8 h-8 bg-white text-black rounded-full p-1 animate-bounce duration-400 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
