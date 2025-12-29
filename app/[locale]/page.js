import Hero from "@/components/Hero/Hero";
import PrestationCard from "@/components/PrestationCard/PrestationCard";
import SliderCardsServices from "@/components/SliderCardsServices/SliderCardsServices";
import Button from "@/components/ui/Button/Button";
import ImageTextBlock from "@/components/ui/ImageTextBlock/ImageTextBlock";
import TopImage from "@/components/ui/TopImage/TopImage";
import { client } from "@/lib/sanity";
import { featuredPrestationsQuery } from "@/lib/sanity.queries";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Home({ params }) {
  const { locale } = await params;
  const prestations = await client.fetch(featuredPrestationsQuery(locale));
  const t = await getTranslations({ locale });

  const services = [
    {
      image: "/images/services/2020RandonneTrailRunningValaisBissBeeheidi8.jpg",
      alt: "Randonnée",
      title: t("home.services.business.title"),
      description: t("home.services.business.description"),
    },
    {
      image: "/images/services/2020BeeheidiCrans-Montana079.jpg",
      alt: "Randonnée",
      title: t("home.services.tourism.title"),
      description: t("home.services.tourism.description"),
    },
    {
      image: "/images/services/PlantesFleursTisanesHerbier21b.jpg",
      alt: "Randonnée",
      title: t("home.services.municipality.title"),
      description: t("home.services.municipality.description"),
    },
    {
      image: "/images/services/2020BeeheidiChampry06.jpg",
      alt: "Randonnée",
      title: t("home.services.accommodation.title"),
      description: t("home.services.accommodation.description"),
    },
    {
      image: "/images/services/BeeheidiEnjoySwitzerland2.jpg",
      alt: "Randonnée",
      title: t("home.services.concierge.title"),
      description: t("home.services.concierge.description"),
    },
    {
      image: "/images/services/BeeheidiEnjoySwitzerland90.jpg",
      alt: "Randonnée",
      title: t("home.services.sportStore.title"),
      description: t("home.services.sportStore.description"),
    },
  ];

  return (
    <main className=" bg-white">
      <Hero
        key={locale}
        title={t("hero.title")}
        whoAreWe={t("hero.whoAreWe")}
      />

      {prestations && prestations.length > 0 && (
        <section className="relative">
          <TopImage />
          <div className="max-w-laptop mx-auto px-6 py-16 relative z-1">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              {t("home.featuredPrestations")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prestations.map((prestation) => (
                <PrestationCard key={prestation._id} prestation={prestation} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                rounded="full"
                size="lg"
                href="/explore"
              >
                {t("home.explorePrestations")}
              </Button>
            </div>
          </div>
        </section>
      )}
      <section className="bg-foreground py-16 relative">
        <div className="max-w-laptop mx-auto px-6 ">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            {t("home.discoverServices")}
          </h2>

          <SliderCardsServices services={services} />

          <div className="flex justify-center mt-8">
            <Button variant="outline" rounded="full" size="lg" href="/services">
              {t("home.learn more")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
