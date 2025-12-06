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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Explore avec Heidi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos prestations exceptionnelles : randonnées, déjeuners en
            altitude, escapades culinaires et bien plus encore.
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
