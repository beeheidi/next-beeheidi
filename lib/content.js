export function isPortableText(value) {
  return (
    Array.isArray(value) &&
    value.some((block) => block && typeof block === "object" && block._type === "block")
  );
}

export function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string")
  );
}

export function hasCmsContent(value) {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (isStringArray(value)) return value.length > 0;
  if (isPortableText(value)) return value.length > 0;
  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value).some((v) => hasCmsContent(v));
  }
  return false;
}

export function getPrestationThumbnail(prestation) {
  if (prestation?.thumbnailImage) return prestation.thumbnailImage;
  const fromGallery = prestation?.gallery?.find((image) => image?.useAsThumbnail);
  if (fromGallery) return fromGallery;
  return prestation?.mainImage || null;
}

export function getPrestationBanner(prestation) {
  if (prestation?.bannerImage) return prestation.bannerImage;
  const fromGallery = prestation?.gallery?.find((image) => image?.useAsBanner);
  if (fromGallery) return fromGallery;
  return prestation?.mainImage || prestation?.thumbnailImage || null;
}

export function getPrestationSubtitle(prestation) {
  return (
    prestation?.subtitle ||
    prestation?.shortDescription ||
    null
  );
}
