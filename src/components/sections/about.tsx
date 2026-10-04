import Image from "next/image";

import { aboutPhoto } from "@/constants/media";
import { site } from "@/constants/site";

export function About() {
  const { bio } = site;
  const credits = bio[2];

  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <h2 id="about-heading" className="sr-only">
        About Me
      </h2>
      <div className="mx-auto flex flex-col max-w-282 md:flex-row">
        <div className="overflow-hidden md:w-1/2 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Image
            src={aboutPhoto.src}
            alt={aboutPhoto.alt}
            sizes="(min-width: 1128px) 564px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="aspect-square size-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col md:w-1/2 justify-center gap-4 bg-panel rounded-b-lg text-base p-9 md:rounded-r-lg md:rounded-bl-none md:p-16 md:text-lg leading-relaxed">
          <p>{bio[0]}</p>
          <p>{bio[1]}</p>
          <p>
            {credits[0]}
            <strong>{credits[1]}</strong>
            {credits[2]}
            <strong>{credits[3]}</strong>
            {credits[4]}
          </p>
        </div>
      </div>
    </section>
  );
}
