export type CategoryType = "now_playing" | "popular" | "top_rated" | "upcoming";

export type CastType = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type ProductionCountriesType = {
  id: number;
  name: string;
};

export type BelongsToCollectionType = {
  backdrop_path: string;
  id: number;
  name: string;
};

export type MovieDetailParamProps = {
  params: {
    id: string;
  };
};

export type MovieDetailProps = {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  status: string;
  tagline: string;
  genres: GenreType[];
  production_countries: ProductionCountriesType[];
  runtime?: number;
  vote_average: number;
  belongs_to_collection?: BelongsToCollectionType | null;
  credits?: {
    crew: { id: number; name: string; job: string }[];
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
  };
};

export type MovieType = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
};
