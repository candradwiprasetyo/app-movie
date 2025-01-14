import { render, screen } from "@testing-library/react";
import MainCastCard from "./index";

jest.mock("@/components/ImageCard", () => ({
  __esModule: true,
  default: ({ title, image }: { title: string; image: string }) => (
    <div data-testid="mock-image-card">
      <img src={image} alt={title} />
    </div>
  ),
}));

describe("MainCastCard", () => {
  const mockProps = {
    name: "Candra",
    character: "Hero",
    profilePath: "/path/to/profile.jpg",
  };

  test("renders MainCastCard with given props", () => {
    render(<MainCastCard {...mockProps} />);

    const nameElement = screen.getByTestId("name");
    expect(nameElement).toHaveTextContent("Candra");

    const characterElement = screen.getByTestId("character");
    expect(characterElement).toHaveTextContent("Hero");

    const imageCard = screen.getByTestId("mock-image-card");
    expect(imageCard).toBeInTheDocument();
  });

  test("renders correctly with no character prop", () => {
    const { name, profilePath } = mockProps;
    render(
      <MainCastCard name={name} character={""} profilePath={profilePath} />
    );

    const nameElement = screen.getByTestId("name");
    expect(nameElement).toHaveTextContent(name);

    const characterElement = screen.getByTestId("character");
    expect(characterElement).toHaveTextContent("");

    const imageCard = screen.getByTestId("mock-image-card");
    expect(imageCard).toBeInTheDocument();
  });
});
