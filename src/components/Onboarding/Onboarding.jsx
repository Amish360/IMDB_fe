import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PosterPlaceholder from '../common/PosterPlaceholder';
import { ONBOARDING_MOVIES } from '../../data/mockData';
import { setPreferredGenres, deriveGenresFromSelection } from '../../utils/preferences';

function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleSelect = (show) => {
    setSelected((prev) =>
      prev.some((s) => s.tconst === show.tconst)
        ? prev.filter((s) => s.tconst !== show.tconst)
        : [...prev, show]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      toast.error('Pick at least one title to personalize your homepage.');
      return;
    }
    const genres = deriveGenresFromSelection(selected);
    setPreferredGenres(genres);
    toast.success(`Nice! We'll recommend more ${genres[0]} picks for you.`);
    navigate('/main');
  };

  const handleSkip = () => {
    setPreferredGenres([]);
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">What do you like to watch?</h1>
          <p className="mt-2 text-slate-400">
            Pick a few titles you enjoy — we'll use them to recommend movies and shows on your home page.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ONBOARDING_MOVIES.map((show) => {
            const isSelected = selected.some((s) => s.tconst === show.tconst);
            return (
              <button
                key={show.tconst}
                type="button"
                onClick={() => toggleSelect(show)}
                className={`flex flex-col overflow-hidden rounded-xl text-left ring-1 transition ${
                  isSelected
                    ? 'ring-2 ring-amber-400'
                    : 'ring-white/10 hover:-translate-y-1 hover:ring-amber-400/40'
                }`}
              >
                <div className="relative">
                  <PosterPlaceholder title={show.primaryTitle} seed={show.tconst} className="aspect-[2/3] w-full" />
                  {isSelected && (
                    <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-md">
                      ✓
                    </div>
                  )}
                </div>
                <div className="bg-slate-900/70 p-3">
                  <p className="truncate text-sm font-medium text-white">{show.primaryTitle}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {show.genres.map((g) => g.name).join(', ')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleContinue}
            className="rounded-lg bg-amber-500 px-8 py-2.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
          >
            Continue ({selected.length} selected)
          </button>
          <button
            onClick={handleSkip}
            className="rounded-lg border border-slate-600 px-6 py-2.5 font-medium text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
