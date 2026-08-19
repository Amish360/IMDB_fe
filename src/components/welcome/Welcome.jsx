import React from "react";
import { Link } from "react-router-dom";

function Welcome() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Welcome to <span className="text-amber-400">IMDB</span> Clone
            </h1>
            <p className="mt-4 max-w-md text-slate-400">
                Discover movies and shows, track your favorites, and build your watchlist.
            </p>
            <div className="mt-8 flex gap-4">
                <Link
                    to="/Signup"
                    className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                >
                    Sign Up
                </Link>
                <Link
                    to="/login"
                    className="rounded-lg border border-slate-600 px-6 py-2.5 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-800"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Welcome