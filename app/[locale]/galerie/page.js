import Image from "next/image";

export const metadata = {
  title: "Galerie - Beeheidi",
  description: "Découvrez nos expériences en images",
};

const images = [
  { src: "/images/services/2020RandonneTrailRunningValaisBissBeeheidi8.jpg", alt: "Trail running Valais" },
  { src: "/images/services/2020BeeheidiCrans-Montana079.jpg", alt: "Crans-Montana" },
  { src: "/images/qui-est-heidi/portrait.jpg", alt: "Sandra, fondatrice de Beeheidi" },
  { src: "/images/services/PlantesFleursTisanesHerbier21b.jpg", alt: "Plantes et fleurs" },
  { src: "/images/services/2020BeeheidiChampry06.jpg", alt: "Champéry" },
  { src: "/images/services/BeeheidiEnjoySwitzerland2.jpg", alt: "Enjoy Switzerland" },
  { src: "/images/accueil/2020BeeheidiRandonnevalais.jpg", alt: "Randonnée Valais" },
  { src: "/images/services/BeeheidiEnjoySwitzerland90.jpg", alt: "Enjoy Switzerland" },
  { src: "/images/qui-est-heidi/qui-est-heidi-img-2.jpg", alt: "L'équipe Beeheidi" },
  { src: "/images/services/EdelweissZermatt.jpg", alt: "Edelweiss Zermatt" },
  { src: "/images/accueil/BeeheidiSwitzerlandFlower.jpg", alt: "Fleurs Suisse" },
  { src: "/images/accueil/Beeheidi.jpg", alt: "Beeheidi" },
];

export default function GaleriePage() {
  return (
    <main className="pt-20">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative break-inside-avoid border border-white overflow-hidden"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover block"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
