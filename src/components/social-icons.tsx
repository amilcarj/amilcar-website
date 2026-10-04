import Image from "next/image";

import { site } from "@/constants/site";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  return (
    <ul className={`group flex gap-3 ${className}`}>
      {site.socialLinks.map((link) => {
        const external = link.href.startsWith("https://");
        return (
          <li key={link.href}>
            <a
              href={link.href}
              {...(external && {
                rel: "noopener noreferrer",
                target: "_blank",
              })}
              className="flex size-10 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-neutral-500 hover:bg-cyan-bright! focus-visible:outline-cyan-bright"
            >
              <Image
                src={link.icon.src}
                alt={link.icon.alt}
                style={{ height: "auto", width: link.iconWidth }}
                className="brightness-0"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
