// Labels pour les prestations - Fonctions helper pour utiliser les traductions next-intl

/**
 * Obtient le label traduit d'une catégorie
 * @param {string} category - La clé de la catégorie (ex: "randonnee")
 * @param {object} t - L'objet de traduction depuis next-intl
 * @returns {string} Le label traduit ou la clé si non trouvé
 */
export function getCategoryLabel(category, t) {
  if (!category || !t) return category;
  return t(`labels.category.${category}`) || category;
}

/**
 * Obtient le label traduit d'une difficulté
 * @param {string} difficulty - La clé de la difficulté (ex: "facile")
 * @param {object} t - L'objet de traduction depuis next-intl
 * @returns {string} Le label traduit ou la clé si non trouvé
 */
export function getDifficultyLabel(difficulty, t) {
  if (!difficulty || !t) return difficulty;
  return t(`labels.difficulty.${difficulty}`) || difficulty;
}

/**
 * Obtient le label traduit d'une saison
 * @param {string} season - La clé de la saison (ex: "ete")
 * @param {object} t - L'objet de traduction depuis next-intl
 * @returns {string} Le label traduit ou la clé si non trouvé
 */
export function getSeasonLabel(season, t) {
  if (!season || !t) return season;
  return t(`labels.season.${season}`) || season;
}

/**
 * Obtient le label traduit d'une catégorie de durée
 * @param {string} category - La clé de la catégorie (ex: "demi-journee")
 * @param {object} t - L'objet de traduction depuis next-intl
 * @returns {string} Le label traduit ou la clé si non trouvé
 */
export function getDurationCategoryLabel(category, t) {
  if (!category || !t) return category;
  return t(`labels.durationCategory.${category}`) || category;
}

/**
 * Obtient le label traduit d'une région
 * @param {string} region - La clé de la région (ex: "chablais")
 * @param {object} t - L'objet de traduction depuis next-intl
 * @returns {string} Le label traduit ou la clé si non trouvé
 */
export function getRegionLabel(region, t) {
  if (!region || !t) return region;
  return t(`labels.region.${region}`) || region;
}
