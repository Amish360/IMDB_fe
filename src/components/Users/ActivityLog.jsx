import React from "react";
import NavbarMovie from "../Shows/NavbarMovie";

const FALLBACK_ACTIVITY = [
  { id: 1, action: 'Added "The Last Horizon" to Wishlist', date: '2026-08-14' },
  { id: 2, action: 'Rated "Midnight Circuit" 4 stars', date: '2026-08-10' },
  { id: 3, action: 'Followed Elena Marsh', date: '2026-08-02' },
];

function ActivityLog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">Activity Log</h1>
        <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl bg-slate-900/70 ring-1 ring-white/10">
          {FALLBACK_ACTIVITY.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-5 py-4">
              <span className="text-slate-200">{item.action}</span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActivityLog;
