import axios from 'axios';
import type { Movie } from '../types/movie';

const BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<{ movies: Movie[]; totalPages: number }> => {
  const { data } = await axios.get<TMDBResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: { query, page },
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    }
  );
  return {
    movies: data.results,
    totalPages: data.total_pages,
  };
};
