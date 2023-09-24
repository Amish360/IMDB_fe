import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch, onFilter, onSort, onClearFilters,  onClearResults  }) => {

  const [titleType, setTitleType] = useState('');
  const [isAdult, setIsAdult] = useState(undefined);
  const [orderingField, setOrderingField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = () => {
    onFilter({ titleType, isAdult });
  };

  const handleSort = () => {
    onSort(orderingField);
  };

  const handleReset = () => {
    setTitleType('');
    setIsAdult(undefined);
    setOrderingField('');
    onClearFilters();
    setSearchQuery(''); // Clear search query
    onClearResults(); // Trigger the callback to clear search result
    onSearch(''); // Reset the search
  };
  
  return (
    <div>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
      <select value={titleType} onChange={(e) => setTitleType(e.target.value)}>
        <option value="">Select Title Type</option>
        <option value="movie">Movie</option>
        <option value="tvSeries">TV Series</option>
        {/* Add more options as needed */}
      </select>
      <label>
        Adult Content:
        <input
          type="checkbox"
          checked={isAdult}
          onChange={(e) => setIsAdult(e.target.checked)}
        />
      </label>
      <select value={orderingField} onChange={(e) => setOrderingField(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="titleType">Title Type</option>
        <option value="startYear">Start Year</option>
        <option value="endYear">End Year</option>
        {/* Add more sorting options based on your API */}
      </select>
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleSort}>Sort</button>
      <button onClick={handleReset}>Reset</button> {/* Add the Reset button */}
    </div>
  );
};


export default SearchBar;