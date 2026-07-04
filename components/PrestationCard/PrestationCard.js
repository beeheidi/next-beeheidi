"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity";
import { getPrestationCardPrice } from "@/lib/prestation";
import { getPrestationThumbnail, getPrestationSubtitle } from "@/lib/content";
import { getDurationCategoryLabel } from "@/lib/labels";

export default function PrestationCard({ prestation }) {
  const t = useTranslations();
  const thumbnail = getPrestationThumbnail(prestation);
  const imageUrl = thumbnail
    ? urlFor(thumbnail).width(600).height(400).url()
    : null;

  const getLabel = (key) => {
    try {
      return t.raw(key);
    } catch {
      return key;
    }
  };

  const currentSlug = prestation.slug || prestation.slugFr || prestation.slugEn;
  const displayPrice = getPrestationCardPrice(prestation);
  const durationLabel = prestation.durationCategory
    ? getDurationCategoryLabel(prestation.durationCategory, getLabel)
    : null;

  return (
    <Link
      href={`/explore/${currentSlug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={thumbnail?.alt || prestation.title || ""}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-light">Pas d&apos;image</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-anthracite mb-2">
          {prestation.title || prestation.titleFr || prestation.titleEn}
        </h3>
        <p className="text-anthracite font-regular mb-4 line-clamp-2">
          {getPrestationSubtitle(prestation)}
        </p>

        {(displayPrice || durationLabel) && (
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
            {durationLabel ? (
              <span className="text-sm text-gray-500 font-light">
                {durationLabel}
              </span>
            ) : (
              <span />
            )}
            {displayPrice && (
              <span className="text-xl text-anthracite ml-auto text-right font-light">
                Dès <span className="font-medium">{displayPrice}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
