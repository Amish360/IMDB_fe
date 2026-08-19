import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NavbarMovie() {

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      toast.success("You have been logged out successfully.");
      localStorage.removeItem('jwtToken')
      navigate('/login')
    }
  };

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 px-6 py-4 shadow-md ring-1 ring-white/10">
      <div className="flex flex-wrap items-center gap-2">
        <NavLink to="/main" className={linkClass}>Home</NavLink>
        <NavLink to="/Actors" className={linkClass}>Actors</NavLink>
        <NavLink to="/wishlist" className={linkClass}>Wishlist</NavLink>
        <NavLink to="/Fav" className={linkClass}>Favorites</NavLink>
        <NavLink to="/people" className={linkClass}>Search People</NavLink>
        <NavLink to="/userDetails" className={linkClass}>Profile</NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400 hover:text-red-400"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavbarMovie;
