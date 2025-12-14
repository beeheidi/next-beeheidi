import Hero from "@/components/Hero/Hero";
import PrestationCard from "@/components/PrestationCard/PrestationCard";
import Services from "@/components/Services/Services";
import Button from "@/components/ui/Button/Button";
import ImageTextBlock from "@/components/ui/ImageTextBlock/ImageTextBlock";
import { client } from "@/lib/sanity";
import { featuredPrestationsQuery } from "@/lib/sanity.queries";

export default async function Home() {
  const prestations = await client.fetch(featuredPrestationsQuery);

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {prestations && prestations.length > 0 && (
        <section className="max-w-laptop mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center text-primary mb-8">
            Nos prestations coup de coeur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((prestation) => (
              <PrestationCard key={prestation._id} prestation={prestation} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" rounded="full" size="lg" href="/explore">
              Explorez nos prestations
            </Button>
          </div>
        </section>
      )}

      <section className="max-w-laptop mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Découvrez nos services
        </h2>
        <ImageTextBlock
          imageSrc="/images/accueil/services/2020RandonneTrailRunningValaisBissBeeheidi8.jpg"
          imageAlt="Randonnée"
          title="Vous êtes une entreprise "
          description={`Osez marquer positivement les esprits en offrant à vos clients un cadeau unique qui sorte de l'ordinaire. Créez des liens profonds et renforcez la cohésion de votre équipe grâce à nos prestations de groupe.`}
          buttonText="Contactez-nous"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={true}
          blockClass="block-1"
          showBottomMargin={true}
        />
        <ImageTextBlock
          imageSrc="/images/accueil/services/2020BeeheidiCrans-Montana079.jpg"
          imageAlt="Randonnée"
          title="Vous êtes un office de tourisme "
          description={`Offrez à vos hôtes l’opportunité de découvrir votre région de manière privilégiée et authentique en compagnie d'acteurs locaux enthousiastes. Qu’ils aiment les défis physiques ou les surprises gustatives, nos offres s’adaptent à tous les types de visiteurs.`}
          buttonText="Contactez-nous"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={false}
          blockClass="block-2"
          showBottomMargin={true}
        />
        <ImageTextBlock
          imageSrc="/images/accueil/services/PlantesFleursTisanesHerbier21b.jpg"
          imageAlt="Randonnée"
          title="Vous êtes une commune "
          description={`Entourez-vous de notre équipe pour développer les activités de votre commune et (faire) découvrir votre région différemment.`}
          buttonText="Contactez-nous"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={true}
          blockClass="block-1"
          showBottomMargin={true}
        />

        <ImageTextBlock
          imageSrc="/images/accueil/services/2020BeeheidiChampry06.jpg"
          imageAlt="Randonnée"
          title="Vous êtes un hébergement"
          description={`Ajoutez une plus-value personnalisée au séjour de vos hôtes. Nous les prenons en charge directement chez vous et en toute sécurité pour leur faire vivre des activités riches et variées.`}
          buttonText="Contactez-nous"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={false}
          blockClass="block-2"
          showBottomMargin={true}
        />
        <ImageTextBlock
          imageSrc="/images/accueil/services/BeeheidiEnjoySwitzerland2.jpg"
          imageAlt="Randonnée"
          title="Vous êtes une société de conciergerie  "
          description={`Entourez-vous d'un partenaire sérieux pour offrir à vos clients une vraie plus-value à leur séjour en Suisse. `}
          buttonText="Contactez-nous"
          buttonHref="/contact"
          buttonVariant="primary"
          imageLeft={true}
          blockClass="block-1"
          showBottomMargin={true}
        />
      </section>
    </main>
  );
}
