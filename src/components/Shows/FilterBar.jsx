import React from 'react';

const FilterBar = ({ onFilter, onSort }) => {
  const selectClass =
    "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <div className="flex flex-wrap gap-3">
      <select onChange={(e) => onFilter(e.target.value)} className={selectClass}>
        <option value="">All Genres</option>
        <option value="drama">Drama</option>
        <option value="action">Action</option>
      </select>
      <select onChange={(e) => onSort(e.target.value)} className={selectClass}>
        <option value="year-asc">Year (Ascending)</option>
        <option value="year-desc">Year (Descending)</option>
        <option value="rating-asc">Rating (Ascending)</option>
        <option value="rating-desc">Rating (Descending)</option>
      </select>
    </div>
  );
};

export default FilterBar;
