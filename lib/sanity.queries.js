const cardImageFields = `
  thumbnailImage,
  bannerImage,
  mainImage,
  gallery[] {
    ...,
    useAsThumbnail,
    useAsBanner
  }
`;

const hybridField = (field, locale) =>
  `coalesce(${field}.${locale}Html, ${field}.${locale})`;

const priceFields = (locale) => `
  "priceAmount": priceText.amount,
  "priceCurrency": coalesce(priceText.currency, "CHF"),
  "priceGrid": ${hybridField("priceText", locale)},
  price[] {
    amount,
    currency,
    "groupSize": groupSize.${locale}
  }
`;

const detailContentFields = (locale) => `
  "subtitle": coalesce(subtitle.${locale}, shortDescription.${locale}),
  "shortDescription": coalesce(shortDescription.${locale}, subtitle.${locale}),
  "description": ${hybridField("description", locale)},
  "technicalDetails": coalesce(
    ${hybridField("technicalDetailsContent", locale)},
    select(
      defined(technicalDetails.duration.${locale}) =>
        coalesce(technicalDetails.duration.${locale}, "") +
        select(
          defined(technicalDetails.difficultyDescription.${locale}) =>
            "\\n" + technicalDetails.difficultyDescription.${locale},
          ""
        ),
      technicalDetails.difficultyDescription.${locale}
    )
  ),
  "equipment": ${hybridField("equipment", locale)},
  "included": ${hybridField("included", locale)},
  "practicalInfo": ${hybridField("practicalInfo", locale)},
  "availabilityPeriod": availabilityPeriod.${locale},
  durationCategory,
  ${cardImageFields},
  ${priceFields(locale)},
  "duration": duration.total.${locale}
`;

const createLocalizedQuery = (locale = "fr") => {
  return `*[_type == "prestation" && active == true] | order(publishedAt desc) {
  _id,
  "title": title.${locale},
  "slug": slug.${locale}.current,
  "slugFr": slug.fr.current,
  "slugEn": slug.en.current,
  "category": category.${locale},
  "subtitle": coalesce(subtitle.${locale}, shortDescription.${locale}),
  "shortDescription": coalesce(shortDescription.${locale}, subtitle.${locale}),
  ${cardImageFields},
  ${priceFields(locale)},
  durationCategory,
  activityReference,
  region,
  season,
  featured
}`;
};

export const prestationsQuery = createLocalizedQuery("fr");

export const prestationsQueryByLocale = (locale) =>
  createLocalizedQuery(locale);

export const prestationBySlugQuery = (
  locale = "fr"
) => `*[_type == "prestation" && slug.${locale}.current == $slug][0] {
  _id,
  "title": title.${locale},
  "titleFr": title.fr,
  "titleEn": title.en,
  "slug": slug.${locale}.current,
  "slugFr": slug.fr.current,
  "slugEn": slug.en.current,
  "category": category.${locale},
  ${detailContentFields(locale)},
  activityReference,
  region,
  season,
  publishedAt,
  featured
}`;

export const prestationsSlugsQuery = (
  locale = "fr"
) => `*[_type == "prestation" && defined(slug.${locale}.current)] {
  "slug": slug.${locale}.current
}`;

export const featuredPrestationsQuery = (
  locale = "fr"
) => `*[_type == "prestation" && active == true && featured == true] | order(publishedAt desc) {
  _id,
  "title": title.${locale},
  "slug": slug.${locale}.current,
  "slugFr": slug.fr.current,
  "slugEn": slug.en.current,
  "category": category.${locale},
  "subtitle": coalesce(subtitle.${locale}, shortDescription.${locale}),
  "shortDescription": coalesce(shortDescription.${locale}, subtitle.${locale}),
  ${cardImageFields},
  ${priceFields(locale)},
  durationCategory,
  region,
  season,
  featured
}`;
