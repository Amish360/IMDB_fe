import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ShowCard from './ShowCard';

const ShowList = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
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
    <div>
      <h2>List of Shows</h2>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(value) => setSearchQuery(value)}
        onFilter={handleFilter}
        onSort={handleSort}
        onClearFilters={handleClearFilters}
        onClearResults={clearSearchResults}
      />
      <button onClick={handleSearchClick}>Search</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div>
            <h3>Results:</h3>
            <div className="show-card-container">
              {results.map((show) => (
                <ShowCard key={show.tconst} show={show} />
              ))}
            </div>
          </div>
          <div>
            <p>
              Page {page} of {totalPages}
            </p>
            <ul className="pagination">
              <li>
                <button onClick={handleDecrementPage} disabled={page === 1}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={index + 1 === page ? 'active' : ''}>
                  <button onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleIncrementPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowList;
