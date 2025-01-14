import { render, screen } from "@testing-library/react";
import DataNotFound from "./";

describe("DataNotFound component", () => {
  test("Should render the correct message", () => {
    render(<DataNotFound />);
    const messageElement = screen.getByText(
      "Film yang Anda cari tidak ditemukan"
    );
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("text-xl text-gray-500");
  });

  test("Should show the correct container styles", () => {
    const { container } = render(<DataNotFound />);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass("flex items-center justify-center h-64");
  });
});
