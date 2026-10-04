import { ParallaxImage } from "@/components/parallax-image";
import { SocialIcons } from "@/components/social-icons";
import { parallax } from "@/constants/media";
import { site } from "@/constants/site";

export function Hero() {
  return (
    <section id="home" className="relative">
      <h1 className="sr-only">{site.name}</h1>
      <ParallaxImage
        photo={parallax.hero}
        className="[--section-height:calc(100svh-var(--header-height))]"
        imageClassName="object-top md:object-[50%_-80px]"
        priority
      />
      <SocialIcons className="absolute right-5 bottom-8 md:right-11" />
    </section>
  );
}
