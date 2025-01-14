type DetailDescriptionProps = {
  tagline: string;
  overview: string;
  status: string;
  country?: string;
  director?: string;
};

export default function DetailDescription({
  tagline,
  overview,
  status,
  country,
  director,
}: DetailDescriptionProps) {
  return (
    <>
      <p className="italic mt-6 text-gray-400 mb-4">{tagline}</p>
      <p className="mb-8">{overview}</p>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3">
        <div className="mb-4">
          <strong>Status</strong> <br></br>
          {status}
        </div>
        <div className="mb-4">
          <strong>Country</strong> <br></br>
          {country}
        </div>
        <div>
          <strong>Director</strong> <br></br>
          {director}
        </div>
      </div>
    </>
  );
}
