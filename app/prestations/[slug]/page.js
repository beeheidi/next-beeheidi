import { client } from "@/lib/sanity";
import {
  prestationBySlugQuery,
  prestationsSlugsQuery,
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import {
  categoryLabels,
  difficultyLabels,
  seasonLabels,
  durationCategoryLabels,
  regionLabels,
} from "@/lib/labels";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button/Button";

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(prestationsSlugsQuery);
    return slugs.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    return {
      title: "Prestation non trouvée",
    };
  }

  const prestation = await client.fetch(prestationBySlugQuery, {
    slug: slug,
  });

  if (!prestation) {
    return {
      title: "Prestation non trouvée",
    };
  }

  return {
    title: `${prestation.title} - Beeheidi`,
    description: prestation.shortDescription,
  };
}

export default async function PrestationDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
  }

  const prestation = await client.fetch(prestationBySlugQuery, {
    slug: slug,
  });

  if (!prestation) {
    notFound();
  }

  const mainImageUrl = prestation.mainImage
    ? urlFor(prestation.mainImage).width(1200).height(800).url()
    : null;

  const categoryLabel =
    categoryLabels[prestation.category] || prestation.category;
  const difficultyLabel = prestation.difficulty
    ? difficultyLabels[prestation.difficulty]
    : null;
  const seasons = prestation.season
    ? prestation.season.map((s) => seasonLabels[s] || s)
    : [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-laptop mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-black">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              href="/explore"
              className="hover:text-primary transition-colors"
            >
              Explore
            </Link>
            <span>/</span>
            <span className="text-primary">{prestation.title}</span>
          </div>
        </nav>

        {/* Image principale */}
        {mainImageUrl && (
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-8">
            <Image
              src={mainImageUrl}
              alt={prestation.mainImage?.alt || prestation.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full font-semibold">
              {categoryLabel}
            </span>
            {difficultyLabel && (
              <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
                {difficultyLabel}
              </span>
            )}
            {seasons.map((season, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full"
              >
                {season}
              </span>
            ))}
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            {prestation.title}
          </h1>
          <p className="text-xl text-black mb-6">
            {prestation.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Description */}
            {prestation.description && (
              <div className="prose prose-lg text-black max-w-none mb-8">
                <PortableText value={prestation.description} />
              </div>
            )}

            {/* Points forts */}
            {prestation.highlights && prestation.highlights.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Points forts
                </h2>
                <ul className="space-y-2">
                  {prestation.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Détails techniques */}
            {prestation.technicalDetails && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Détails techniques
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {prestation.technicalDetails.duration && (
                    <div>
                      <span className="font-semibold text-primary">
                        Durée :{" "}
                      </span>
                      <span className="text-gray-700">
                        {prestation.technicalDetails.duration}
                      </span>
                    </div>
                  )}
                  {prestation.technicalDetails.difficultyDescription && (
                    <div>
                      <span className="font-semibold text-primary">
                        Difficulté :{" "}
                      </span>
                      <span className="text-gray-700">
                        {prestation.technicalDetails.difficultyDescription}
                      </span>
                    </div>
                  )}
                  {prestation.region && (
                    <div>
                      <span className="font-semibold text-primary">
                        Région :{" "}
                      </span>
                      <span className="text-gray-700">
                        {regionLabels[prestation.region] || prestation.region}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Matériel à prévoir */}
            {prestation.equipment && prestation.equipment.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Matériel à prévoir
                </h2>
                <ul className="space-y-2 bg-gray-50 rounded-lg p-6">
                  {prestation.equipment.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Informations complémentaires */}
            {prestation.practicalInfo &&
              prestation.practicalInfo.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Informations complémentaires
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    {prestation.practicalInfo.map((info, index) => (
                      <div key={index}>
                        {info.label && (
                          <span className="font-semibold text-primary">
                            {info.label} :{" "}
                          </span>
                        )}
                        <span className="text-gray-700">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Galerie */}
            {prestation.gallery && prestation.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Galerie
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {prestation.gallery.map((image, index) => {
                    const imageUrl = urlFor(image).width(400).height(300).url();
                    return (
                      <div
                        key={index}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={imageUrl}
                          alt={
                            image.alt ||
                            `${prestation.title} - Image ${index + 1}`
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Prix */}
              {prestation.price && prestation.price.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Tarifs
                  </h3>
                  <div className="space-y-3">
                    {prestation.price.map((priceItem, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
                      >
                        <span className="text-black">
                          {priceItem.groupSize}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {priceItem.amount} {priceItem.currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Durée */}
              {prestation.duration && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2">Durée</h3>
                  {prestation.duration.category && (
                    <p className="text-gray-700 mb-1">
                      {durationCategoryLabels[prestation.duration.category] ||
                        prestation.duration.category}
                    </p>
                  )}
                  {prestation.duration.total && (
                    <p className="text-gray-600 text-sm">
                      {prestation.duration.total}
                    </p>
                  )}
                </div>
              )}

              {/* Période de disponibilité */}
              {prestation.availabilityPeriod && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Disponibilité
                  </h3>
                  <p className="text-gray-700">
                    {prestation.availabilityPeriod}
                  </p>
                </div>
              )}

              {/* Inclus */}
              {prestation.included && prestation.included.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Prestations incluses
                  </h3>
                  <ul className="space-y-2">
                    {prestation.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Non inclus */}
              {prestation.notIncluded && prestation.notIncluded.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Non inclus
                  </h3>
                  <ul className="space-y-2">
                    {prestation.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400 font-bold">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bouton de réservation */}
              <Button variant="primary" size="lg" className="w-full">
                Réserver maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
