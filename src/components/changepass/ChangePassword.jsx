import React, { useState } from "react";
import toast from "react-hot-toast";
import NavbarMovie from "../Shows/NavbarMovie";

function ChangePassword() {
  const [newpassword, setNewpassword] = useState('');
  const [retypenewpass, setRetypenewpass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newpassword || !retypenewpass) {
      toast.error('Please fill in both fields.');
      return;
    }
    if (newpassword !== retypenewpass) {
      toast.error('Passwords do not match.');
      return;
    }
    toast.success('Password changed successfully!');
    setNewpassword('');
    setRetypenewpass('');
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";
  const labelClass = "mb-1 block text-sm font-medium text-slate-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="rounded-2xl bg-slate-900/80 p-8 shadow-2xl ring-1 ring-white/10">
          <h1 className="mb-6 text-2xl font-bold text-white">Change Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>New Password</label>
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                placeholder="New password"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input
                type="password"
                value={retypenewpass}
                onChange={(e) => setRetypenewpass(e.target.value)}
                placeholder="Confirm new password"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
