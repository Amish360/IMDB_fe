import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarMovie from '../Shows/NavbarMovie';
import ShowCard from '../Shows/ShowCard';
import { getFavorites } from '../../utils/favorites';

const FavShow = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Favorites</h1>

        {favorites.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/70 p-8 text-center ring-1 ring-white/10">
            <p className="text-slate-300">You haven't favorited any shows yet.</p>
            <p className="mt-1 text-sm text-slate-500">
              Tap the star on any movie or show card to add it here.
            </p>
            <Link
              to="/main"
              className="mt-4 inline-block rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Browse shows
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((show) => (
              <ShowCard key={show.tconst} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavShow;
