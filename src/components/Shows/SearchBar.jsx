import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch, onFilter, onSort, onClearFilters, onClearResults }) => {

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
    setSearchQuery('');
    onClearResults();
    onSearch('');
  };

  const selectClass =
    "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";
  const buttonClass =
    "rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400 hover:text-amber-400";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/10">
      <input
        type="text"
        placeholder="Search titles..."
        value={searchQuery}
        onChange={handleSearch}
        className="min-w-[200px] flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
      />
      <select value={titleType} onChange={(e) => setTitleType(e.target.value)} className={selectClass}>
        <option value="">Select Title Type</option>
        <option value="movie">Movie</option>
        <option value="tvSeries">TV Series</option>
      </select>
      <label className="flex items-center gap-2 text-sm text-slate-300">
        Adult Content
        <input
          type="checkbox"
          checked={!!isAdult}
          onChange={(e) => setIsAdult(e.target.checked)}
          className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-amber-500"
        />
      </label>
      <select value={orderingField} onChange={(e) => setOrderingField(e.target.value)} className={selectClass}>
        <option value="">Sort by...</option>
        <option value="titleType">Title Type</option>
        <option value="startYear">Start Year</option>
        <option value="endYear">End Year</option>
      </select>
      <button onClick={handleFilter} className={buttonClass}>Filter</button>
      <button onClick={handleSort} className={buttonClass}>Sort</button>
      <button onClick={handleReset} className={buttonClass}>Reset</button>
    </div>
  );
};


export default SearchBar;
