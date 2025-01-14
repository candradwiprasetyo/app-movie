import Link from "next/link";
import ImageCard from "@/components/ImageCard";
import BackgroundImage from "@/components/BackgroundImage";
import DetailTitle from "@/components/DetailTitle";
import DetailGenre from "@/components/DetailGenre";
import MainCastCard from "@/components/MainCastCard";
import Vote from "@/components/Vote";
import DetailDescription from "@/components/DetailDescription";
import { MovieDetailParamProps } from "@/types";
import { fetchMovieDetail } from "@/api/movieApi";

const getVote = (vote: number = 0) => {
  let result = (vote * 10).toString();
  result = result.slice(0, 2);
  return result;
};

const formatHours = (totalMinutes: number = 0) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export default async function MovieDetail({ params }: MovieDetailParamProps) {
  const { id } = await params;
  const movie = await fetchMovieDetail(id);
  const genres = movie?.genres.map((obj) => obj.name).join(", ");
  const country = movie?.production_countries.map((obj) => obj.name).join(", ");
  const vote = getVote(movie?.vote_average);
  const duration = formatHours(movie?.runtime || 0);
  const backgroundMovie = movie?.belongs_to_collection?.backdrop_path
    ? movie?.belongs_to_collection?.backdrop_path
    : movie?.poster_path;
  const director =
    movie?.credits?.crew?.find((member) => member.job === "Director") ?? null;
  if (!movie) {
    return <div className="p-4">Film tidak ditemukan</div>;
  }

  return (
    <div className="p-10">
      <BackgroundImage posterPath={backgroundMovie} />
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
            director={director?.name}
          />
          <div className="mb-2">
            <strong>Main Cast</strong>
          </div>
          <div className="flex gap-3 mb-6 flex-wrap justify-between md:justify-start">
            {movie?.credits?.cast?.slice(0, 6).map((cast, index) => (
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
}
