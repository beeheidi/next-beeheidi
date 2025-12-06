import Hero from "@/components/Hero/Hero";
import PrestationCard from "@/components/PrestationCard/PrestationCard";
import { client } from "@/lib/sanity";
import { featuredPrestationsQuery } from "@/lib/sanity.queries";

export default async function Home() {
  const prestations = await client.fetch(featuredPrestationsQuery);

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {prestations && prestations.length > 0 && (
        <section className="max-w-laptop mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Nos prestations coup de coeur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((prestation) => (
              <PrestationCard key={prestation._id} prestation={prestation} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
