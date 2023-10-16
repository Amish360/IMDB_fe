import React from 'react';

const ActorCard = ({ actor }) => {
  return (
    <div className="actor-card">
      <h4>{actor.primaryName}</h4>
      <p>Birth Year: {actor.birthYear}</p>
      <p>Death Year: {actor.deathYear}</p>
      <p>Primary Profession: {actor.primaryProfession}</p>
    </div>
  );
};

export default ActorCard;
