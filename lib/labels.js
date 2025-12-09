// Labels pour les prestations - Centralisation des traductions

export const categoryLabels = {
  randonnee: "Randonnée",
  "dejeuner-altitude": "Déjeuner en altitude",
  "escapade-culinaire": "Escapade culinaire",
  aventure: "Aventure",
  detente: "Détente",
  autre: "Autre",
};

export const difficultyLabels = {
  facile: "Facile",
  moderee: "Modérée",
  difficile: "Difficile",
  "tres-difficile": "Très difficile",
};

export const seasonLabels = {
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
  hiver: "Hiver",
};

export const durationCategoryLabels = {
  "moins-3h": "Moins de 3 heures",
  "demi-journee": "Demi-journée",
  journee: "Journée",
  "plusieurs-jours": "Plusieurs jours",
};

export const regionLabels = {
  chablais: "Chablais",
  "haut-valais": "Haut-Valais",
  martigny: "Martigny",
  "sion-sierre": "Sion & Sierre",
  "crans-montana": "Crans-Montana",
};

// Fonction helper pour obtenir un label avec fallback
export function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

export function getDifficultyLabel(difficulty) {
  return difficultyLabels[difficulty] || difficulty;
}

export function getSeasonLabel(season) {
  return seasonLabels[season] || season;
}

export function getDurationCategoryLabel(category) {
  return durationCategoryLabels[category] || category;
}

export function getRegionLabel(region) {
  return regionLabels[region] || region;
}
