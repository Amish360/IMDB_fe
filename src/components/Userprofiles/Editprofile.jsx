import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NavbarMovie from '../Shows/NavbarMovie';
import { getBio, setBio } from '../../utils/profileExtras';

const FALLBACK_PROFILE = { country: 'USA', age: 28 };

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ country: '', age: '' });
  const [bio, setBioInput] = useState('');

  useEffect(() => {
    setBioInput(getBio());

    fetch('http://127.0.0.1:8000/api/get_user_profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFormData({ country: data.country, age: data.age }))
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        toast.error('Could not reach the API — showing sample profile instead.');
        setFormData(FALLBACK_PROFILE);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setBio(bio);

    fetch('http://127.0.0.1:8000/api/update_user_profile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 204) {
          toast.success('Profile updated successfully');
        } else {
          toast.success('Bio saved. Other profile fields could not be updated on the server.');
        }
        navigate('/userDetails');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        toast.success('Bio saved locally. Could not reach the server for the rest.');
        navigate('/userDetails');
      });
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";
  const labelClass = "mb-1 block text-sm font-medium text-slate-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="rounded-2xl bg-slate-900/80 p-8 shadow-2xl ring-1 ring-white/10">
          <h1 className="mb-6 text-2xl font-bold text-white">Edit Profile</h1>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className={labelClass}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBioInput(e.target.value)}
                rows={3}
                placeholder="Tell people a bit about yourself..."
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
