"use client";

import TrekkingPath from "@/components/QuiEstHeidi/TrekkingPath";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ImageTextBlock from "@/components/ui/ImageTextBlock/ImageTextBlock";
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
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary opacity-[0.03] rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-primary opacity-[0.05] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Title Section */}
        <PageTitle
          subtitle="Nature & Passion"
          title="Qui est Heidi ?"
          description="Une passionnée de la nature, gardienne des abeilles et créatrice d'émotions."
        />

        {/* First Block: Image Left, Text Right */}
        <ImageTextBlock
          imageSrc="/images/qui-est-heidi/portrait.jpg"
          imageAlt="Portrait de Heidi"
          title="A propos de Heidi"
          description={`Fondatrice & "Happiness Dealer" de Beeheidi, Sandra, c'est la petite fille d'un alpiniste qui lui a soufflé le goût de la montagne.`}
          buttonText="Me contacter"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={true}
          blockClass="block-1"
          showBottomMargin={true}
        />

        {/* Second Block: Text Left, Image Right */}
        <ImageTextBlock
          imageSrc="/images/qui-est-heidi/qui-est-heidi-img-2.jpg"
          imageAlt="L'équipe de Heidi"
          title="L'équipe de Heidi"
          description="Authentiques amoureux de la nature et du terroir, découvrez les membres de notre équipe, toujours prête à vous faire vivre de belles émotions !"
          buttonText="Explorer avec nous"
          buttonHref="/explore"
          buttonVariant="outline"
          imageLeft={false}
          blockClass="block-2"
          showBottomMargin={false}
        />
      </div>
    </main>
  );
}
