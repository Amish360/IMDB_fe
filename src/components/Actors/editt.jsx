import React, { useState, useEffect } from 'react';
import SearchBar from '../LIst/SearchBar';
import ShowCard from '../LIst/ShowCard';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');  
    
  const getApiUrl = () => {
    let apiUrl = `http://127.0.0.1:8000/shows/api/titles/?page=${page}`;
    
    // If a search term is present, add it to the API URL
    if (searchTerm) {
      apiUrl = `http://127.0.0.1:8000/shows/api/search_movies/?search=${searchTerm}`;
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
      setShows(data.shows);
      setTotalPages(data.totalPages);
      setOriginalOrder([...data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm]); // Include page and searchTerm as dependencies

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData()
  };

  useEffect(() => {
    // Check if the search query is empty
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
    <div>
      <h2>List of Shows</h2>
      <SearchBar
        onSearch={(value) => setSearchQuery(value)}
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
              {filteredShows.map((show) => (
                <ShowCard key={show.tconst} show={show} />
              ))}
            </div>
          </div>
          <div>
            <ul className="pagination">
              <li>
                <button onClick={handleDecrementPage}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={index + 1 === page ? 'active' : ''}>
                  <button onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li>
                <button onClick={handleIncrementPage}>Next</button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowList;