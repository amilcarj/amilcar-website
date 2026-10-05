import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Reels } from "@/components/sections/reels";
import { Resume } from "@/components/sections/resume";
import {
  aboutPhoto,
  headshots,
  reel,
  stills,
  voDemos,
} from "@/constants/media";
import { resume } from "@/constants/resume";
import { site } from "@/constants/site";

describe("Hero", () => {
  test("links every profile, opening web links in a new tab and email in place", () => {
    render(<Hero />);
    expect(screen.getAllByRole("link")).toHaveLength(site.socialLinks.length);
    for (const link of site.socialLinks) {
      const anchor = screen.getByRole("link", { name: link.icon.alt });
      expect(anchor.getAttribute("href")).toBe(link.href);
      if (link.href.startsWith("https://")) {
        expect(anchor.getAttribute("target")).toBe("_blank");
        expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
      } else {
        expect(anchor.hasAttribute("target")).toBe(false);
      }
    }
  });
});

describe("About", () => {
  test("has the photo, three bio paragraphs and bold credits", () => {
    const { container } = render(<About />);
    expect(screen.getByRole("region", { name: "About Me" }).id).toBe("about");
    expect(screen.getByRole("img", { name: aboutPhoto.alt })).toBeDefined();
    expect(container.querySelectorAll("p")).toHaveLength(3);
    expect(screen.getByText("CBS FBI: Most Wanted").tagName).toBe("STRONG");
    expect(screen.getByText("Held Hostage in My House").tagName).toBe("STRONG");
  });
});

describe("Resume", () => {
  test("has a PDF download", () => {
    render(<Resume />);
    expect(screen.getByRole("region", { name: "Resume" }).id).toBe("resume");
    const download = screen.getByRole("link", { name: "Download Full Resume" });
    expect(download.getAttribute("href")).toBe(resume.pdf);
    expect(download.hasAttribute("download")).toBe(true);
  });

  test("lists every credit under its heading with role/episode and company/director", () => {
    render(<Resume />);
    for (const section of resume.sections) {
      const list = screen.getByRole("list", { name: section.heading });
      expect(within(list).getAllByRole("listitem")).toHaveLength(
        section.credits.length,
      );
    }
    expect(screen.getByText("Co-Star / S.4 Ep.17")).toBeDefined();
    expect(screen.getByText("CBS / Sharon Lewis")).toBeDefined();
  });

  test("shows training with bold schools and every skill group", () => {
    render(<Resume />);
    expect(screen.getByText("Anthony Abeson Studio").tagName).toBe("STRONG");
    const skills = screen.getByRole("list", { name: "Skills" });
    expect(within(skills).getAllByRole("listitem")).toHaveLength(
      resume.skills.length,
    );
    expect(
      within(skills).getByText(/Spanish \(Fluent\), French \(Basic\)/),
    ).toBeDefined();
  });
});

describe("Reels", () => {
  test("has the reel and every voice demo", () => {
    render(<Reels />);
    expect(screen.getByRole("region", { name: "Reels" }).id).toBe("reels");
    for (const title of [
      reel.title,
      ...voDemos.map((voDemo) => voDemo.title),
    ]) {
      expect(
        screen.getByRole("button", { name: `Play ${title}` }),
      ).toBeDefined();
    }
  });
});

