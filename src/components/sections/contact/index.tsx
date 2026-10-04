import Image from "next/image";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { site } from "@/constants/site";

const link =
  "text-link underline decoration-link/30 underline-offset-4 transition-colors hover:decoration-link";

export function Contact() {
  const { representation } = site;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
      <div className="mx-auto grid max-w-282 gap-x-38 gap-y-12 md:grid-cols-[431fr_547fr]">
        <div>
          <h3 className="section-heading">Direct Contact</h3>
          <p className="mt-8">
            Want to collaborate, ask a question, or consider Amilcar for a
            casting? Send him an email at{" "}
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>{" "}
            or use the form below!
          </p>
          <ContactForm />
        </div>

        <div>
          <h3 className="section-heading">Commercial Representation</h3>
          <a
            href={representation.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-9 block aspect-547/234 overflow-hidden"
          >
            <Image
              src={representation.logo.src}
              alt={representation.logo.alt}
              fill
              sizes="(min-width: 768px) 547px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </a>
          <div className="mt-11 flex flex-col items-center gap-4 text-center">
            <p className="font-bold">{representation.department}</p>
            <a
              href={`mailto:${representation.email}?subject=${encodeURIComponent(representation.emailSubject)}`}
              className={link}
            >
              {representation.email}
            </a>
            <a
              href={`tel:+1${representation.phone.replace(/\D/g, "")}`}
              className={link}
            >
              {representation.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
