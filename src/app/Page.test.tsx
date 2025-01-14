import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { fetchMovies } from "@/api/movieApi";

jest.mock("@/api/movieApi", () => ({
  fetchMovies: jest.fn(),
}));

describe("Home Component", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Movie 1",
      release_date: "2023-01-01",
      poster_path: "/path1.jpg",
      vote_average: 85,
    },
    {
      id: 2,
      title: "Movie 2",
      release_date: "2023-01-02",
      poster_path: "/path2.jpg",
      vote_average: 70,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render loading state initially", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce([]);

    render(<Home />);

    expect(screen.getByText("Memuat data...")).toBeInTheDocument();
    await waitFor(() => expect(fetchMovies).toHaveBeenCalled());
  });

  test("should display movies when data is fetched", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });

  test("should handle category change", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<Home />);

    const categoryButton = screen.getByText(/now playing/i);
    fireEvent.click(categoryButton);

    await waitFor(() =>
      expect(fetchMovies).toHaveBeenCalledWith("", 1, "now_playing")
    );
  });
});
