// Requêtes GROQ pour récupérer les prestations

export const prestationsQuery = `*[_type == "prestation" && active == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  mainImage,
  price,
  duration,
  difficulty,
  region,
  season,
  featured
}`;

export const prestationBySlugQuery = `*[_type == "prestation" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  shortDescription,
  description,
  mainImage,
  gallery,
  price,
  duration,
  difficulty,
  region,
  season,
  availabilityPeriod,
  technicalDetails,
  equipment,
  included,
  notIncluded,
  practicalInfo,
  highlights,
  publishedAt,
  featured
}`;

export const prestationsSlugsQuery = `*[_type == "prestation" && defined(slug.current)] {
  "slug": slug.current
}`;

export const featuredPrestationsQuery = `*[_type == "prestation" && active == true && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  mainImage,
  price,
  duration,
  difficulty,
  region,
  season,
  featured
}`;
