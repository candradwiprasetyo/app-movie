import { render } from "@testing-library/react";
import BackgroundImage from "./";

describe("BackgroundImage component", () => {
  test("Should render with background image when posterPath is active", () => {
    const posterPath = "/test-poster.jpg";
    const { container } = render(<BackgroundImage posterPath={posterPath} />);

    const divElement = container.firstChild;

    expect(divElement).toHaveStyle({
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
    });
    expect(divElement).toHaveClass("fixed inset-0 opacity-20");
  });

  test("Should render with default styles when posterPath is not active", () => {
    const { container } = render(<BackgroundImage />);

    const divElement = container.firstChild;

    expect(divElement).toHaveStyle({
      backgroundImage: "url(https://image.tmdb.org/t/p/w500undefined)",
    });
    expect(divElement).toHaveClass("fixed inset-0 opacity-20");
  });
});
