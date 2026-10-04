import { ParallaxImage } from "@/components/parallax-image";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Reels } from "@/components/sections/reels";
import { Resume } from "@/components/sections/resume";
import { parallax } from "@/constants/media";
import { site } from "@/constants/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    description: site.description,
    image: `${site.url}${parallax.hero.src.src}`,
    jobTitle: "Actor",
    memberOf: { "@type": "Organization", name: "SAG-AFTRA" },
    name: site.name,
    sameAs: site.socialLinks
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
    url: site.url,
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <ParallaxImage photo={parallax.cop} />
      <Resume />
      <ParallaxImage photo={parallax.derelictionOfDuty} />
      <Reels />
      <Gallery />
      <ParallaxImage photo={parallax.masc} />
      <Contact />
    </>
  );
}
