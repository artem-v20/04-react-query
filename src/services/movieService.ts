import axios from 'axios';
import type { Movie } from '../types/movie';

const BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<TMDBResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: { query },
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    }
  );
  return data.results;
};
