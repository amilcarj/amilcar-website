import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Header } from "@/components/header";
import { site } from "@/constants/site";

import SectionPage, {
  generateMetadata,
  generateStaticParams,
} from "./[section]/page";
import Home, { personJsonLd } from "./page";
import robots from "./robots";
import sitemap from "./sitemap";

test("the site name and every main nav link lead to a section on the page, in order", () => {
  const { container } = render(
    <>
      <Header />
      <Home />
    </>,
  );
  const sectionId = (href: string | null) => href?.split("#")[1] ?? "home";

  expect(
    sectionId(
      screen.getByRole("link", { name: /Amilcar Javier/ }).getAttribute("href"),
    ),
  ).toBe("home");
  const linkTargets = within(screen.getByRole("navigation", { name: "Main" }))
    .getAllByRole("link")
    .map((link) => sectionId(link.getAttribute("href")));
  const sectionIds = [...container.querySelectorAll("section[id]")].map(
    (section) => section.id,
  );
  expect(linkTargets).toEqual(sectionIds);
});

test("mobile menu opens and closes via the close button, a section link, and the backdrop", () => {
  render(<Header />);
  const menu = screen.getByRole("dialog", {
    hidden: true,
  }) as HTMLDialogElement;
  const open = () =>
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

  expect(menu.open).toBe(false);
  open();
  expect(menu.open).toBe(true);
  fireEvent.click(within(menu).getByRole("button", { name: "Close menu" }));
  expect(menu.open).toBe(false);

  open();
  fireEvent.click(within(menu).getByRole("link", { name: "Resume" }));
  expect(menu.open).toBe(false);

  open();
  fireEvent.click(menu);
  expect(menu.open).toBe(false);
});

describe("SEO", () => {
  const props = (section: string) => ({
    params: Promise.resolve({ section }),
    searchParams: Promise.resolve({}),
  });

  test("includes the Person structured data for search engines", () => {
    const { container } = render(<Home />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(script?.textContent ?? "null")).toEqual(personJsonLd());
  });

  test("allows all crawlers and points to the sitemap", () => {
    const result = robots();
    expect(result.rules).toEqual({ allow: "/", userAgent: "*" });
    expect(result.sitemap).toBe("https://amilcarjavier.com/sitemap.xml");
  });

  test("lists the home page and every standalone section page, each of which renders its section", async () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      "https://amilcarjavier.com",
      "https://amilcarjavier.com/about",
      "https://amilcarjavier.com/resume",
      "https://amilcarjavier.com/reels",
      "https://amilcarjavier.com/gallery",
      "https://amilcarjavier.com/contact",
    ]);

    const sections = urls.slice(1).map((url) => new URL(url).pathname.slice(1));
    expect(
      generateStaticParams()
        .map(({ section }) => section)
        .sort(),
    ).toEqual([...sections].sort());
    for (const section of sections) {
      const { container, unmount } = render(await SectionPage(props(section)));
      expect(container.querySelector(`section#${section}`)).not.toBeNull();
      unmount();
    }
  });

  test("responds with not found for paths that aren't a section", async () => {
    for (const section of ["nope", "constructor"]) {
      const notFound = { digest: "NEXT_HTTP_ERROR_FALLBACK;404" };
      await expect(SectionPage(props(section))).rejects.toMatchObject(notFound);
      await expect(generateMetadata(props(section))).rejects.toMatchObject(
        notFound,
      );
    }
  });

  test("gives each standalone section page its own canonical URL and title", async () => {
    expect(await generateMetadata(props("resume"))).toEqual({
      alternates: { canonical: "/resume" },
      title: "Resume",
    });
  });

  test("describes the actor as a Person with an absolute image and web profiles only", () => {
    const data = personJsonLd();
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      jobTitle: "Actor",
      name: site.name,
      url: site.url,
    });
    expect(data.image.startsWith(`${site.url}/`)).toBe(true);
    expect(data.sameAs).toEqual(
      site.socialLinks
        .filter((link) => link.href.startsWith("https://"))
        .map((link) => link.href),
    );
  });
});
