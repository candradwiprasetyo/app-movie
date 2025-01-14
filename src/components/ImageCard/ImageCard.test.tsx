import { render, screen } from "@testing-library/react";
import ImageCard from "./";

describe("ImageCard component", () => {
  const defaultProps = {
    width: 300,
    height: 450,
    image: "/test-image.jpg",
    title: "Test Image",
  };

  test("Should render image with correct attributes", () => {
    render(<ImageCard {...defaultProps} />);

    const imgElement = screen.getByAltText("Test Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("width", "300");
    expect(imgElement).toHaveAttribute("height", "450");
  });

  test("Should show correct class names", () => {
    render(<ImageCard {...defaultProps} />);

    const imgElement = screen.getByAltText("Test Image");

    expect(imgElement).toHaveClass("w-full rounded-lg");
  });

  test("Should handle missing image properly", () => {
    const { container } = render(
      <ImageCard width={300} height={450} image="" title="No Image" />
    );

    const imgElement = screen.getByAltText("No Image");

    expect(imgElement).toBeInTheDocument();
    expect(container).not.toHaveTextContent("undefined");
  });
});
