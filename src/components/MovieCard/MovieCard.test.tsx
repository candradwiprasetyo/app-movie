import { render, screen } from "@testing-library/react";
import MovieCard from "./";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("@/components/ImageCard", () => {
  const ImageCard = () => <div data-testid="image-card" />;
  ImageCard.displayName = "ImageCard";
  return ImageCard;
});

jest.mock("@/components/Vote", () => {
  const Vote = ({ value }: { value: string }) => (
    <div data-testid="vote">{value}</div>
  );
  Vote.displayName = "Vote";
  return Vote;
});

describe("MovieCard", () => {
  const movie = {
    id: 1,
    title: "Movie Title",
    releaseDate: "2022-12-12",
    posterPath: "/path/to/poster.jpg",
    voteAverage: 7.5,
  };

  it("renders MovieCard with correct data", () => {
    render(
      <Router>
        <MovieCard
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          posterPath={movie.posterPath}
          voteAverage={movie.voteAverage}
        />
      </Router>
    );

    expect(screen.getByTestId("image-card")).toBeInTheDocument();

    expect(screen.getByTestId("vote")).toHaveTextContent("75");

    expect(screen.getByText(movie.title)).toBeInTheDocument();

    expect(screen.getByText(movie.releaseDate.slice(0, 4))).toBeInTheDocument();
  });

  it("navigates to the correct movie page when clicked", () => {
    render(
      <Router>
        <MovieCard
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          posterPath={movie.posterPath}
          voteAverage={movie.voteAverage}
        />
      </Router>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/movie/${movie.id}`);
  });
});
