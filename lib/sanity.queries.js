// Requêtes GROQ pour récupérer les prestations avec support multilingue

// Fonction helper pour créer une requête avec locale
const createLocalizedQuery = (locale = "fr") => {
  return `*[_type == "prestation" && active == true] | order(publishedAt desc) {
  _id,
    "title": title.${locale},
    "titleFr": title.fr,
    "titleEn": title.en,
    "slug": slug.${locale}.current,
    "slugFr": slug.fr.current,
    "slugEn": slug.en.current,
    "category": category.${locale},
    "categoryFr": category.fr,
    "categoryEn": category.en,
    "shortDescription": shortDescription.${locale},
    "shortDescriptionFr": shortDescription.fr,
    "shortDescriptionEn": shortDescription.en,
  mainImage,
    price[] {
      "groupSize": groupSize.${locale},
      "groupSizeFr": groupSize.fr,
      "groupSizeEn": groupSize.en,
      amount,
      currency
    },
    duration {
      "total": total.${locale},
      "totalFr": total.fr,
      "totalEn": total.en
    },
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
  "categoryFr": category.fr,
  "categoryEn": category.en,
  "shortDescription": shortDescription.${locale},
  "shortDescriptionFr": shortDescription.fr,
  "shortDescriptionEn": shortDescription.en,
  "description": description.${locale},
  "descriptionFr": description.fr,
  "descriptionEn": description.en,
  mainImage,
  gallery,
  price[] {
    "groupSize": groupSize.${locale},
    "groupSizeFr": groupSize.fr,
    "groupSizeEn": groupSize.en,
    amount,
    currency
  },
  duration {
    "total": total.${locale},
    "totalFr": total.fr,
    "totalEn": total.en
  },
  region,
  season,
  "availabilityPeriod": availabilityPeriod.${locale},
  "availabilityPeriodFr": availabilityPeriod.fr,
  "availabilityPeriodEn": availabilityPeriod.en,
  technicalDetails {
    "duration": duration.${locale},
    "durationFr": duration.fr,
    "durationEn": duration.en,
    "difficultyDescription": difficultyDescription.${locale},
    "difficultyDescriptionFr": difficultyDescription.fr,
    "difficultyDescriptionEn": difficultyDescription.en
  },
  "equipment": equipment.${locale},
  "equipmentFr": equipment.fr,
  "equipmentEn": equipment.en,
  "included": included.${locale},
  "includedFr": included.fr,
  "includedEn": included.en,
  "practicalInfo": practicalInfo.${locale},
  "practicalInfoFr": practicalInfo.fr,
  "practicalInfoEn": practicalInfo.en,
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
  "titleFr": title.fr,
  "titleEn": title.en,
  "slug": slug.${locale}.current,
  "slugFr": slug.fr.current,
  "slugEn": slug.en.current,
  "category": category.${locale},
  "categoryFr": category.fr,
  "categoryEn": category.en,
  "shortDescription": shortDescription.${locale},
  "shortDescriptionFr": shortDescription.fr,
  "shortDescriptionEn": shortDescription.en,
  mainImage,
  price[] {
    "groupSize": groupSize.${locale},
    "groupSizeFr": groupSize.fr,
    "groupSizeEn": groupSize.en,
    amount,
    currency
  },
  duration {
    "total": total.${locale},
    "totalFr": total.fr,
    "totalEn": total.en
  },
  region,
  season,
  featured
}`;
