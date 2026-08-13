import Image from "next/image";
import Button from "@/components/ui/Button/Button";

export default function ImageTextBlock({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  buttonHref,
  buttonVariant = "primary",
  imageLeft = true,
  blockClass = "",
  className = "",
  showBottomMargin = true,
}) {
  // Détermine les classes de bordure arrondie selon la position de l'image
  const imageRoundedClasses = imageLeft
    ? "rounded-[3rem] md:rounded-tr-[8rem] md:rounded-bl-[4rem]"
    : "rounded-[3rem] md:rounded-tl-[8rem] md:rounded-br-[4rem]";

  // Détermine les marges négatives selon la position de l'image
  const textMarginClasses = imageLeft
    ? "-mt-20 md:mt-0 md:-ml-32"
    : "-mb-20 md:mb-0 md:-mr-32";

  // Détermine l'ordre des éléments sur mobile
  const textOrderClasses = imageLeft ? "" : "order-2 md:order-1";
  const imageOrderClasses = imageLeft ? "" : "order-1 md:order-2";

  // Position de l'élément décoratif
  const decorativePositionClasses = imageLeft
    ? "absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24"
    : "absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32";

  return (
    <section
      className={`flex flex-col md:flex-row items-center relative group ${blockClass} ${
        showBottomMargin ? "mb-40" : ""
      } ${className}`}
    >
      {/* Image */}
      <div
        className={`md:w-7/12 w-full relative aspect-[3/4] md:aspect-[4/3] ${imageRoundedClasses} overflow-hidden shadow-2xl z-10 transition-all duration-700 hover:shadow-card ${imageOrderClasses}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div
        className={`md:w-5/12 w-[90%] ${textMarginClasses} z-20 ${textOrderClasses}`}
      >
        <div className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-4xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative">
          <div
            className={`${decorativePositionClasses} bg-[var(--color-primary)] opacity-10 rounded-full blur-xl animate-pulse`}
          ></div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[var(--color-primary)]"></span>
            {title}
          </h2>
          <p
            className="text-gray-600 leading-loose text-lg font-light mb-8"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {buttonText && buttonHref && (
            <Button
              href={buttonHref}
              variant={buttonVariant}
              rounded="full"
              size="md"
              className="px-8 py-3"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
