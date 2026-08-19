import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ShowCard from './ShowCard';

const FALLBACK_SHOWS = [
  {
    tconst: 'fallback-1',
    primaryTitle: 'The Last Horizon',
    startYear: 2021,
    endYear: null,
    titleType: 'movie',
    isAdult: false,
    genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }],
  },
  {
    tconst: 'fallback-2',
    primaryTitle: 'Midnight Circuit',
    startYear: 2019,
    endYear: 2023,
    titleType: 'tvSeries',
    isAdult: false,
    genres: [{ name: 'Thriller' }, { name: 'Drama' }],
  },
  {
    tconst: 'fallback-3',
    primaryTitle: 'Paper Moons',
    startYear: 2022,
    endYear: null,
    titleType: 'movie',
    isAdult: false,
    genres: [{ name: 'Romance' }, { name: 'Comedy' }],
  },
  {
    tconst: 'fallback-4',
    primaryTitle: 'Iron Harbor',
    startYear: 2018,
    endYear: 2020,
    titleType: 'tvSeries',
    isAdult: true,
    genres: [{ name: 'Crime' }, { name: 'Action' }],
  },
];

const ShowList = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [titleType, setTitleType] = useState('');
  const [isAdult, setIsAdult] = useState(undefined);
  const [orderingField, setOrderingField] = useState('');

  const getApiUrl = () => {
    let apiUrl = `http://127.0.0.1:8000/shows/api/titles/?page=${page}`;

    if (searchTerm) {
      apiUrl = `http://127.0.0.1:8000/shows/api/search_movies/?search=${searchTerm}&page=${page}`;
    }else {
      // Use your default API URL here
      apiUrl = `http://127.0.0.1:8000/shows/api/titles/?page=${page}`;
    }


    if (titleType || isAdult !== undefined) {
      apiUrl = `http://127.0.0.1:8000/shows/api/titles/?page=${page}`;
      const filterParams = [];

      if (titleType) {
        filterParams.push(`titleType=${titleType}`);
      }
      if (isAdult !== undefined) {
        filterParams.push(`isAdult=${isAdult}`);
      }

      apiUrl += `&${filterParams.join('&')}`;
    }

    if (orderingField) {
      apiUrl += `&ordering=${orderingField}`;
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
      setError('Could not reach the API — showing sample data instead.');
      setResults(FALLBACK_SHOWS);
      setTotalPages(1);
      setUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm, titleType, isAdult, orderingField]);


  const clearSearchResults = () => {
    setSearchTerm('');
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchClick = () => {
    setPage(1); // Reset page to 1 when searching
    setSearchTerm(searchQuery);
  };

  const handleClearFilters = () => {
    setTitleType('');
    setIsAdult(undefined);
    setOrderingField('');
  };

  const handleFilter = ({ titleType, isAdult }) => {
    setPage(1); // Reset page to 1 when applying filters
    setTitleType(titleType);
    setIsAdult(isAdult);
  };

  const handleSort = (field) => {
    setPage(1); // Reset page to 1 when sorting
    setOrderingField(field);
  };

  const handleIncrementPage = () => {
    handlePageChange(page + 1);
  };

  const handleDecrementPage = () => {
    handlePageChange(page - 1);
  };



  return (
    <div className="space-y-6">
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(value) => setSearchQuery(value)}
        onFilter={handleFilter}
        onSort={handleSort}
        onClearFilters={handleClearFilters}
        onClearResults={clearSearchResults}
      />
      <button
        onClick={handleSearchClick}
        className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
      >
        Search
      </button>

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
              {results.map((show) => (
                <ShowCard key={show.tconst} show={show} />
              ))}
            </div>
          </div>
          {!usingFallback && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </p>
              <ul className="flex flex-wrap items-center gap-2">
                <li>
                  <button
                    onClick={handleDecrementPage}
                    disabled={page === 1}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
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
                    disabled={page === totalPages}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowList;
