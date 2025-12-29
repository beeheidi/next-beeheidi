import React from "react";
import Image from "next/image";

export default function TopImage({
  position = "top-left",
  size = "large",
  className = "",
}) {
  const imageLarge = "/images/autres/carte-topo.svg";
  const imageSmall = "/images/autres/carte-topo-small-90.svg";

  const imageSrc = size === "small" ? imageSmall : imageLarge;

  // Configuration des positions
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    "center-left": "top-1/2 left-0 -translate-y-1/2",
    "center-right": "top-1/2 right-0 -translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const maxWidthClass = size === "small" ? "max-w-[400px]" : "max-w-[800px]";
  const positionClass =
    positionClasses[position] || positionClasses["top-left"];

  return (
    <div
      className={`${maxWidthClass} h-auto absolute ${positionClass} ${className} z-0`}
    >
      <Image
        src={imageSrc}
        alt="Carte topographique"
        width={size === "small" ? 500 : 1000}
        height={size === "small" ? 500 : 1000}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
