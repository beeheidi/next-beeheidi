"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { urlFor } from "@/lib/sanity";
import {
  categoryLabels,
  difficultyLabels,
  seasonLabels,
  regionLabels,
} from "@/lib/labels";

export default function PrestationCard({ prestation }) {
  const locale = useLocale();
  const imageUrl = prestation.mainImage
    ? urlFor(prestation.mainImage).width(600).height(400).url()
    : null;

  // Les champs sont déjà localisés depuis la requête Sanity
  const categoryLabel =
    prestation.category || prestation.categoryFr || prestation.categoryEn;
  const difficultyLabel =
    prestation.difficulty || prestation.difficultyFr || prestation.difficultyEn;
  const seasons = prestation.season
    ? prestation.season.map((s) => seasonLabels[s] || s).join(", ")
    : null;

  const minPrice =
    prestation.price && prestation.price.length > 0
      ? Math.min(...prestation.price.map((p) => p.amount))
      : null;
  const currency =
    prestation.price && prestation.price.length > 0
      ? prestation.price[0].currency
      : "CHF";

  // Utiliser le slug localisé (déjà extrait par la requête)
  const currentSlug = prestation.slug || prestation.slugFr || prestation.slugEn;

  return (
    <Link
      href={`/explore/${currentSlug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={
              prestation.mainImage?.alt ||
              prestation.title ||
              prestation.titleFr ||
              prestation.titleEn
            }
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Pas d'image</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 capitalize backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-black">
          {categoryLabel}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-primary transition-colors">
          {prestation.title || prestation.titleFr || prestation.titleEn}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {prestation.shortDescription ||
            prestation.shortDescriptionFr ||
            prestation.shortDescriptionEn}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {difficultyLabel && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {difficultyLabel}
            </span>
          )}
          {seasons && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {seasons}
            </span>
          )}
          {prestation.region && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {regionLabels[prestation.region] || prestation.region}
            </span>
          )}
        </div>
        {minPrice && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">À partir de</span>
            <span className="text-2xl font-bold text-primary">
              {minPrice} {currency}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
