import { hasCmsContent } from "@/lib/content";
import { hasPrestationPriceGrid } from "@/lib/prestation";
import CmsContent from "@/components/ui/CmsContent/CmsContent";
import Button from "@/components/ui/Button/Button";

export default function PrestationSidebar({ prestation, t, cardPrice, durationLabel }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
        {(cardPrice || hasPrestationPriceGrid(prestation)) && (
          <div>
            <h3 className="text-xl font-medium text-primary mb-4">
              {t.prestation.prices}
            </h3>
            {hasCmsContent(prestation.priceGrid) ? (
              <CmsContent value={prestation.priceGrid} />
            ) : (
              prestation.price?.length > 0 && (
                <div className="space-y-3">
                  {prestation.price.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-light text-black">
                        {priceItem.groupSize}
                      </span>
                      <span className="text-2xl font-medium text-primary">
                        {priceItem.amount} {priceItem.currency}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {(durationLabel || prestation.duration) && (
          <div>
            <h3 className="text-xl font-medium text-primary mb-2">
              {t.prestation.duration}
            </h3>
            {durationLabel && (
              <p className="font-light text-gray-700">{durationLabel}</p>
            )}
            {prestation.duration && (
              <p className="font-light text-gray-600 text-sm mt-1">
                {prestation.duration}
              </p>
            )}
          </div>
        )}

        {prestation.availabilityPeriod && (
          <div>
            <h3 className="text-xl font-medium text-primary mb-2">
              {t.prestation.availability}
            </h3>
            <p className="font-light text-gray-700">
              {prestation.availabilityPeriod}
            </p>
          </div>
        )}

        {hasCmsContent(prestation.included) && (
          <div>
            <h3 className="text-xl font-medium text-primary mb-3">
              {t.prestation.included}
            </h3>
            <CmsContent value={prestation.included} />
          </div>
        )}

        <Button
          href={`/contact?prestation=${encodeURIComponent(prestation.title)}`}
          variant="primary"
          size="md"
          rounded="full"
          className="w-full"
        >
          {t.prestation.contactToBook}
        </Button>
      </div>
    </div>
  );
}
