import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import { Header } from "@/components/header";
import { SocialIcons } from "@/components/social-icons";
import { site } from "@/constants/site";

import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const title = `${site.name} | Actor`;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    description: site.description,
    locale: "en_US",
    siteName: site.name,
    title,
    type: "website",
    url: "/",
  },
  title: { default: title, template: `${title} | %s` },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${raleway.variable} antialiased`}>
      <body className="flex min-h-svh flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-footer px-5 py-5 md:px-10">
          <SocialIcons className="justify-center" />
        </footer>
      </body>
    </html>
  );
}
