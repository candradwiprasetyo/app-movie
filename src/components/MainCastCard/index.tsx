import ImageCard from "@/components/ImageCard";

type MainCastCardProps = {
  name: string;
  character: string;
  profilePath: string;
};

export default function MainCastCard({
  name,
  character,
  profilePath,
}: MainCastCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900 w-28">
      <ImageCard width={100} height={160} title={name} image={profilePath} />
      <div className="p-2 relative">
        <div className="font-bold text-xs mb-2 text-white" data-testid="name">
          {name}
        </div>
        <p className="text-gray-400 text-xs" data-testid="character">
          {character}
        </p>
      </div>
    </div>
  );
}
