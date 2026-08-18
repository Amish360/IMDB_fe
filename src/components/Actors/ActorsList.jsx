import React, { useState, useEffect } from 'react';
import SearchBarActors from './SearchBarActors';
import ActorCard from './ActorCard';
import NavbarMovie from '../Shows/NavbarMovie';

const FALLBACK_ACTORS = [
  { nconst: 'fallback-1', primaryName: 'Elena Marsh', birthYear: 1985, deathYear: null, primaryProfession: 'actress, producer' },
  { nconst: 'fallback-2', primaryName: 'Daniel Cho', birthYear: 1978, deathYear: null, primaryProfession: 'actor, director' },
  { nconst: 'fallback-3', primaryName: 'Priya Nair', birthYear: 1990, deathYear: null, primaryProfession: 'actress' },
  { nconst: 'fallback-4', primaryName: 'Marcus Webb', birthYear: 1965, deathYear: 2021, primaryProfession: 'actor, writer' },
];

const ActorList = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getApiUrl = () => {
    let apiUrl = `http://127.0.0.1:8000/shows/api/names/?page=${page}`;

    if (searchTerm) {
      apiUrl = `http://127.0.0.1:8000/shows/api/search_names/?search=${searchTerm}`;
    }

    return apiUrl;
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = getApiUrl();

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.results);
      setTotalPages(data.totalPages);
      setUsingFallback(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Could not reach the API — showing sample actors instead.');
      setResults(FALLBACK_ACTORS);
      setTotalPages(1);
      setUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchTerm('');
    }
  }, [searchQuery]);

  const handleSearchClick = () => {
    setSearchTerm(searchQuery);
  };

  const handleIncrementPage = () => {
    handlePageChange(page + 1);
  };

  const handleDecrementPage = () => {
    handlePageChange(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Actors &amp; Actresses</h1>

        <div className="flex flex-wrap items-center gap-3">
          <SearchBarActors onSearch={(value) => setSearchQuery(value)} />
          <button
            onClick={handleSearchClick}
            className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-400 ring-1 ring-amber-400/30">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                {usingFallback ? 'Sample Results' : 'Results'}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((actor) => (
                  <ActorCard key={actor.nconst} actor={actor} />
                ))}
              </div>
            </div>
            {!usingFallback && (
              <ul className="flex flex-wrap items-center gap-2">
                <li>
                  <button
                    onClick={handleDecrementPage}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`rounded-lg px-3 py-1.5 text-sm transition ${
                        index + 1 === page
                          ? 'bg-amber-500 text-slate-950 font-semibold'
                          : 'border border-slate-600 text-slate-200 hover:border-amber-400 hover:text-amber-400'
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleIncrementPage}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
                  >
                    Next
                  </button>
                </li>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActorList;
