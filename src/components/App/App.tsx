import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const onSubmit = async (query: string) => {
    setIsLoading(true);
    setMovies([]);
    setIsError(false);
    try {
      const data = await fetchMovies(query);
      if (!data.length) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const onClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={onSelect} movies={movies} />}
      {isError && <ErrorMessage />}
      {selectedMovie && <MovieModal onClose={onClose} movie={selectedMovie} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
