import bicoastalMgmt from "@/assets/bicoastal-mgmt.webp";
import actorsAccessIcon from "@/assets/icons/actors-access.webp";
import emailIcon from "@/assets/icons/email.webp";
import imdbIcon from "@/assets/icons/imdb.webp";
import instagramIcon from "@/assets/icons/instagram.webp";

const email = "contact@amilcarjavier.com";

export const site = {
  bio: [
    "Amilcar Javier is a bilingual Afro-Latino bi-coastal SAG actor. He trains in improv, comedy, drama & scene study with Anthony Abeson.",
    "Amilcar was born & raised in New York City. In addition to his career as an actor, Amilcar is a professional Salsa & African Step dancer as well as a grant-winning writer & producer. In between writing scripts & running lines, he also writes scripts and runs lines of code as a professional software engineer.",
    [
      "His recent credits include ",
      "CBS FBI: Most Wanted",
      " and the feature film ",
      "Held Hostage in My House",
      ".",
    ],
  ] as const,
  description: "Amilcar Javier: Actor, NYC | LA, SAG-AFTRA.",
  email,
  name: "Amilcar Javier",
  representation: {
    agency: "Bicoastal Management",
    department: "COMMERCIAL / PRINT / FIT",
    email: "chrissy@bicoastalmgmt.com",
    emailSubject: "Book Client - Amilcar Javier",
    logo: { alt: "Bicoastal Management", src: bicoastalMgmt },
    phone: "(323) 378-5484",
    website: "https://www.bicoastalmgmt.com/",
  },
  socialLinks: [
    {
      href: `mailto:${email}`,
      icon: { alt: "Email", src: emailIcon },
      iconWidth: 25,
      label: "Email",
    },
    {
      href: "https://imdb.me/amilcarjavier",
      icon: { alt: "IMDb", src: imdbIcon },
      iconWidth: 25,
      label: "IMDb",
    },
    {
      href: "https://resumes.actorsaccess.com/amilcar_javier",
      icon: { alt: "Actors Access", src: actorsAccessIcon },
      iconWidth: 29,
      label: "Actors Access",
    },
    {
      href: "https://instagram.com/amilcar_acts",
      icon: { alt: "Instagram", src: instagramIcon },
      iconWidth: 18,
      label: "Instagram",
    },
  ],
  tagline: "ACTOR | NYC | SAG-AFTRA",
  url: "https://amilcarjavier.com",
};
