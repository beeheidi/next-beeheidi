import Image from "next/image";

export default function ImageDuo({
  image1Src,
  image1Alt,
  image2Src,
  image2Alt,
  image3Src,
  image3Alt,
  className = "",
}) {
  const imageClass =
    "object-cover transition-transform duration-1000 group-hover:scale-105";
  const frameClass =
    "relative overflow-hidden shadow-2xl group transition-all duration-700 hover:shadow-card";

  if (image3Src) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 md:gap-8 mb-40 ${className}`}
      >
        {/* Grande photo portrait à gauche */}
        <div
          className={`block-1 aspect-[3/4] md:aspect-auto md:row-span-2 md:h-full rounded-[3rem] md:rounded-tr-[8rem] md:rounded-bl-[4rem] ${frameClass}`}
        >
          <Image
            src={image1Src}
            alt={image1Alt}
            fill
            className={imageClass}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Photo paysage haut droite */}
        <div
          className={`block-2 aspect-[4/3] rounded-[3rem] md:rounded-tl-[8rem] ${frameClass}`}
        >
          <Image
            src={image2Src}
            alt={image2Alt}
            fill
            className={imageClass}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Photo paysage bas droite */}
        <div
          className={`block-3 aspect-[4/3] rounded-[3rem] md:rounded-br-[4rem] ${frameClass}`}
        >
          <Image
            src={image3Src}
            alt={image3Alt}
            fill
            className={imageClass}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-40 ${className}`}
    >
      <div
        className={`block-1 w-full md:w-1/2 aspect-[3/4] rounded-[3rem] md:rounded-tr-[8rem] md:rounded-bl-[4rem] ${frameClass}`}
      >
        <Image
          src={image1Src}
          alt={image1Alt}
          fill
          className={imageClass}
        />
      </div>

      <div
        className={`block-2 w-full md:w-1/2 md:mt-24 aspect-[4/3] rounded-[3rem] md:rounded-tl-[8rem] md:rounded-br-[4rem] ${frameClass}`}
      >
        <Image
          src={image2Src}
          alt={image2Alt}
          fill
          className={imageClass}
        />
      </div>
    </div>
  );
}
