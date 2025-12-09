import { client } from "@/lib/sanity";
import { prestationsQuery } from "@/lib/sanity.queries";
import PrestationCard from "@/components/PrestationCard/PrestationCard";

export const metadata = {
  title: "Explore - Beeheidi",
  description: "Découvrez toutes nos prestations et activités",
};

export default async function ExplorePage() {
  const prestations = await client.fetch(prestationsQuery);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-laptop mx-auto px-6">
        <div className=" mb-12 p-12 bg-foreground rounded-lg">
          <h1 className="text-5xl font-bold text-primary mb-4 text-center">
            Explore avec Heidi
          </h1>
          <p className="text-xl text-gray-600 ">
            Un lever de soleil ou une balade gourmande dans les alpages,
            découvrez l’authenticité valaisanne. Profitez de la douce altitude
            et de l’odeur des sapins pour vivre une expérience enrichissante au
            cœur d’un environnement préservé. Ici, pas d’artifice, nous vous
            faisons goûter aux traditions du fabuleux parc alpin. Faites la
            connaissance de passionnés qui ont su conserver l’art de la
            simplicité et de l’authenticité. Activités de randonnée, balades
            gourmandes, découverte de la montagne, de la faune, de la flore et
            loisirs en pleine nature pour dessiner ensemble vos plus beaux
            souvenirs du Valais. Région
          </p>
        </div>

        {prestations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Aucune prestation disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((prestation) => (
              <PrestationCard key={prestation._id} prestation={prestation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
