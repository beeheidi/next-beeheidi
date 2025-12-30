import Button from "@/components/ui/Button/Button";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function ServicesPage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  const services = [
    {
      id: "business",
      title: t.services.business.title,
      description: t.services.business.description,
      weCanOffer: t.services.business.weCanOffer,
      offers: t.services.business.offers,
      image: "/images/services/2020RandonneTrailRunningValaisBissBeeheidi8.jpg",
      alt: "Business",
    },
    {
      id: "tourism",
      title: t.services.tourism.title,
      description: t.services.tourism.description,
      weCanOffer: t.services.tourism.weCanOffer,
      offers: t.services.tourism.offers,
      image: "/images/services/2020BeeheidiCrans-Montana079.jpg",
      alt: "Tourism",
    },
    {
      id: "municipality",
      title: t.services.municipality.title,
      description: t.services.municipality.description,
      weCanOffer: t.services.municipality.weCanOffer,
      offers: t.services.municipality.offers,
      image: "/images/services/PlantesFleursTisanesHerbier21b.jpg",
      alt: "Municipality",
    },
    {
      id: "accommodation",
      title: t.services.accommodation.title,
      description: t.services.accommodation.description,
      weCanOffer: t.services.accommodation.weCanOffer,
      offers: t.services.accommodation.offers,
      image: "/images/services/2020BeeheidiChampry06.jpg",
      alt: "Accommodation",
    },
    {
      id: "concierge",
      title: t.services.concierge.title,
      description: t.services.concierge.description,
      weCanOffer: t.services.concierge.weCanOffer,
      offers: t.services.concierge.offers,
      image: "/images/services/BeeheidiEnjoySwitzerland2.jpg",
      alt: "Concierge",
    },
    {
      id: "sportStore",
      title: t.services.sportStore.title,
      description: t.services.sportStore.description,
      weCanOffer: t.services.sportStore.weCanOffer,
      offers: t.services.sportStore.offers,
      image: "/images/services/BeeheidiEnjoySwitzerland90.jpg",
      alt: "Sport Store",
    },
  ];
  return (
    <main className=" bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />
      <section className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle
          subtitle={t.services.subtitle}
          title={t.services.title}
          description={t.services.description}
          textMaxWidth="7xl"
        />
      </section>
      <section className="max-w-laptop mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          {t.services.youAre}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white  flex items-center justify-center rounded-2xl"
            >
              <Link
                href={`#${service.id}`}
                className="text-primary bg-foreground p-4 rounded-2xl text-lg font-bold mb-4 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-laptop bg-foreground rounded-2xl shadow-2xl mx-auto px-16 py-16 my-16">
        <h2 className="text-3xl font-bold  text-primary mb-8">
          {t.services.whyUs}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {t.services.whyUsList.map((item, index) => (
            <li key={index} className="text-lg font-light text-gray-500">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="max-w-laptop mx-auto px-6 py-16 space-y-8">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const imageLeft = isEven;

          return (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col lg:flex-row items-center   ${
                index > 0 ? "mt-8" : ""
              }`}
            >
              <div
                className={`w-full lg:w-1/2 h-full rounded-2xl overflow-hidden shadow-xl  ${
                  imageLeft ? "lg:order-1 order-2" : "lg:order-2 order-1"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={1920}
                  height={1080}
                  className="w-full lg:h-[600px] h-[400px] object-cover  md:rounded-none"
                  priority={index === 0}
                />
              </div>

              <div
                className={`w-full lg:w-1/2 py-8 px-8 bg-foreground shadow-xl  ${
                  imageLeft
                    ? "rounded-br-2xl rounded-tr-2xl lg:order-2 order-1"
                    : "rounded-bl-2xl rounded-tl-2xl  order-1"
                }`}
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-lg font-light text-gray-500 mb-6">
                  {service.description}
                </p>
                <h4 className="text-xl font-bold text-primary mb-4">
                  {service.weCanOffer}
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {service.offers.map((offer, offerIndex) => (
                    <li
                      className="text-lg font-light text-gray-500"
                      key={offerIndex}
                    >
                      {offer}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="primary"
                    rounded="full"
                    size="sm"
                    href="/contact"
                  >
                    {t.services.button}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <section className="max-w-laptop mx-auto px-6 py-16 space-y-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          {t.services.experience}
        </h2>
        <p className="text-lg font-light text-gray-500 mb-6 text-center">
          {t.services.experienceDescription}
        </p>
        <div className="flex justify-center mt-4 gap-4">
          <Button
            variant="primary"
            rounded="full"
            size="lg"
            href="/pdf/BeeheidiPrsentation.pdf"
          >
            {t.services.experienceButton}
          </Button>
          <Button variant="outline" rounded="full" size="lg" href="/contact">
            {t.services.button}
          </Button>
        </div>
        <p className="text-sm font-light text-red-500 italic mb-6 text-center">
          {t.services.experienceAlert}
        </p>
        <div className="w-full h-full my-12">
          <Image
            src="/images/services/EdelweissZermatt.jpg"
            alt="Beeheidi Presentation"
            width={1920}
            height={1080}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
