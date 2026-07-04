"use client";

import TrekkingPath from "@/components/QuiEstHeidi/TrekkingPath";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ImageTextBlock from "@/components/ui/ImageTextBlock/ImageTextBlock";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import TopImage from "@/components/ui/TopImage/TopImage";

export default function QuiEstHeidi() {
  const t = useTranslations("quiEstHeidi");
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".title-section > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".block-1", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

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
      className="bg-white text-black pt-32 pb-32 overflow-hidden relative"
    >
      <TopImage position="top-right" size="large" />
      <TrekkingPath />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <PageTitle
          subtitle={t("subtitle")}
          title={t("title")}
          description={t("description")}
          align="right"
          textMaxWidth="3xl"
        />

        <ImageTextBlock
          imageSrc="/images/qui-est-heidi/portrait.jpg"
          imageAlt="Sandra, fondatrice de Beeheidi"
          title={t("aboutHeidi.title")}
          description={t("aboutHeidi.description")}
          buttonText={t("aboutHeidi.button")}
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={true}
          blockClass="block-1"
          showBottomMargin={true}
        />

        <ImageTextBlock
          imageSrc="/images/qui-est-heidi/qui-est-heidi-img-2.jpg"
          imageAlt="Stéphane, guide de montagne"
          title={t("ourTeam.title")}
          description={t("ourTeam.description")}
          buttonText={t("ourTeam.button")}
          buttonHref="/explore"
          buttonVariant="outline"
          imageLeft={true}
          blockClass="block-2"
          showBottomMargin={false}
        />
      </div>
    </main>
  );
}
