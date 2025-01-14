type DetailTitleProps = {
  title?: string;
  releaseDate: string;
};

export default function DetailTitle({ title, releaseDate }: DetailTitleProps) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold">
      {title} <span className="font-normal">({releaseDate.slice(0, 4)}</span>)
    </h1>
  );
}
