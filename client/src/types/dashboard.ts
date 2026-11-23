export interface Track {
  id: string;
  name: string;
  artist: string;
  primaryGenre: string;
  popularity: number;
  streams: number;
  releaseDate: string;
}

export interface FilterState {
  genre: string;
  year: string;
}