import type { MetadataRoute } from "next";

import { navItems } from "@/constants/navigation";
import { site } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => {
    const section = item.href.split("#")[1];
    return { url: section ? `${site.url}/${section}` : site.url };
  });
}
