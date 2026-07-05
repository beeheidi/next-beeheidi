import Image from "next/image";

export default function PrestationHero({
  bannerImageUrl,
  bannerImage,
  title,
  categoryLabel,
  seasons,
  subtitle,
}) {
  return (
    <>
      {bannerImageUrl && (
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-8">
          <Image
            src={bannerImageUrl}
            alt={bannerImage?.alt || title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryLabel && (
            <span className="px-4 py-2 bg-primary text-white rounded-full font-medium">
              {categoryLabel}
            </span>
          )}
          {seasons.map((season, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-light"
            >
              {season}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-light text-primary mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl font-light text-black mb-6">{subtitle}</p>
        )}
      </div>
    </>
  );
}
