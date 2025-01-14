import { render, screen } from "@testing-library/react";
import DetailTitle from "./";

describe("DetailTitle component", () => {
  const defaultProps = {
    title: "Filmku",
    releaseDate: "2025-07-16",
  };

  test("Should render title correctly", () => {
    render(<DetailTitle {...defaultProps} />);

    const titleElement = screen.getByText("Filmku", { exact: false });
    expect(titleElement).toBeInTheDocument();
  });

  test("Should render title and release year correctly", () => {
    render(<DetailTitle {...defaultProps} />);

    const titleElement = screen.getByText("(2025)", { exact: false });
    expect(titleElement).toBeInTheDocument();
  });

  test("Should handle missing title", () => {
    render(<DetailTitle releaseDate={defaultProps.releaseDate} />);

    const titleElement = screen.queryByText("Filmku", { exact: false });
    expect(titleElement).not.toBeInTheDocument();
  });

  test("Should show correct styles of content", () => {
    render(<DetailTitle {...defaultProps} />);

    const titleElement = screen.getByText("Filmku", { exact: false });

    expect(titleElement).toHaveClass("text-2xl md:text-3xl font-bold");
  });
});
