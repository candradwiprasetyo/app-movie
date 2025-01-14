import Link from "next/link";
import ImageCard from "@/components/ImageCard";
import Vote from "@/components/Vote";

type MovieCardProps = {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
};

const MovieCard = ({
  id,
  title,
  releaseDate,
  posterPath,
  voteAverage,
}: MovieCardProps) => {
  const getVote = (vote: number) => {
    let result = (vote * 10).toString();
    result = result.slice(0, 2);
    return result;
  };

  const vote = getVote(voteAverage);

  return (
    <Link href={`/movie/${id}`}>
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-gray-900 h-full relative">
        <ImageCard width={200} height={300} title={title} image={posterPath} />
        <div className="p-4 relative">
          <Vote
            value={vote}
            customClass={
              "absolute -top-6 right-4 w-11 h-11 border-[3px] text-sm"
            }
          />
          <h2 className="font-bold text-sm mb-2 text-white mt-3">{title}</h2>
          <p className="text-gray-400 text-sm">{releaseDate?.slice(0, 4)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
