import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { BsSkipEnd } from 'react-icons/bs';
import { BsSkipStart } from 'react-icons/bs';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data.movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);

  const onSubmit = async (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const onClose = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel={<BsSkipEnd />}
          previousLabel={<BsSkipStart />}
        />
      )}
      {isSuccess && data.movies.length > 0 && (
        <MovieGrid onSelect={onSelect} movies={data.movies} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && <MovieModal onClose={onClose} movie={selectedMovie} />}
    </div>
  );
};

export default App;
