"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SliderCardsServices({ services }) {
  return (
    <div className="w-full py-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="services-slider pb-12!"
      >
        {services.map((service) => (
          <SwiperSlide key={service.key}>
            <div className="flex flex-col items-start justify-center relative h-96 w-full after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-50 after:z-10 rounded-2xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover absolute top-0 left-0 z-0"
              />
              <div className="relative z-11 px-8 h-full flex flex-col items-start  py-24 backdrop-blur-xs">
                <h3 className="text-3xl font-medium text-primary mb-4 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-px after:bg-primary">
                  {service.title}
                </h3>
                <p className="text-white  text-lg font-light mb-2">
                  {service.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
