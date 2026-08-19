import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NavbarMovie from '../Shows/NavbarMovie';
import ShowCard from '../Shows/ShowCard';
import { getFallbackActor, FALLBACK_FILMOGRAPHY } from '../../data/mockData';

function CastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [filmography, setFilmography] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/shows/api/names/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (cancelled) return;
        setActor(data);
        setFilmography(data.filmography || FALLBACK_FILMOGRAPHY);
        setUsingFallback(false);
      } catch (error) {
        console.error('Error fetching actor details:', error);
        if (cancelled) return;
        setActor(getFallbackActor(id));
        setFilmography(FALLBACK_FILMOGRAPHY);
        setUsingFallback(true);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id]);

  const navigateToHome = () => {
    navigate('/main');
  };

  if (!actor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <NavbarMovie />
        <p className="px-6 py-8 text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <button
          onClick={navigateToHome}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
        >
          ← Go back
        </button>

        {usingFallback && (
          <p className="rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-400 ring-1 ring-amber-400/30">
            Could not reach the API — showing sample data instead.
          </p>
        )}

        <div className="rounded-2xl bg-slate-900/70 p-6 ring-1 ring-white/10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-2xl font-semibold text-amber-400">
              {actor.primaryName.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{actor.primaryName}</h1>
              <p className="mt-1 text-sm text-slate-400">
                {actor.birthYear || 'Unknown'}
                {actor.deathYear ? ` – ${actor.deathYear}` : ''}
              </p>
              <p className="mt-1 text-xs text-slate-500">{actor.primaryProfession}</p>
            </div>
          </div>

          {actor.bio && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Biography</h2>
              <p className="mt-2 text-slate-300">{actor.bio}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Filmography</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filmography.map((show) => (
              <ShowCard key={show.tconst} show={show} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastDetails;
