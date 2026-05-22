"use client";

import { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  alt: string;
}

export default function Carousel({ images, alt }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group bg-charcoal/5">
      <div className="relative w-full h-full">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              i === current
                ? "opacity-100 translate-x-0"
                : i < current
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
