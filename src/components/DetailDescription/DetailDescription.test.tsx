import { render, screen } from "@testing-library/react";
import DetailDescription from "./";

describe("DetailDescription component", () => {
  const defaultProps = {
    tagline: "Ini adalah tagline",
    overview: "Ini adalah overview",
    status: "Released",
    country: "INA",
    director: "Candra",
  };

  test("Should render tagline with correct styles", () => {
    render(<DetailDescription {...defaultProps} />);
    const taglineElement = screen.getByText("Ini adalah tagline");
    expect(taglineElement).toBeInTheDocument();
    expect(taglineElement).toHaveClass("italic mt-6 text-gray-400 mb-4");
  });

  test("Should renders overview correctly", () => {
    render(<DetailDescription {...defaultProps} />);
    const overviewElement = screen.getByText("Ini adalah overview");
    expect(overviewElement).toBeInTheDocument();
    expect(overviewElement).toHaveClass("mb-8");
  });

  test("Should render status correctly", () => {
    render(<DetailDescription {...defaultProps} />);
    const statusElement = screen.getByText("Released");
    expect(statusElement).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("Should render country correctly", () => {
    render(<DetailDescription {...defaultProps} />);
    const countryElement = screen.getByText("INA");
    expect(countryElement).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
  });

  test("Should render director correctly", () => {
    render(<DetailDescription {...defaultProps} />);
    const directorElement = screen.getByText("Candra");
    expect(directorElement).toBeInTheDocument();
    expect(screen.getByText("Director")).toBeInTheDocument();
  });
});
