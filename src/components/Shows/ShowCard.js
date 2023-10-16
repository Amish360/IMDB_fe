import React from 'react';

const ShowCard = ({ show }) => {
  return (
    <div className="show-card">
      <h4>{show.primaryTitle}</h4>
      <p>Start Year: {show.startYear}</p>
      <p>End Year: {show.endYear}</p>
      <p>Type: {show.titleType}</p>
      <p>Is Adult: {show.isAdult ? 'Yes' : 'No'}</p>
      <p>Genres: {show.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
};

export default ShowCard;
