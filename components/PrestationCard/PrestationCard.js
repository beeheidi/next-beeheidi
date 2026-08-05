"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
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
      className="group block bg-white rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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
        <h3 className="text-2xl min-h-[64px] font-semibold text-anthracite mb-2">
          {prestation.title || prestation.titleFr || prestation.titleEn}
        </h3>
        <p className="text-anthracite font-regular mb-4 line-clamp-2">
          {getPrestationSubtitle(prestation)}
        </p>

        {(displayPrice || durationLabel) && (
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
            {displayPrice && (
              <span className="text-lg text-anthracite font-light">
                {t("labels.price")}{" "}
                <span className="font-medium">{displayPrice}</span>
              </span>
            )}
            {durationLabel ? (
              <span className="text-sm text-gray-500 font-light">
                {durationLabel}
              </span>
            ) : (
              <span />
            )}
            <button className="ml-auto flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white transition-all duration-300 group-hover:rotate-90 cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
