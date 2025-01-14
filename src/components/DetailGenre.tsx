type DetailGenreProps = {
  genres?: string;
  releaseDate: string;
  duration?: string;
};

export default function DetailGenre({
  releaseDate,
  genres,
  duration,
}: DetailGenreProps) {
  return (
    <p className="text-yellow-300 mt-2 mb-6 text-xs md:text-sm">
      {releaseDate} • {genres} • {duration}
    </p>
  );
}
