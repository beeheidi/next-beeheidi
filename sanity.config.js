import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./schemas";
import { PrestationActiveBadge } from "./sanity/badges/PrestationActiveBadge";

const structure = (S, context) =>
  S.list()
    .title("Contenu")
    .items([
      orderableDocumentListDeskItem({
        type: "prestation",
        title: "Activités",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "prestation"
      ),
    ]);

export default defineConfig({
  name: "default",
  title: "Site Vitrine",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "718gxljj",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
  },
  document: {
    badges: (prev, context) =>
      context.schemaType === "prestation"
        ? [PrestationActiveBadge, ...prev]
        : prev,
  },
  studio: {
    components: {
      navbar: (props) => (
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            backgroundColor: "#13141b",
          }}
        >
          {props.renderDefault(props)}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 8px",
              fontWeight: "bold",
              textDecoration: "none",
              textAlign: "right",
              position: "absolute",
              top: "115px",
              right: "16px",
              zIndex: 1000,
              border: "1px solid white",
              borderRadius: "8px",
            }}
          >
            ← Retour au site
          </a>
        </div>
      ),
    },
  },
});
