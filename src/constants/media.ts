import type { StaticImageData } from "next/image";

import headshot1 from "@/assets/headshots/headshot-1.webp";
import headshot2 from "@/assets/headshots/headshot-2.webp";
import headshot3 from "@/assets/headshots/headshot-3.webp";
import headshot4 from "@/assets/headshots/headshot-4.webp";
import headshot5 from "@/assets/headshots/headshot-5.webp";
import headshot6 from "@/assets/headshots/headshot-6.webp";
import copParallax from "@/assets/parallax/cop.webp";
import derelictionOfDutyParallax from "@/assets/parallax/dereliction-of-duty.webp";
import heroParallax from "@/assets/parallax/hero.webp";
import mascParallax from "@/assets/parallax/masc.webp";
import derelictionOfDutyStill from "@/assets/stills/dereliction-of-duty.webp";
import intimacyWorkshopStill from "@/assets/stills/intimacy-workshop.webp";
import invisibleHandStill from "@/assets/stills/invisible-hand.webp";
import ourLadyLupeStill from "@/assets/stills/our-lady-lupe.webp";
import smartChoiceStill from "@/assets/stills/smart-choice.webp";
import stepsStill from "@/assets/stills/steps.webp";
import theDinerStill from "@/assets/stills/the-diner.webp";
import willieAlfonsoStill from "@/assets/stills/willie-alfonso.webp";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export interface Media {
  title: string;
  src: string;
}

export const parallax = {
  cop: {
    alt: "Amilcar Javier as a tough cop in Most Wanted",
    src: copParallax,
  },
  derelictionOfDuty: {
    alt: "Amilcar Javier as an insubordinate soldier in Dereliction of Duty",
    src: derelictionOfDutyParallax,
  },
  hero: { alt: "Amilcar Javier", src: heroParallax },
  masc: {
    alt: "Amilcar Javier as a hyper-masculine father in Masc",
    src: mascParallax,
  },
} satisfies Record<string, Photo>;

export const headshots: Photo[] = [
  {
    alt: "Amilcar Javier, tough headshot as a high-level gangster",
    src: headshot1,
  },
  { alt: "Amilcar Javier, professional headshot as a lawyer", src: headshot2 },
  {
    alt: "Amilcar Javier, charming headshot as a love interest",
    src: headshot3,
  },
  { alt: "Amilcar Javier, grungy headshot as a thug", src: headshot4 },
  { alt: "Amilcar Javier, smiling commercial headshot", src: headshot5 },
  {
    alt: "Amilcar Javier, bearded and smiling commercial headshot",
    src: headshot6,
  },
];

export const aboutPhoto: Photo = headshots[2];

export const stills: Photo[] = [
  {
    alt: "Amilcar Javier as an interrogated drug runner in Smart Choice",
    src: smartChoiceStill,
  },
  {
    alt: "Amilcar Javier as a skeptical junkyard owner in Our Lady Lupe",
    src: ourLadyLupeStill,
  },
  {
    alt: "Amilcar Javier as a broken man connecting through therapy in Intimacy Workshop",
    src: intimacyWorkshopStill,
  },
  {
    alt: "Amilcar Javier as a guilty, insubordinate soldier in Dereliction of Duty",
    src: derelictionOfDutyStill,
  },
  {
    alt: "Amilcar Javier as an overworked, frustrated cook in The Diner",
    src: theDinerStill,
  },
  {
    alt: "Amilcar Javier and a former flame reconnecting in a park in These Steps I Climb",
    src: stepsStill,
  },
  {
    alt: "Amilcar Javier as a zealous leader violently interrogating a captive in Invisible Hand",
    src: invisibleHandStill,
  },
  {
    alt: "Amilcar Javier as an abusive father screaming at a mother in NY Yankees - Willie Alfonso",
    src: willieAlfonsoStill,
  },
];

export const voDemos: Media[] = [
  {
    src: "/audio/amilcar-javier-english-vo-demo.mp3",
    title: "English VO Demo",
  },
  {
    src: "/audio/amilcar-javier-spanish-vo-demo.mp3",
    title: "Spanish VO Demo",
  },
];

export const reel = { title: "Acting Reel", youtubeId: "Z4ZE1gOybHI" };
