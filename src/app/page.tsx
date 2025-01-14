"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import LoadMoreData from "@/components/LoadMoreData";
import DataNotFound from "@/components/DataNotFound";
import LoadingData from "@/components/LoadingData";
import BackgroundImage from "@/components/BackgroundImage";
import SearchData from "@/components/SearchData";
import CategoryData from "@/components/CategoryData";
import { CategoryType } from "@/types";
import { fetchMovies } from "@/api/movieApi";
import { MovieType } from "@/types";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<CategoryType>("now_playing");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: CategoryType) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      setPage(1);
      setSearchQuery("");
    }
  };

  const deleteSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      if (page === 1) setIsReloading(true);

      const fetchedMovies = await fetchMovies(
        debouncedSearchQuery,
        page,
        category
      );

      setMovies((prevMovies) =>
        page === 1 ? fetchedMovies : [...prevMovies, ...fetchedMovies]
      );
      setIsLoading(false);
      setIsReloading(false);
      if (!isInitialLoadComplete) setIsInitialLoadComplete(true);
    };

    loadMovies();
  }, [page, debouncedSearchQuery, category, isInitialLoadComplete]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundMovie = movies[10]?.poster_path;

  return (
    <>
      <BackgroundImage posterPath={backgroundMovie} />
      <div className="container mx-auto max-w-7xl absolute left-0 right-0 py-2 md:py-5">
        <SearchData
          handleSearchKeyword={handleSearchKeyword}
          searchQuery={searchQuery}
          deleteSearchQuery={deleteSearchQuery}
        />
        <CategoryData
          handleCategoryChange={handleCategoryChange}
          category={category}
        />

        {isReloading || !isInitialLoadComplete ? (
          <LoadingData />
        ) : movies.length === 0 ? (
          <DataNotFound />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${page}-${movie.id}-${index}`}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            ))}
          </div>
        )}

        <LoadMoreData isLoading={isLoading} isReloading={isReloading} />
      </div>
    </>
  );
}
