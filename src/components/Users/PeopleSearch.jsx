import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarMovie from "../Shows/NavbarMovie";
import { FALLBACK_PEOPLE } from "../../data/mockData";

function PeopleSearch() {
  const [query, setQuery] = useState('');

  const results = FALLBACK_PEOPLE.filter((person) =>
    person.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Search People</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
        />

        {results.length === 0 ? (
          <p className="text-slate-400">No people found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((person) => (
              <Link
                key={person.id}
                to={`/profile/${person.id}`}
                className="flex items-center gap-3 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{person.name}</p>
                  <p className="truncate text-xs text-slate-500">{person.country}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PeopleSearch;
