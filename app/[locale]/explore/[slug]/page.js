import { client } from "@/lib/sanity";
import {
  prestationBySlugQuery,
  prestationsSlugsQuery,
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import { getCategoryLabel, getSeasonLabel, getRegionLabel } from "@/lib/labels";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import TopImage from "@/components/ui/TopImage/TopImage";

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  const params = [];

  for (const locale of locales) {
    try {
      const slugs = await client.fetch(prestationsSlugsQuery(locale));
      params.push(...slugs.map(({ slug }) => ({ locale, slug })));
    } catch (error) {
      console.error("Error fetching slugs:", error);
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  if (!slug) {
    return {
      title: "Prestation non trouvée",
    };
  }

  const prestation = await client.fetch(prestationBySlugQuery(locale), {
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
  const { locale, slug } = await params;
  const t = await import(`../../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  if (!slug) {
    notFound();
  }

  const prestation = await client.fetch(prestationBySlugQuery(locale), {
    slug: slug,
  });

  if (!prestation) {
    notFound();
  }

  const mainImageUrl = prestation.mainImage
    ? urlFor(prestation.mainImage).width(1200).height(800).url()
    : null;

  // Fonction helper pour obtenir les traductions depuis l'objet t
  const getLabel = (key) => {
    const keys = key.split(".");
    let value = t;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value || key;
  };

  const categoryLabel = getCategoryLabel(prestation.category, getLabel);
  const seasons = prestation.season
    ? prestation.season.map((s) => getSeasonLabel(s, getLabel))
    : [];

  // Slugs localisés pour le changement de langue
  const localizedSlugs = {
    fr: prestation.slugFr || prestation.slug,
    en: prestation.slugEn || prestation.slug,
  };

  return (
    <>
      {/* Script pour exposer les slugs localisés au composant Culture */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__LOCALIZED_SLUGS__ = ${JSON.stringify(localizedSlugs)};`,
        }}
      />
      <main className=" bg-background pt-24 pb-16 relative">
        <TopImage position="top-left" size="large" />
        <div className="max-w-laptop mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-black">
              <Link href="/" className="hover:text-primary transition-colors">
                {t.common.home}
              </Link>
              <span>/</span>
              <Link
                href="/explore"
                className="hover:text-primary transition-colors"
              >
                {t.common.explore}
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
                <div className="prose prose-lg text-black max-w-none mb-8 [&_p]:whitespace-pre-line [&_p]:mb-4">
                  <PortableText
                    value={prestation.description}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-4 whitespace-pre-line leading-relaxed">
                            {children}
                          </p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold text-primary mb-6 mt-8">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-bold text-primary mb-5 mt-7">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl font-bold text-primary mb-4 mt-6">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-xl font-bold text-primary mb-3 mt-5">
                            {children}
                          </h4>
                        ),
                        h5: ({ children }) => (
                          <h5 className="text-lg font-bold text-primary mb-2 mt-4">
                            {children}
                          </h5>
                        ),
                        h6: ({ children }) => (
                          <h6 className="text-base font-bold text-primary mb-2 mt-4">
                            {children}
                          </h6>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                      },
                    }}
                  />
                </div>
              )}

              {/* Détails techniques */}
              {prestation.technicalDetails && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {t.prestation.technicalDetails}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    {prestation.technicalDetails.duration && (
                      <div>
                        <span className="font-semibold text-primary">
                          {t.prestation.duration} :{" "}
                        </span>
                        <span className="text-gray-700">
                          {prestation.technicalDetails.duration}
                        </span>
                      </div>
                    )}
                    {prestation.technicalDetails.difficultyDescription && (
                      <div>
                        <span className="font-semibold text-primary">
                          {t.prestation.difficulty} :{" "}
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
                          {getRegionLabel(prestation.region, getLabel)}
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
                    {t.prestation.equipment}
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
                      {t.prestation.practicalInfo}
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="prose prose-lg text-black max-w-none [&_p]:whitespace-pre-line [&_p]:mb-4">
                        <PortableText
                          value={prestation.practicalInfo}
                          components={{
                            block: {
                              normal: ({ children }) => (
                                <p className="mb-4 whitespace-pre-line leading-relaxed">
                                  {children}
                                </p>
                              ),
                              h1: ({ children }) => (
                                <h1 className="text-4xl font-bold text-primary mb-6 mt-8">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-3xl font-bold text-primary mb-5 mt-7">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-2xl font-bold text-primary mb-4 mt-6">
                                  {children}
                                </h3>
                              ),
                              h4: ({ children }) => (
                                <h4 className="text-xl font-bold text-primary mb-3 mt-5">
                                  {children}
                                </h4>
                              ),
                              h5: ({ children }) => (
                                <h5 className="text-lg font-bold text-primary mb-2 mt-4">
                                  {children}
                                </h5>
                              ),
                              h6: ({ children }) => (
                                <h6 className="text-base font-bold text-primary mb-2 mt-4">
                                  {children}
                                </h6>
                              ),
                            },
                            marks: {
                              strong: ({ children }) => (
                                <strong className="font-bold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              {/* Galerie */}
              {prestation.gallery && prestation.gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {t.prestation.gallery}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {prestation.gallery.map((image, index) => {
                      const imageUrl = urlFor(image)
                        .width(400)
                        .height(300)
                        .url();
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
                      {t.prestation.prices}
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
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {t.prestation.duration}
                    </h3>
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
                      {t.prestation.availability}
                    </h3>
                    <p className="text-gray-700">
                      {prestation.availabilityPeriod}
                    </p>
                  </div>
                )}

                {/* Inclus */}
                {prestation.included && prestation.included.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {t.prestation.included}
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

                {/* Bouton de réservation */}
                <Button
                  href={`/contact?prestation=${encodeURIComponent(prestation.title)}`}
                  variant="primary"
                  size="md"
                  rounded="full"
                  className="w-full"
                >
                  {t.prestation.contactToBook}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
