import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PosterPlaceholder from '../common/PosterPlaceholder';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/favorites';

const ShowCard = ({ show }) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(show.tconst));
  }, [show.tconst]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFavorite(show.tconst);
      setFavorited(false);
      toast.success('Removed from favorites');
    } else {
      addFavorite(show);
      setFavorited(true);
      toast.success('Added to favorites');
    }
  };

  return (
    <Link
      to={`/title/${show.tconst}`}
      className="flex flex-col overflow-hidden rounded-xl bg-slate-900/70 shadow-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
    >
      <div className="relative">
        <PosterPlaceholder title={show.primaryTitle} seed={show.tconst} className="aspect-[2/3] w-full" />
        <button
          onClick={handleToggleFavorite}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-lg shadow-md backdrop-blur transition ${
            favorited ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/70 text-amber-400 hover:bg-slate-950'
          }`}
        >
          {favorited ? '★' : '☆'}
        </button>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-lg font-semibold text-white">{show.primaryTitle}</h4>
          <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
            {show.titleType}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          {show.startYear}
          {show.endYear ? ` – ${show.endYear}` : ''}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {show.genres.map((genre) => genre.name).join(', ')}
        </p>
        {show.isAdult ? (
          <span className="mt-3 inline-block w-fit rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
            18+
          </span>
        ) : null}
      </div>
    </Link>
  );
};

export default ShowCard;
