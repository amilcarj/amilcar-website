import type { ReactNode } from "react";

const input = "mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-3";

interface FieldLabelProps {
  htmlFor: string;
  small?: boolean;
  children: ReactNode;
}

function FieldLabel({ htmlFor, small = false, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={small ? "text-sm" : ""}>
      {children} <span className="ml-1 text-xs">(required)</span>
    </label>
  );
}

export function ContactForm() {
  return (
    <form aria-label="Contact form" className="mt-11">
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend>Name</legend>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="first-name" small>
                First Name
              </FieldLabel>
              <input
                id="first-name"
                name="firstName"
                required
                autoComplete="given-name"
                className={input}
              />
            </div>
            <div>
              <FieldLabel htmlFor="last-name" small>
                Last Name
              </FieldLabel>
              <input
                id="last-name"
                name="lastName"
                required
                autoComplete="family-name"
                className={input}
              />
            </div>
          </div>
        </fieldset>
        <div>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={input}
          />
        </div>
        <div>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <input id="subject" name="subject" required className={input} />
        </div>
        <div>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={input}
          />
        </div>
        <button type="submit" className="button-outline self-start">
          Submit
        </button>
      </div>
    </form>
  );
}
