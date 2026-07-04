import { client } from "@/lib/sanity";
import {
  prestationBySlugQuery,
  prestationsSlugsQuery,
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import {
  getCategoryLabel,
  getSeasonLabel,
  getRegionLabel,
  getDurationCategoryLabel,
} from "@/lib/labels";
import { getPrestationCardPrice, hasPrestationPriceGrid } from "@/lib/prestation";
import {
  getPrestationBanner,
  getPrestationSubtitle,
  hasCmsContent,
} from "@/lib/content";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import TopImage from "@/components/ui/TopImage/TopImage";
import CmsContent from "@/components/ui/CmsContent/CmsContent";

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
    return { title: "Prestation non trouvée" };
  }

  const prestation = await client.fetch(prestationBySlugQuery(locale), {
    slug,
  });

  if (!prestation) {
    return { title: "Prestation non trouvée" };
  }

  return {
    title: `${prestation.title} - Beeheidi`,
    description: getPrestationSubtitle(prestation) || undefined,
  };
}

export default async function PrestationDetailPage({ params }) {
  const { locale, slug } = await params;
  const t = await import(`../../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  if (!slug) notFound();

  const prestation = await client.fetch(prestationBySlugQuery(locale), {
    slug,
  });

  if (!prestation) notFound();

  const bannerImage = getPrestationBanner(prestation);
  const bannerImageUrl = bannerImage
    ? urlFor(bannerImage).width(1200).height(800).url()
    : null;

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
  const durationLabel = prestation.durationCategory
    ? getDurationCategoryLabel(prestation.durationCategory, getLabel)
    : null;
  const cardPrice = getPrestationCardPrice(prestation);
  const subtitle = getPrestationSubtitle(prestation);

  const localizedSlugs = {
    fr: prestation.slugFr || prestation.slug,
    en: prestation.slugEn || prestation.slug,
  };

  const galleryImages = prestation.gallery || [];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__LOCALIZED_SLUGS__ = ${JSON.stringify(localizedSlugs)};`,
        }}
      />
      <main className="bg-background pt-24 pb-16 relative">
        <TopImage position="top-left" size="large" />
        <div className="max-w-laptop mx-auto px-6 relative z-10">
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

          {bannerImageUrl && (
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-8">
              <Image
                src={bannerImageUrl}
                alt={bannerImage?.alt || prestation.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryLabel && (
                <span className="px-4 py-2 bg-primary text-white rounded-full font-medium">
                  {categoryLabel}
                </span>
              )}
              {seasons.map((season, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-light"
                >
                  {season}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-light text-primary mb-4">
              {prestation.title}
            </h1>
            {subtitle && (
              <p className="text-xl font-light text-black mb-6">{subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {hasCmsContent(prestation.description) && (
                <section>
                  <CmsContent value={prestation.description} />
                </section>
              )}

              {(hasCmsContent(prestation.technicalDetails) || prestation.region) && (
                <section>
                  <h2 className="text-2xl font-medium text-primary mb-4">
                    {t.prestation.technicalDetails}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    {hasCmsContent(prestation.technicalDetails) && (
                      <CmsContent value={prestation.technicalDetails} />
                    )}
                    {prestation.region && (
                      <p className="mt-4 font-light text-gray-700">
                        <span className="font-medium text-primary">
                          {t.prestation.region || "Région"} :{" "}
                        </span>
                        {getRegionLabel(prestation.region, getLabel)}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {hasCmsContent(prestation.equipment) && (
                <section>
                  <h2 className="text-2xl font-medium text-primary mb-4">
                    {t.prestation.equipment}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <CmsContent value={prestation.equipment} />
                  </div>
                </section>
              )}

              {hasCmsContent(prestation.practicalInfo) && (
                <section>
                  <h2 className="text-2xl font-medium text-primary mb-4">
                    {t.prestation.practicalInfo}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <CmsContent value={prestation.practicalInfo} />
                  </div>
                </section>
              )}

              {galleryImages.length > 0 && (
                <section>
                  <h2 className="text-2xl font-medium text-primary mb-4">
                    {t.prestation.gallery}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => {
                      const imageUrl = urlFor(image)
                        .width(400)
                        .height(300)
                        .url();
                      return (
                        <div
                          key={image._key || index}
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
                </section>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
                {(cardPrice || hasPrestationPriceGrid(prestation)) && (
                  <div>
                    <h3 className="text-xl font-medium text-primary mb-4">
                      {t.prestation.prices}
                    </h3>
                    {cardPrice && (
                      <p className="text-2xl font-light text-primary mb-4">
                        Dès{" "}
                        <span className="font-medium">{cardPrice}</span>
                      </p>
                    )}
                    {hasCmsContent(prestation.priceGrid) ? (
                      <CmsContent value={prestation.priceGrid} />
                    ) : (
                      prestation.price?.length > 0 && (
                        <div className="space-y-3">
                          {prestation.price.map((priceItem, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
                            >
                              <span className="font-light text-black">
                                {priceItem.groupSize}
                              </span>
                              <span className="text-2xl font-medium text-primary">
                                {priceItem.amount} {priceItem.currency}
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}

                {(durationLabel || prestation.duration) && (
                  <div>
                    <h3 className="text-xl font-medium text-primary mb-2">
                      {t.prestation.duration}
                    </h3>
                    {durationLabel && (
                      <p className="font-light text-gray-700">{durationLabel}</p>
                    )}
                    {prestation.duration && (
                      <p className="font-light text-gray-600 text-sm mt-1">
                        {prestation.duration}
                      </p>
                    )}
                  </div>
                )}

                {prestation.availabilityPeriod && (
                  <div>
                    <h3 className="text-xl font-medium text-primary mb-2">
                      {t.prestation.availability}
                    </h3>
                    <p className="font-light text-gray-700">
                      {prestation.availabilityPeriod}
                    </p>
                  </div>
                )}

                {hasCmsContent(prestation.included) && (
                  <div>
                    <h3 className="text-xl font-medium text-primary mb-3">
                      {t.prestation.included}
                    </h3>
                    <CmsContent value={prestation.included} />
                  </div>
                )}

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
