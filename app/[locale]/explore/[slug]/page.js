export const revalidate = 60;
export const dynamicParams = true;

import { client } from "@/lib/sanity";
import {
  prestationBySlugQuery,
  prestationsSlugsQuery,
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import {
  getCategoryLabel,
  getSeasonLabel,
  getDurationCategoryLabel,
} from "@/lib/labels";
import { getPrestationCardPrice } from "@/lib/prestation";
import {
  getPrestationBanner,
  getPrestationSubtitle,
} from "@/lib/content";
import { notFound } from "next/navigation";
import TopImage from "@/components/ui/TopImage/TopImage";
import PrestationBreadcrumb from "@/components/ui/PrestationBreadcrumb/PrestationBreadcrumb";
import PrestationHero from "@/components/ui/PrestationHero/PrestationHero";
import PrestationContent from "@/components/ui/PrestationContent/PrestationContent";
import PrestationSidebar from "@/components/ui/PrestationSidebar/PrestationSidebar";

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

  const galleryImages = (prestation.gallery || []).map((image, index) => ({
    key: image._key || String(index),
    alt: image.alt || null,
    url: urlFor(image).width(600).url(),
    urlLarge: urlFor(image).width(1600).url(),
  }));

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__LOCALIZED_SLUGS__ = ${JSON.stringify(localizedSlugs)};`,
        }}
      />
      <main className="bg-background pt-8 pb-8 md:pt-24 md:pb-16 relative">
        <TopImage position="top-left" size="large" />
        <div className="max-w-laptop mx-auto px-6 relative z-10">
          <PrestationBreadcrumb t={t} title={prestation.title} />

          <PrestationHero
            bannerImageUrl={bannerImageUrl}
            bannerImage={bannerImage}
            title={prestation.title}
            categoryLabel={categoryLabel}
            seasons={seasons}
            subtitle={subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PrestationContent
              prestation={prestation}
              t={t}
              getLabel={getLabel}
              galleryImages={galleryImages}
            />

            <PrestationSidebar
              prestation={prestation}
              t={t}
              cardPrice={cardPrice}
              durationLabel={durationLabel}
            />
          </div>
        </div>
      </main>
    </>
  );
}
