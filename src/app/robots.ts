import type { MetadataRoute } from "next";

import { site } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
