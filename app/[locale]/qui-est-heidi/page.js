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

        <div className="mb-20 md:mb-32 space-y-16">
          {/* L'équipe qui nous accompagne */}
          <section>
            <h2 className="text-3xl md:text-4xl font-light text-anthracite mb-6">
              {t("guidesTeam.title")}
            </h2>
            <div className="space-y-4 text-lg font-light text-gray-700 leading-relaxed">
              <p>{t("guidesTeam.paragraph1")}</p>
              <p>{t("guidesTeam.paragraph2")}</p>
              <p>{t("guidesTeam.paragraph3")}</p>
              <p>{t("guidesTeam.paragraph4")}</p>
            </div>
          </section>

          {/* Beeheidi en quelques mots */}
          <section>
            <h2 className="text-3xl md:text-4xl font-light text-anthracite mb-6">
              {t("inAFewWords.title")}
            </h2>
            <div className="space-y-4 text-lg font-light text-gray-700 leading-relaxed">
              <p>{t("inAFewWords.content")}</p>
            </div>
          </section>
        </div>

        <ImageDuo
          image1Src="/images/qui-est-heidi/portrait.jpg"
          image1Alt="Sandra, fondatrice de Beeheidi"
          image2Src="/images/qui-est-heidi/pose-ciel.jpeg"
          image2Alt="Vue panoramique depuis un plateau alpin"
          image3Src="/images/qui-est-heidi/qui-est-heidi-img-2.jpg"
          image3Alt="Stéphane et Sandra, guides Beeheidi"
        />
      </div>
    </main>
  );
}
