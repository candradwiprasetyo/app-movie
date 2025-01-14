type BackgroundImageProps = {
  posterPath?: string;
};

export default function BackgroundImage({ posterPath }: BackgroundImageProps) {
  return (
    <div
      className="fixed inset-0 opacity-20"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}