describe("Gallery", () => {
  test("has headshots and stills under their own headings", () => {
    render(<Gallery />);
    expect(screen.getByRole("region", { name: "Gallery" }).id).toBe("gallery");
    expect(
      within(screen.getByRole("list", { name: "Headshots" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(headshots.length);
    expect(
      within(screen.getByRole("list", { name: "Stills" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(stills.length);
  });

  test("opens the lightbox on the chosen photo and closes it", async () => {
    render(<Gallery />);
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: `View full size: ${stills[2].alt}` }),
    );
    const dialog = await screen.findByRole("dialog");
    const slide = within(dialog).getByRole("group", {
      name: `3 of ${stills.length}`,
    });
    expect(slide.querySelector("img")?.getAttribute("alt")).toBe(stills[2].alt);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await expect.poll(() => screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Contact", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  const fillForm = (overrides: Record<string, string> = {}) => {
    const values: Record<string, string> = {
      "Email Address": "casting@example.com",
      "First Name": "Jamie",
      "Last Name": "Rivera",
      Message: "We'd love to see you for a role.",
      Subject: "Audition",
      ...overrides,
    };
    const form = screen.getByRole("form", { name: "Contact form" });
    for (const [label, value] of Object.entries(values)) {
      fireEvent.change(within(form).getByLabelText(new RegExp(label)), {
        target: { value },
      });
    }
    return form;
  };

  const mockResend = (ok: boolean) => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", site.email);
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    return vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: ok ? 200 : 500 }));
  };

  test("has the direct email and the contact form fields", () => {
    render(<Contact />);
    expect(screen.getByRole("region", { name: "Contact" }).id).toBe("contact");
    for (const link of screen.getAllByRole("link", { name: site.email })) {
      expect(link.getAttribute("href")).toBe(`mailto:${site.email}`);
    }

    const form = screen.getByRole("form", { name: "Contact form" });
    for (const label of [
      "First Name",
      "Last Name",
      "Email Address",
      "Subject",
      "Message",
    ]) {
      expect(
        within(form).getByLabelText(new RegExp(label)).matches(":required"),
      ).toBe(true);
    }
    expect(within(form).getByRole("button", { name: "Submit" })).toBeDefined();
  });

  test("shows commercial representation with logo, email and phone links", () => {
    render(<Contact />);
    const { representation } = site;
    const logoLink = screen.getByRole("link", {
      name: representation.logo.alt,
    });
    expect(logoLink.getAttribute("href")).toBe(representation.website);
    expect(logoLink.getAttribute("target")).toBe("_blank");
    expect(screen.getByText(representation.department)).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: representation.email })
        .getAttribute("href"),
    ).toBe(
      `mailto:${representation.email}?subject=Book%20Client%20-%20Amilcar%20Javier`,
    );
    expect(
      screen
        .getByRole("link", { name: representation.phone })
        .getAttribute("href"),
    ).toBe("tel:+13233785484");
  });

  test("sends a valid message to Resend with the visitor as reply-to", async () => {
    const fetchMock = mockResend(true);
    render(<Contact />);
    fireEvent.submit(fillForm());

    expect(
      await screen.findByText("Thanks! Your message was sent."),
    ).toBeDefined();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init?.body))).toMatchObject({
      from: "Website Contact <onboarding@resend.dev>",
      reply_to: "casting@example.com",
      subject: "Website contact: Audition",
      to: site.email,
    });
  });

  test("shows field errors, keeps the input, and sends nothing when invalid", async () => {
    const fetchMock = mockResend(true);
    render(<Contact />);
    fireEvent.submit(
      fillForm({ "Email Address": "not-an-email", Message: "" }),
    );

    expect(
      await screen.findByText("Enter a valid email address."),
    ).toBeDefined();
    expect(screen.getByText("This field is required.")).toBeDefined();
    expect(
      (screen.getByLabelText(/Email Address/) as HTMLInputElement).value,
    ).toBe("not-an-email");
    expect(
      screen.getByLabelText(/First Name/).getAttribute("aria-invalid"),
    ).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("offers the direct email when sending fails", async () => {
    mockResend(false);
    render(<Contact />);
    fireEvent.submit(fillForm());

    expect(await screen.findByText(/couldn't be sent/)).toBeDefined();
    expect(
      screen.getAllByRole("link", { name: site.email }).length,
    ).toBeGreaterThan(1);
  });

  test("silently drops submissions that fill in the honeypot", async () => {
    const fetchMock = mockResend(true);
    const { container } = render(<Contact />);
    const form = fillForm();
    fireEvent.change(
      container.querySelector('input[name="company"]') as HTMLInputElement,
      {
        target: { value: "spam" },
      },
    );
    fireEvent.submit(form);

    expect(
      await screen.findByText("Thanks! Your message was sent."),
    ).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
