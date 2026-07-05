import Image from "next/image";

export default function ImageDuo({
  image1Src,
  image1Alt,
  image2Src,
  image2Alt,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-40 ${className}`}
    >
      <div className="block-1 w-full md:w-1/2 relative aspect-[3/4] rounded-[3rem] md:rounded-tr-[8rem] md:rounded-bl-[4rem] overflow-hidden shadow-2xl group transition-all duration-700 hover:shadow-card">
        <Image
          src={image1Src}
          alt={image1Alt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      <div className="block-2 w-full md:w-1/2 md:mt-24 relative aspect-[4/3] rounded-[3rem] md:rounded-tl-[8rem] md:rounded-br-[4rem] overflow-hidden shadow-2xl group transition-all duration-700 hover:shadow-card">
        <Image
          src={image2Src}
          alt={image2Alt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
