"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchMovieDetail } from "@/api/movieApi";
import ImageCard from "@/components/ImageCard";
import BackgroundImage from "@/components/BackgroundImage";
import DetailTitle from "@/components/DetailTitle";
import DetailGenre from "@/components/DetailGenre";
import MainCastCard from "@/components/MainCastCard";
import Vote from "@/components/Vote";
import DetailDescription from "@/components/DetailDescription";
import Link from "next/link";
import {
  MovieDetailProps,
  GenreType,
  CastType,
  ProductionCountriesType,
} from "@/types";

const MovieDetail = () => {
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const movieId = Array.isArray(id) ? id[0] : id;
      const fetchData = async () => {
        const movieData = await fetchMovieDetail(movieId);
        setMovie(movieData);
      };
      fetchData();
    }
  }, [id]);

  if (!movie) {
    return false;
  }

  const genres = movie?.genres.map((obj: GenreType) => obj.name).join(", ");
  const country = movie?.production_countries
    .map((obj: ProductionCountriesType) => obj.name)
    .join(", ");
  const vote = (movie?.vote_average * 10).toString().slice(0, 2);
  const duration = movie?.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "";

  return (
    <div className="p-10">
      <BackgroundImage posterPath={movie?.poster_path} />
      <div className="md:flex absolute inset-0 p-6 md:p-10">
        <div className="md:w-1/4 flex-none relative">
          <ImageCard
            width={360}
            height={540}
            title={movie.title}
            image={movie.poster_path}
          />
        </div>
        <div className="flex-grow md:pl-10 py-6 md:py-0">
          <DetailTitle title={movie.title} releaseDate={movie.release_date} />
          <DetailGenre
            releaseDate={movie.release_date}
            genres={genres}
            duration={duration}
          />
          <Vote value={vote} customClass={"w-16 h-16 border-4 text-2xl"} />
          <DetailDescription
            tagline={movie.tagline}
            overview={movie.overview}
            status={movie.status}
            country={country}
          />
          <div className="mb-2">
            <strong>Main Cast</strong>
          </div>
          <div className="flex gap-3 mb-6 flex-wrap justify-between md:justify-start">
            {movie?.credits?.cast
              ?.slice(0, 6)
              .map((cast: CastType, index: number) => (
                <MainCastCard
                  key={index}
                  name={cast.name}
                  character={cast.character}
                  profilePath={cast.profile_path}
                />
              ))}
          </div>
          <Link href="/">
            <button className="p-3 bg-blue-500 rounded text-white mb-6">
              Kembali
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
