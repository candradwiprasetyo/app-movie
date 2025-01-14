import { render, screen, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import { fetchMovieDetail } from "@/api/movieApi";
import MovieDetail from "./page";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/api/movieApi", () => ({
  fetchMovieDetail: jest.fn(),
}));

describe("MovieDetail component", () => {
  const mockMovieData = {
    title: "Inception",
    poster_path: "/inception.jpg",
    release_date: "2010-07-16",
    genres: [{ name: "Action" }, { name: "Sci-Fi" }],
    production_countries: [{ name: "USA" }],
    vote_average: 8.8,
    runtime: 148,
    tagline: "Ini adalah tagline",
    overview: "Ini adalah overview",
    status: "Released",
    credits: {
      cast: [
        {
          name: "Candra",
          character: "Dwi",
          profile_path: "/leo.jpg",
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render nothing when movie data is not available", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (fetchMovieDetail as jest.Mock).mockResolvedValue(null);

    const { container } = render(<MovieDetail />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  test("Should render movie details correctly when data is available", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (fetchMovieDetail as jest.Mock).mockResolvedValue(mockMovieData);

    render(<MovieDetail />);

    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(
        screen.getByText("2010-07-16 • Action, Sci-Fi • 2h 28m")
      ).toBeInTheDocument();
      expect(screen.getByText("Ini adalah tagline")).toBeInTheDocument();
      expect(screen.getByText("Ini adalah overview")).toBeInTheDocument();
      expect(screen.getByText("Main Cast")).toBeInTheDocument();
      expect(screen.getByText("Candra"));
      expect(screen.getByText("Dwi"));
    });
  });

  test("Should call fetchMovieDetail with the correct ID", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (fetchMovieDetail as jest.Mock).mockResolvedValue(mockMovieData);

    render(<MovieDetail />);

    await waitFor(() => {
      expect(fetchMovieDetail).toHaveBeenCalledWith("123");
      expect(fetchMovieDetail).toHaveBeenCalledTimes(1);
    });
  });

  test("Should render handle array id format correctly", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: ["123"] });
    (fetchMovieDetail as jest.Mock).mockResolvedValue(mockMovieData);

    render(<MovieDetail />);

    await waitFor(() => {
      expect(fetchMovieDetail).toHaveBeenCalledWith("123");
    });
  });
});
