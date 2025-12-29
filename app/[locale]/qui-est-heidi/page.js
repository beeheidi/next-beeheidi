"use client";

import TrekkingPath from "@/components/QuiEstHeidi/TrekkingPath";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ImageTextBlock from "@/components/ui/ImageTextBlock/ImageTextBlock";
import { useEffect } from "react";
import gsap from "gsap";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import TopImage from "@/components/ui/TopImage/TopImage";

export default function QuiEstHeidi() {
  const locale = useLocale();
  const t = useTranslations("quiEstHeidi");
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
      className=" bg-white text-black pt-32 pb-32 overflow-hidden relative"
    >
      <TopImage position="top-left" size="large" />
      <TrekkingPath />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary opacity-[0.03] rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-primary opacity-[0.05] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <PageTitle
          subtitle={t("subtitle")}
          title={t("title")}
          description={t("description")}
        />

        <ImageTextBlock
          imageSrc="/images/qui-est-heidi/portrait.jpg"
          imageAlt="Portrait de Heidi"
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
          imageAlt="L'équipe de Heidi"
          title={t("ourTeam.title")}
          description={t("ourTeam.description")}
          buttonText={t("ourTeam.button")}
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
