// FilterBar.js
import React from 'react';

const FilterBar = ({ onFilter, onSort }) => {
  return (
    <div className="filter-bar">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Genres</option>
        <option value="drama">Drama</option>
        <option value="action">Action</option>
      </select>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="year-asc">Year (Ascending)</option>
        <option value="year-desc">Year (Descending)</option>
        <option value="rating-asc">Rating (Ascending)</option>
        <option value="rating-desc">Rating (Descending)</option>
      </select>
    </div>
  );
};

export default FilterBar;
