import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="h-screen w-full relative">
      <Image
        src="/images/accueil/Beeheidi.jpg"
        alt="Beeheidi"
        width={1920}
        height={1080}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 items-start justify-center">
        <Image
          src="/images/logo/logo.svg"
          alt="Beeheidi"
          width={200}
          height={200}
          className="object-contain w-96 h-auto"
        />
        <h1 className="text-white text-4xl font-bold">
          Vivez une experience unique
        </h1>
      </div>

      <div className="absolute bottom-24 left-0 flex items-center gap-4 ">
        <div className="w-96 h-px bg-white "></div>
        <div className="text-white flex items-center gap-4">
          <p className="text-lg font-bold">Qui sommes-nous ?</p>
          <ChevronDown className="w-8 h-8 bg-white text-black rounded-full p-1 animate-bounce duration-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
