export const revalidate = 60;

import { client } from "@/lib/sanity";
import { prestationsQueryByLocale } from "@/lib/sanity.queries";
import PrestationCard from "@/components/PrestationCard/PrestationCard";
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Expériences - Beeheidi",
  description: "Découvrez toutes nos expériences et activités",
};

export default async function ExplorePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const prestations = await client.fetch(prestationsQueryByLocale(locale));

  return (
    <main className="bg-background pt-8 pb-8 md:pt-24 md:pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-laptop mx-auto px-6 relative z-1">
        <PageTitle
          subtitle={t("explore.subtitle")}
          title={t("explore.title")}
          description={t("explore.description")}
          align="left"
          showDivider={false}
          textMaxWidth="7xl"
        />

        {prestations.length === 0 ? (
          <div className="text-right py-16">
            <p className="text-gray-500 text-lg">{t("explore.noPrestations")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((prestation) => (
              <PrestationCard key={prestation._id} prestation={prestation} />
            ))}
          </div>
        )}
      </div>
      <TopImage position="bottom-right" size="small" />
    </main>
  );
}
