interface Credit {
  title: string;
  role: string;
  episode?: string;
  company: string;
  director: string;
}

interface Section {
  heading: string;
  credits: Credit[];
}

interface TrainingEntry {
  school: string;
  focus: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface Resume {
  pdf: string;
  sections: Section[];
  training: TrainingEntry[];
  skills: SkillGroup[];
}

export const resume: Resume = {
  pdf: "/Amilcar Javier Resume.pdf",
  sections: [
    {
      credits: [
        {
          company: "CBS",
          director: "Sharon Lewis",
          episode: "S.4 Ep.17",
          role: "Co-Star",
          title: "FBI: Most Wanted",
        },
        {
          company: "Netflix",
          director: "Constantine Makris",
          episode: "S.4 Ep.2",
          role: "Co-Star",
          title: "Orange is the New Black",
        },
      ],
      heading: "Television",
    },
    {
      credits: [
        {
          company: "PBS",
          director: "Dominique Nieves",
          role: "Lead",
          title: "Our Lady Lupe",
        },
        {
          company: "GOLDCAT",
          director: "Eddie Prunoske",
          role: "Lead",
          title: "Intimacy Workshop",
        },
        {
          company: "Kiss and Tale Productions",
          director: "Anna Elizabeth James",
          role: "Supporting",
          title: "Held Hostage in My House",
        },
      ],
      heading: "Film",
    },
    {
      credits: [
        {
          company: "The Joust Theatre Company",
          director: "Jacob Marx Rice",
          role: "Prince Louis Capet",
          title: "Incorruptible",
        },
        {
          company: "Strawberry One-Act Festival",
          director: "Nadia Asencio",
          role: "Lloyd",
          title: "Cheesecake!",
        },
      ],
      heading: "Theatre",
    },
  ],
  skills: [
    { category: "Languages", items: ["Spanish (Fluent)", "French (Basic)"] },
    { category: "Accents", items: ["New York", "Pakistani"] },
    {
      category: "Dance",
      items: ["Salsa", "African Step", "Merengue", "Bachata", "Hip-Hop"],
    },
    {
      category: "Instrument",
      items: [
        "Tenor Saxophone",
        "B Flat Clarinet",
        "Latin Cultural Instruments",
      ],
    },
    {
      category: "Other",
      items: ["Rap / Spoken Word", "Basketball", "Computer Programming"],
    },
  ],
  training: [
    { focus: "Advanced Acting Technique", school: "Anthony Abeson Studio" },
    { focus: "Scene Study", school: "Humanity Studios (Shae D'lyn)" },
  ],
};
