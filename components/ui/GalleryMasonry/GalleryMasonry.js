"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Groups images into rows of 3 (alternating a large image left/right with two
// stacked images), falling back to a single full-width image or a side-by-side
// pair for the trailing 1 or 2 images that don't complete a full row of 3.
function buildRows(images) {
  const rows = [];
  let i = 0;
  let tripletIndex = 0;

  while (i < images.length) {
    const remaining = images.length - i;

    if (remaining >= 3) {
      const layout = tripletIndex % 2 === 0 ? "big-left" : "big-right";
      rows.push({
        layout,
        items: images.slice(i, i + 3).map((image, offset) => ({ image, index: i + offset })),
      });
      i += 3;
      tripletIndex += 1;
    } else if (remaining === 2) {
      rows.push({
        layout: "pair",
        items: images.slice(i, i + 2).map((image, offset) => ({ image, index: i + offset })),
      });
      i += 2;
    } else {
      rows.push({
        layout: "single",
        items: [{ image: images[i], index: i }],
      });
      i += 1;
    }
  }

  return rows;
}

const ROW_HEIGHT_CLASSES = "h-[240px] sm:h-[320px] md:h-[420px]";

export default function GalleryMasonry({ images, altBase }) {
  const [current, setCurrent] = useState(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close, prev, next]);

  if (!images?.length) return null;

  const rows = buildRows(images);

  return (
    <>
      {/* Custom gallery grid */}
      <div className="flex flex-col ">
        {rows.map((row, rowIndex) => {
          if (row.layout === "single") {
            const { image, index } = row.items[0];
            return (
              <div key={rowIndex} className={`relative ${ROW_HEIGHT_CLASSES} overflow-hidden cursor-pointer`}>
                <Image
                  src={image.url}
                  alt={image.alt || `${altBase} - ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  onClick={() => setCurrent(index)}
                />
              </div>
            );
          }

          if (row.layout === "pair") {
            return (
              <div key={rowIndex} className={`grid grid-cols-2  ${ROW_HEIGHT_CLASSES}`}>
                {row.items.map(({ image, index }) => (
                  <div
                    key={image.key || index}
                    className="relative  overflow-hidden cursor-pointer"
                    onClick={() => setCurrent(index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${altBase} - ${index + 1}`}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          }

          // "big-left" or "big-right": one large image + two stacked images
          const [big, top, bottom] = row.items;
          const bigPosition = row.layout === "big-left" ? "col-start-1" : "col-start-2";
          const stackedPosition = row.layout === "big-left" ? "col-start-2" : "col-start-1";

          return (
            <div
              key={rowIndex}
              className={`grid grid-cols-2 grid-rows-2  ${ROW_HEIGHT_CLASSES}`}
            >
              <div
                className={`relative row-start-1 row-span-2 ${bigPosition}  overflow-hidden cursor-pointer`}
                onClick={() => setCurrent(big.index)}
              >
                <Image
                  src={big.image.url}
                  alt={big.image.alt || `${altBase} - ${big.index + 1}`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`relative row-start-1 ${stackedPosition}  overflow-hidden cursor-pointer`}
                onClick={() => setCurrent(top.index)}
              >
                <Image
                  src={top.image.url}
                  alt={top.image.alt || `${altBase} - ${top.index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`relative row-start-2 ${stackedPosition}  overflow-hidden cursor-pointer`}
                onClick={() => setCurrent(bottom.index)}
              >
                <Image
                  src={bottom.image.url}
                  alt={bottom.image.alt || `${altBase} - ${bottom.index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Fermer"
            className="absolute top-5 right-6 z-10 text-white/60 hover:text-white transition-colors"
            style={{ fontSize: 32, lineHeight: 1 }}
          >
            ✕
          </button>

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tabular-nums select-none">
            {current + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Image précédente"
              className="absolute left-4 md:left-8 z-10 text-white/50 hover:text-white transition-colors p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ padding: "48px 80px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current].urlLarge}
              alt={images[current].alt || `${altBase} - ${current + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Image suivante"
              className="absolute right-4 md:right-8 z-10 text-white/50 hover:text-white transition-colors p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
