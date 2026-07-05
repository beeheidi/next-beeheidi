"use client";

import TrekkingPath from "@/components/QuiEstHeidi/TrekkingPath";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ImageDuo from "@/components/ui/ImageDuo/ImageDuo";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import TopImage from "@/components/ui/TopImage/TopImage";

export default function QuiEstHeidi() {
  const t = useTranslations("quiEstHeidi");
  const containerRef = useRef(null);

/*   useEffect(() => {
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
  }, []); */

  return (
    <main
      ref={containerRef}
      className=" bg-white text-black pt-8 pb-8 md:pt-32 md:pb-32 overflow-hidden relative"
    >
      <TopImage position="top-left" size="large" />
      <TrekkingPath />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <PageTitle
          subtitle={t("subtitle")}
          title={t("title")}
          description={t.raw("description")}
          descriptionAsHtml
          description2={t.raw("description2")}
          description2AsHtml
          align="left"
          textMaxWidth="full"
          descriptionSize="sm"
        />

        <ImageDuo
          image1Src="/images/qui-est-heidi/portrait.jpg"
          image1Alt="Sandra, fondatrice de Beeheidi"
          image2Src="/images/qui-est-heidi/qui-est-heidi-img-2.jpg"
          image2Alt="Stéphane, guide de montagne"
        />
      </div>
    </main>
  );
}
