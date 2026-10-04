import { resume } from "@/constants/resume";

const subheading = "mt-7 mb-5 font-bold uppercase";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="section">
      <h2 id="resume-heading" className="section-heading">
        Resume
      </h2>

      <div className="mt-10 text-center">
        <a href={resume.pdf} download className="button-outline">
          Download Full Resume
        </a>
      </div>

      {resume.sections.map((section) => {
        const headingId = `resume-${section.heading.toLowerCase()}`;
        return (
          <div key={section.heading} className="border-b border-black pb-4">
            <h3 id={headingId} className={subheading}>
              {section.heading}
            </h3>
            <ul aria-labelledby={headingId}>
              {section.credits.map((credit) => (
                <li
                  key={credit.title}
                  className="grid gap-4 px-4 py-2 text-center even:bg-stone-100 md:grid-cols-3 md:gap-8 md:text-left"
                >
                  <span>{credit.title}</span>
                  <span>
                    {`${credit.role}${credit.episode ? ` / ${credit.episode}` : ""}`}
                  </span>
                  <span>{`${credit.company} / ${credit.director}`}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className="border-b border-black pb-4">
        <h3 className={subheading}>Training</h3>
        <ul className="flex flex-col gap-4 px-4">
          {resume.training.map((entry) => (
            <li key={entry.school}>
              <strong>{entry.school}</strong> - {entry.focus}
            </li>
          ))}
        </ul>
      </div>

      <h3 id="resume-skills" className={subheading}>
        Skills
      </h3>
      <ul aria-labelledby="resume-skills" className="flex flex-col gap-4 px-4">
        {resume.skills.map((group) => (
          <li key={group.category}>
            <em className="uppercase">{group.category}:</em>{" "}
            {group.items.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
