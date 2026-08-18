import React from 'react';
import { Link } from 'react-router-dom';

const ActorCard = ({ actor }) => {
  return (
    <Link
      to={`/actor/${actor.nconst}`}
      className="flex flex-col rounded-xl bg-slate-900/70 p-4 shadow-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
    >
      <h4 className="text-lg font-semibold text-white">{actor.primaryName}</h4>
      <p className="mt-1 text-sm text-slate-400">
        {actor.birthYear || 'Unknown'}
        {actor.deathYear ? ` – ${actor.deathYear}` : ''}
      </p>
      <p className="mt-2 text-xs text-slate-500">{actor.primaryProfession}</p>
    </Link>
  );
};

export default ActorCard;
