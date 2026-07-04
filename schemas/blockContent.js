/**
 * Éditeur Sanity par défaut (comme à l'origine sur description).
 * Permet gras, italique, listes, titres, liens, et collage HTML.
 */
export default {
  name: "blockContent",
  title: "Contenu enrichi",
  type: "array",
  of: [{ type: "block" }],
};
