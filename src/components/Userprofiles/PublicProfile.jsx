import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import NavbarMovie from '../Shows/NavbarMovie';
import { getFallbackPerson, FALLBACK_PEOPLE } from '../../data/mockData';
import { isFollowing, followUser, unfollowUser } from '../../utils/social';

function PublicProfile() {
  const { id } = useParams();
  const person = getFallbackPerson(id);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(isFollowing(person.id));
  }, [person.id]);

  const handleToggleFollow = () => {
    if (following) {
      unfollowUser(person.id);
      setFollowing(false);
      toast.success(`Unfollowed ${person.name}`);
    } else {
      followUser(person.id);
      setFollowing(true);
      toast.success(`You are now following ${person.name}`);
    }
  };

  const suggestedPeople = FALLBACK_PEOPLE.filter((p) => p.id !== person.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
        <div className="rounded-2xl bg-slate-900/70 p-6 ring-1 ring-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-2xl font-semibold text-amber-400">
                {person.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{person.name}</h1>
                <p className="text-sm text-slate-400">{person.country} • Age {person.age}</p>
              </div>
            </div>
            <button
              onClick={handleToggleFollow}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                following
                  ? 'border border-slate-600 text-slate-200 hover:border-red-400 hover:text-red-400'
                  : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400'
              }`}
            >
              {following ? 'Unfollow' : 'Follow'}
            </button>
          </div>
          <p className="mt-4 text-slate-300">{person.bio}</p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">People {person.name.split(' ')[0]} follows</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {suggestedPeople.map((p) => (
              <Link
                key={p.id}
                to={`/profile/${p.id}`}
                className="flex items-center gap-3 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                  {p.name.charAt(0)}
                </div>
                <span className="truncate text-sm text-slate-200">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
