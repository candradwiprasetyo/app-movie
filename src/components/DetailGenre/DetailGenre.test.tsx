import { render, screen } from "@testing-library/react";
import DetailGenre from "./";

describe("DetailGenre component", () => {
  const defaultProps = {
    releaseDate: "2025-01-14",
    genres: "Action, Adventure",
    duration: "2h 30m",
  };

  test("Should render releaseDate correctly", () => {
    render(<DetailGenre {...defaultProps} />);
    const detailText = screen.getByText(`2025-01-14`, { exact: false });
    expect(detailText).toBeInTheDocument();
  });

  test("Should render genres correctly", () => {
    render(<DetailGenre {...defaultProps} />);
    const detailText = screen.getByText("Action, Adventure", { exact: false });
    expect(detailText).toBeInTheDocument();
  });

  test("Should render duration correctly", () => {
    render(<DetailGenre {...defaultProps} />);
    const detailText = screen.getByText("2h 30m", { exact: false });
    expect(detailText).toBeInTheDocument();
  });

  test("Should applies correct styles", () => {
    render(<DetailGenre {...defaultProps} />);

    const detailText = screen.getByText(
      `${defaultProps.releaseDate} • ${defaultProps.genres} • ${defaultProps.duration}`
    );

    expect(detailText).toHaveClass(
      "text-yellow-300 mt-2 mb-6 text-xs md:text-sm"
    );
  });
});
