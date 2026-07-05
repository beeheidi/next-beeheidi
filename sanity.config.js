import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const structure = (S) =>
  S.list()
    .title("Contenu")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "prestation"
      ),
      S.listItem()
        .title("Activités")
        .child(
          S.documentTypeList("prestation")
            .title("Activités")
            .defaultOrdering([{ field: "activityDate", direction: "desc" }])
        ),
    ]);

export default defineConfig({
  name: "default",
  title: "Site Vitrine",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nw16vt02",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
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
