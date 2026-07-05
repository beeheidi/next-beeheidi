import { getRegionLabel } from "@/lib/labels";
import { hasCmsContent } from "@/lib/content";
import CmsContent from "@/components/ui/CmsContent/CmsContent";
import GalleryMasonry from "@/components/ui/GalleryMasonry/GalleryMasonry";

export default function PrestationContent({ prestation, t, getLabel, galleryImages }) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {hasCmsContent(prestation.description) && (
        <section>
          <CmsContent value={prestation.description} />
        </section>
      )}

      {(hasCmsContent(prestation.technicalDetails) || prestation.region) && (
        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">
            {t.prestation.technicalDetails}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            {hasCmsContent(prestation.technicalDetails) && (
              <CmsContent value={prestation.technicalDetails} />
            )}
            {prestation.region && (
              <p className="mt-4 font-light text-gray-700">
                <span className="font-medium text-primary">
                  {t.prestation.region || "Région"} :{" "}
                </span>
                {getRegionLabel(prestation.region, getLabel)}
              </p>
            )}
          </div>
        </section>
      )}

      {hasCmsContent(prestation.equipment) && (
        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">
            {t.prestation.equipment}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <CmsContent value={prestation.equipment} />
          </div>
        </section>
      )}

      {hasCmsContent(prestation.practicalInfo) && (
        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">
            {t.prestation.practicalInfo}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <CmsContent value={prestation.practicalInfo} />
          </div>
        </section>
      )}

      {galleryImages.length > 0 && (
        <section>
          <GalleryMasonry images={galleryImages} altBase={prestation.title} />
        </section>
      )}
    </div>
  );
}
