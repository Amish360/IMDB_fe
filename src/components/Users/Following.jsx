import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarMovie from "../Shows/NavbarMovie";
import { FALLBACK_PEOPLE } from "../../data/mockData";
import { getFollowing, unfollowUser } from "../../utils/social";

function Following() {
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    setFollowingIds(getFollowing());
  }, []);

  const people = FALLBACK_PEOPLE.filter((p) => followingIds.includes(p.id));

  const handleUnfollow = (person) => {
    unfollowUser(person.id);
    setFollowingIds((prev) => prev.filter((id) => id !== person.id));
    toast.success(`Unfollowed ${person.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Following</h1>
        <p className="text-sm text-slate-400">People you follow.</p>

        {people.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/70 p-8 text-center ring-1 ring-white/10">
            <p className="text-slate-300">You aren't following anyone yet.</p>
            <Link
              to="/followers"
              className="mt-4 inline-block rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Find people to follow
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10"
              >
                <Link to={`/profile/${person.id}`} className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                    {person.name.charAt(0)}
                  </div>
                  <span className="truncate text-sm text-slate-200">{person.name}</span>
                </Link>
                <button
                  onClick={() => handleUnfollow(person)}
                  className="shrink-0 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-red-400 hover:text-red-400"
                >
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Following;
