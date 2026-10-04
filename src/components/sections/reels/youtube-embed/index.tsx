"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState("maxresdefault");

  return (
    <div className="relative aspect-video overflow-hidden bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/${thumbnail}.jpg`}
            alt={title}
            fill
            unoptimized
            onError={() => setThumbnail("hqdefault")}
            className="object-cover"
          />
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-cyan-bright"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-black/50 transition-colors group-hover:bg-black/75 md:size-30">
              <Play
                aria-hidden="true"
                className="ml-1 size-5 fill-white text-white md:size-10"
              />
            </span>
          </button>
        </>
      )}
    </div>
  );
}
