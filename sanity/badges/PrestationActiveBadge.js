/**
 * Badge Studio : visible sur le site (active) vs masquée.
 * Distinct de la pastille verte Sanity "Published" (document publié dans le CMS).
 */
export function PrestationActiveBadge(props) {
  if (props.type !== "prestation") return null;

  const doc = props.draft || props.published;
  if (!doc) return null;

  const isActive = doc.active !== false;

  return isActive
    ? {
        label: "Sur le site",
        title: "Cette activité est visible sur le site",
        color: "success",
      }
    : {
        label: "Masquée",
        title: "Cette activité est masquée sur le site (toggle désactivé)",
        color: "danger",
      };
}
