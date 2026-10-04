"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import type { Photo } from "@/constants/media";

interface PhotoGridProps {
  photos: Photo[];
  className: string;
  itemClassName: string;
  sizes?: string;
  labelledBy?: string;
}

export function PhotoGrid({
  photos,
  className,
  itemClassName,
  sizes = "50vw",
  labelledBy,
}: PhotoGridProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <ul
        aria-labelledby={labelledBy}
        className={`grid gap-4 md:gap-3 ${className}`}
      >
        {photos.map((photo, photoIndex) => (
          <li key={photo.src.src}>
            <button
              type="button"
              aria-label={`View full size: ${photo.alt}`}
              onClick={() => setIndex(photoIndex)}
              className={`relative block w-full overflow-hidden rounded-lg ${itemClassName}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={sizes}
                placeholder="blur"
                className="object-cover transition-opacity hover:opacity-85 object-top"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={photos.map((photo) => ({
          alt: photo.alt,
          height: photo.src.height,
          src: photo.src.src,
          width: photo.src.width,
        }))}
      />
    </>
  );
}
