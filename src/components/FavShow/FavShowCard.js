// TvShowCard.js

import React from 'react';

const FavShowCard = ({ show, isSelected, onCheckboxChange }) => {
  return (
    <div className="tv-show-card">
      <h4>{show.primaryTitle}</h4>
      <p>Start Year: {show.startYear}</p>
      <p>End Year: {show.endYear}</p>
      <p>Type: {show.titleType}</p>
      <p>Is Adult: {show.isAdult ? 'Yes' : 'No'}</p>
      <p>Genres: {show.genres.map((genre) => genre.name).join(', ')}</p>
      
      <label>
      Select:
        <input
          type="checkbox"
          name={show.primaryTitle}
          checked={isSelected}
          onChange={onCheckboxChange}
        />

      </label>
      
    </div>
  );
};

export default FavShowCard;
