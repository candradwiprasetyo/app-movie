import { render, screen } from "@testing-library/react";
import Vote from "./";

describe("Vote component", () => {
  test("Should render the value and percentage", () => {
    render(<Vote value="85" />);
    const valueElement = screen.getByText("85");
    expect(valueElement).toBeInTheDocument();
    const percentageElement = screen.getByText("%");
    expect(percentageElement).toBeInTheDocument();
  });

  test("Should render with custom class", () => {
    render(<Vote value="90" customClass="text-red-500" />);
    const voteElement = screen.getByText("90");
    expect(voteElement).toHaveClass("text-red-500");
  });

  test("Should render with default class", () => {
    render(<Vote value="75" />);
    const voteElement = screen.getByText("75");
    expect(voteElement).toHaveClass("border-green-500");
    expect(voteElement).toHaveClass("bg-[#081C22]");
  });
});
