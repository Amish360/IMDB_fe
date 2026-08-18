import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowList from './ShowList';
import ShowCard from './ShowCard';
import NavbarMovie from './NavbarMovie'
import { getPreferredGenres } from '../../utils/preferences';
import { getRecommendedShows } from '../../data/mockData';

function MainPage() {
  const [recommended, setRecommended] = useState([]);
  const [preferredGenres, setPreferredGenres] = useState([]);

  useEffect(() => {
    const genres = getPreferredGenres();
    setPreferredGenres(genres);
    setRecommended(getRecommendedShows(genres));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-6xl px-6 py-8">
        {recommended.length > 0 && (
          <div className="mb-10">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-extrabold text-white">Recommended for You</h2>
              <p className="text-xs text-slate-500">
                Based on: {preferredGenres.slice(0, 3).join(', ')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((show) => (
                <ShowCard key={show.tconst} show={show} />
              ))}
            </div>
          </div>
        )}

        {preferredGenres.length === 0 && (
          <div className="mb-10 rounded-2xl bg-slate-900/70 p-6 ring-1 ring-white/10">
            <p className="text-slate-300">
              Want personalized picks?{' '}
              <Link to="/onboarding" className="font-medium text-amber-400 hover:text-amber-300">
                Tell us what you like
              </Link>
              .
            </p>
          </div>
        )}

        <h1 className="mb-6 text-3xl font-extrabold text-white">TV Shows</h1>
        <ShowList/>
      </div>
    </div>
  );
}

export default MainPage;
