import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { YouTubeEmbed } from ".";

test("shows the thumbnail first and loads the privacy-enhanced player on click", () => {
  render(<YouTubeEmbed videoId="Z4ZE1gOybHI" title="Acting Reel" />);
  expect(
    screen.getByRole("img", { name: "Acting Reel" }).getAttribute("src"),
  ).toContain("Z4ZE1gOybHI");
  expect(document.querySelector("iframe")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Play Acting Reel" }));
  expect(screen.getByTitle("Acting Reel").getAttribute("src")).toBe(
    "https://www.youtube-nocookie.com/embed/Z4ZE1gOybHI?autoplay=1",
  );
  expect(screen.queryByRole("button", { name: "Play Acting Reel" })).toBeNull();
});

test("falls back to the smaller thumbnail if the large one fails", () => {
  render(<YouTubeEmbed videoId="Z4ZE1gOybHI" title="Acting Reel" />);
  fireEvent.error(screen.getByRole("img", { name: "Acting Reel" }));
  expect(
    screen.getByRole("img", { name: "Acting Reel" }).getAttribute("src"),
  ).toContain("hqdefault");
});
