"use client";

import Image from "next/image";

import type { Photo } from "@/constants/media";
import { useParallax } from "@/hooks/useParallax";

const SPEED = 0.5;

interface ParallaxImageProps {
  photo: Photo;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function ParallaxImage({
  photo,
  className = "",
  imageClassName = "object-top",
  priority = false,
}: ParallaxImageProps) {
  const { section, layer } = useParallax(SPEED);

  return (
    <div
      ref={section}
      className={`parallax-section relative overflow-clip bg-black ${className}`}
    >
      <div
        ref={layer}
        className="parallax-layer absolute inset-x-0 top-0 h-lvh min-h-full will-change-transform"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="100vw"
          placeholder="blur"
          className={`object-cover ${imageClassName}`}
        />
      </div>
    </div>
  );
}
