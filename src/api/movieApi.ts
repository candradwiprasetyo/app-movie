import { CategoryType, MovieType, MovieDetailProps } from "@/types";

export const fetchMovies = async (
  query: string = "",
  page: number = 1,
  category: CategoryType = "now_playing"
): Promise<MovieType[]> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  let url = `${baseUrl}/movie/${category}?api_key=${apiKey}&page=${page}`;

  if (query) {
    url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Terjadi kesalahan ketika mengambil data:", error);
    return [];
  }
};

export async function fetchMovieDetail(
  id: string
): Promise<MovieDetailProps | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits`
    );

    if (!res.ok) {
      throw new Error("Gagal mengambil data detail");
    }
    return res.json();
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return null;
  }
}
