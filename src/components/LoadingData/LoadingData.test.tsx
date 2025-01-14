import { render, screen } from "@testing-library/react";
import LoadingData from "./";

describe("LoadingData component", () => {
  test("Should render loading message correctly", () => {
    render(<LoadingData />);
    const loadingMessage = screen.getByText("Memuat data...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("Should show correct container styles", () => {
    const { container } = render(<LoadingData />);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass(
      "flex items-center justify-center w-full h-16"
    );
  });
});
