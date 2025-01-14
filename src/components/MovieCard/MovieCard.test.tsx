import { render, screen } from "@testing-library/react";
import MovieCard from "./";

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
      <MovieCard
        id={movie.id}
        title={movie.title}
        releaseDate={movie.releaseDate}
        posterPath={movie.posterPath}
        voteAverage={movie.voteAverage}
      />
    );

    expect(screen.getByText(movie.title)).toBeInTheDocument();

    expect(screen.getByText(movie.releaseDate.slice(0, 4))).toBeInTheDocument();
  });
});
