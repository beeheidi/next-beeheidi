import Button from "@/components/ui/Button/Button";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Services partenaires - Beeheidi",
  description: "Nos services adaptés à chacune de vos attentes",
};

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const services = [
    {
      id: "business",
      title: t("services.business.title"),
      description: t("services.business.description"),
      weCanOffer: t("services.business.weCanOffer"),
      offers: t.raw("services.business.offers"),
      image: "/images/services/2020RandonneTrailRunningValaisBissBeeheidi8.jpg",
      alt: "Business",
    },
    {
      id: "tourism",
      title: t("services.tourism.title"),
      description: t("services.tourism.description"),
      weCanOffer: t("services.tourism.weCanOffer"),
      offers: t.raw("services.tourism.offers"),
      image: "/images/services/2020BeeheidiCrans-Montana079.jpg",
      alt: "Office du tourisme",
    },
    {
      id: "municipality",
      title: t("services.municipality.title"),
      description: t("services.municipality.description"),
      weCanOffer: t("services.municipality.weCanOffer"),
      offers: t.raw("services.municipality.offers"),
      image: "/images/services/PlantesFleursTisanesHerbier21b.jpg",
      alt: "Commune",
    },
    {
      id: "accommodation",
      title: t("services.accommodation.title"),
      description: t("services.accommodation.description"),
      weCanOffer: t("services.accommodation.weCanOffer"),
      offers: t.raw("services.accommodation.offers"),
      image: "/images/services/2020BeeheidiChampry06.jpg",
      alt: "Hébergement",
    },
    {
      id: "concierge",
      title: t("services.concierge.title"),
      description: t("services.concierge.description"),
      weCanOffer: t("services.concierge.weCanOffer"),
      offers: t.raw("services.concierge.offers"),
      image: "/images/services/BeeheidiEnjoySwitzerland2.jpg",
      alt: "Conciergerie",
    },
    {
      id: "sportStore",
      title: t("services.sportStore.title"),
      description: t("services.sportStore.description"),
      weCanOffer: t("services.sportStore.weCanOffer"),
      offers: t.raw("services.sportStore.offers"),
      image: "/images/services/BeeheidiEnjoySwitzerland90.jpg",
      alt: "Magasin de sport",
    },
  ];

  return (
    <main className="bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />

      <section className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle
          subtitle={t("services.subtitle")}
          title={t("services.title")}
          description={t("services.description")}
          align="left"
          textMaxWidth="full"
        />
      </section>

      {/* Navigation services */}
      <section className="max-w-laptop mx-auto px-6 mb-16">
        <p className="text-center text-gray-500 font-light mb-8">
          {t("services.youAre")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`#${service.id}`}
              className="group flex items-center justify-between gap-2 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm font-light text-anthracite leading-tight">
                {service.title}
              </span>
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300 group-hover:rotate-90" />
            </Link>
          ))}
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="max-w-laptop bg-white border border-gray-100 rounded-2xl shadow-card mx-auto px-12 py-12 my-16">
        <h2 className="text-2xl font-light text-anthracite mb-6">
          {t("services.whyUs")}
        </h2>
        <ul className="space-y-3">
          {t.raw("services.whyUsList").map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-500 font-light">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Vignettes services — texte gauche + image droite */}
      <section className="max-w-laptop mx-auto px-6 py-8 space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Texte — gauche */}
            <div className="w-full lg:w-1/2 bg-white px-10 py-10 flex flex-col justify-center">
              <h3 className="text-2xl font-light text-anthracite mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-sm font-semibold text-primary mb-3">
                {service.weCanOffer}
              </p>
              <ul className="space-y-2 mb-8">
                {service.offers.map((offer, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-500 font-light text-sm">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {offer}
                  </li>
                ))}
              </ul>
              <div>
                <Button variant="outline" rounded="full" size="sm" href="/contact">
                  {t("services.button")}
                </Button>
              </div>
            </div>

            {/* Image — droite */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-0">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* CTA final */}
      <section>

        <div className="w-full h-full mt-12">
          <Image
            src="/images/services/BeeheidiEnjoySwitzerland2.jpg"
            alt="Beeheidi"
            width={1920}
            height={1080}
            className="w-full h-[500px] object-cover object-center"
          />
        </div>
      </section>
    </main>
  );
}
