import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarMovie from "../Shows/NavbarMovie";
import { FALLBACK_PEOPLE } from "../../data/mockData";
import { isFollowing, followUser, unfollowUser } from "../../utils/social";

function Followers() {
  const [followingMap, setFollowingMap] = useState({});

  useEffect(() => {
    const map = {};
    FALLBACK_PEOPLE.forEach((p) => {
      map[p.id] = isFollowing(p.id);
    });
    setFollowingMap(map);
  }, []);

  const handleToggleFollow = (person) => {
    const nowFollowing = !followingMap[person.id];
    if (nowFollowing) {
      followUser(person.id);
      toast.success(`You are now following ${person.name}`);
    } else {
      unfollowUser(person.id);
      toast.success(`Unfollowed ${person.name}`);
    }
    setFollowingMap((prev) => ({ ...prev, [person.id]: nowFollowing }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Followers</h1>
        <p className="text-sm text-slate-400">People who follow you.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FALLBACK_PEOPLE.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10"
            >
              <Link to={`/profile/${follower.id}`} className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                  {follower.name.charAt(0)}
                </div>
                <span className="truncate text-sm text-slate-200">{follower.name}</span>
              </Link>
              <button
                onClick={() => handleToggleFollow(follower)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  followingMap[follower.id]
                    ? 'border border-slate-600 text-slate-300 hover:border-red-400 hover:text-red-400'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                }`}
              >
                {followingMap[follower.id] ? 'Following' : 'Follow Back'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Followers;
