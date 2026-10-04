import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { VoiceDemo } from ".";

const demo = { src: "/audio/english-vo-demo.mp3", title: "English VO Demo" };

test("plays, pauses, and resets when the audio ends", () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, "play");
  const pause = vi.spyOn(HTMLMediaElement.prototype, "pause");
  const { container } = render(<VoiceDemo demo={demo} />);
  const audio = container.querySelector("audio") as HTMLAudioElement;

  fireEvent.click(screen.getByRole("button", { name: "Play English VO Demo" }));
  expect(play).toHaveBeenCalled();
  fireEvent.play(audio);

  fireEvent.click(
    screen.getByRole("button", { name: "Pause English VO Demo" }),
  );
  expect(pause).toHaveBeenCalled();
  fireEvent.ended(audio);
  expect(
    screen.getByRole("button", { name: "Play English VO Demo" }),
  ).toBeDefined();
});

test("offers a download, and swaps it for an unavailable notice when the audio fails", () => {
  const { container } = render(<VoiceDemo demo={demo} />);
  const download = screen.getByRole("link", {
    name: "Download English VO Demo",
  });
  expect(download.getAttribute("href")).toBe(demo.src);
  expect(download.hasAttribute("download")).toBe(true);

  fireEvent.error(container.querySelector("audio") as HTMLAudioElement);
  expect(
    screen
      .getByRole("button", { name: "Play English VO Demo" })
      .matches(":disabled"),
  ).toBe(true);
  expect(screen.getByText("Unavailable")).toBeDefined();
  expect(
    screen.queryByRole("link", { name: "Download English VO Demo" }),
  ).toBeNull();
});
