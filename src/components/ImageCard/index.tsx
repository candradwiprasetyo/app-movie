import Image from "next/image";

type ImageCardProps = {
  width: number;
  height: number;
  image: string;
  title: string;
};

export default function ImageCard({
  width,
  height,
  image,
  title,
}: ImageCardProps) {
  return (
    <Image
      className="w-full rounded-lg"
      width={width}
      height={height}
      src={`https://image.tmdb.org/t/p/w500${image}`}
      alt={title}
    />
  );
}
