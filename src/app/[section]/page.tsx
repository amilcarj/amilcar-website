import type { Metadata } from "next";
import type { ComponentType } from "react";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Reels } from "@/components/sections/reels";
import { Resume } from "@/components/sections/resume";

const sections: Record<string, { Component: ComponentType; title: string }> = {
  about: { Component: About, title: "About" },
  contact: { Component: Contact, title: "Contact" },
  gallery: { Component: Gallery, title: "Gallery" },
  reels: { Component: Reels, title: "Reels" },
  resume: { Component: Resume, title: "Resume" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  return {
    alternates: { canonical: `/${section}` },
    title: sections[section].title,
  };
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  const { Component } = sections[section];
  return <Component />;
}
