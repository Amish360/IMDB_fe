import React, { useEffect, useState } from 'react';
import NavbarMovie from '../Shows/NavbarMovie';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getPreferredGenres } from '../../utils/preferences';
import { getBio } from '../../utils/profileExtras';

const FALLBACK_USER = {
  email: 'guest@example.com',
  country: 'USA',
  age: 28,
};

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [genres, setGenres] = useState([]);
  const [bio, setBioState] = useState('');

  useEffect(() => {
    setGenres(getPreferredGenres());
    setBioState(getBio());

    const token = localStorage.getItem('jwtToken');

    if (token) {
      fetch('http://127.0.0.1:8000/api/get_user_profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          toast.error('Could not reach the API — showing sample profile instead.');
          setUser(FALLBACK_USER);
          setUsingFallback(true);
          setLoading(false);
        });
    } else {
      setUser(FALLBACK_USER);
      setUsingFallback(true);
      setLoading(false);
    }
  }, []);

  const optionLinkClass =
    "rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400 hover:text-amber-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">User Profile</h1>

        {usingFallback && (
          <p className="rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-400 ring-1 ring-amber-400/30">
            Showing sample profile data.
          </p>
        )}

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="space-y-4 rounded-2xl bg-slate-900/70 p-6 ring-1 ring-white/10">
            <p className="text-slate-300"><span className="text-slate-500">Email:</span> {user.email}</p>
            <p className="text-slate-300"><span className="text-slate-500">Country:</span> {user.country}</p>
            <p className="text-slate-300"><span className="text-slate-500">Age:</span> {user.age}</p>

            <div>
              <p className="text-slate-500">About</p>
              <p className="mt-1 text-slate-300">
                {bio || <span className="text-slate-500 italic">No bio yet — add one from Edit Profile.</span>}
              </p>
            </div>

            <div>
              <p className="mb-2 text-slate-500">Favorite genres</p>
              {genres.length === 0 ? (
                <p className="text-sm text-slate-500 italic">
                  No preferences set yet.{' '}
                  <Link to="/onboarding" className="text-amber-400 hover:text-amber-300">
                    Tell us what you like
                  </Link>
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm text-slate-500">Account</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/editUser" className={optionLinkClass}>Edit Profile</Link>
            <Link to="/changepassword" className={optionLinkClass}>Change Password</Link>
            <Link to="/followers" className={optionLinkClass}>Followers</Link>
            <Link to="/following" className={optionLinkClass}>Following</Link>
            <Link to="/people" className={optionLinkClass}>Search People</Link>
            <Link to="/onboarding" className={optionLinkClass}>Update Preferences</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
