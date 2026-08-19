import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import NavbarMovie from '../Shows/NavbarMovie';
import PosterPlaceholder from '../common/PosterPlaceholder';
import { getFallbackMovie, FALLBACK_CAST, FALLBACK_REVIEWS, getNetworkActivityForTitle } from '../../data/mockData';
import { isInWishlist, addToWishlist, removeFromWishlist } from '../../utils/wishlist';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/favorites';
import { getReviews, addReview } from '../../utils/reviews';
import { isFollowing } from '../../utils/social';

function StarRating({ rating }) {
  return (
    <span className="text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      <span className="text-slate-600">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment.');
      return;
    }
    onSubmit({
      id: Date.now(),
      author: author.trim() || 'You',
      rating,
      date: new Date().toISOString().slice(0, 10),
      comment: comment.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-300">Your rating</p>
        <div className="flex gap-1 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`transition ${
                star <= (hoverRating || rating) ? 'text-amber-400' : 'text-slate-600'
              }`}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Name (optional)</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="You"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-600 px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [networkActivity, setNetworkActivity] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/shows/api/titles/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (cancelled) return;
        setMovie(data);
        setReviews([...getReviews(id), ...(data.reviews || FALLBACK_REVIEWS)]);
        setCast(data.cast || FALLBACK_CAST);
        setUsingFallback(false);
      } catch (error) {
        console.error('Error fetching title details:', error);
        if (cancelled) return;
        setMovie(getFallbackMovie(id));
        setCast(FALLBACK_CAST);
        setReviews([...getReviews(id), ...FALLBACK_REVIEWS]);
        setUsingFallback(true);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    setInWishlist(isInWishlist(id));
    setFavorited(isFavorite(id));
    const activity = getNetworkActivityForTitle(id).map((entry) => ({
      ...entry,
      relationship: isFollowing(entry.person.id) ? 'Following' : 'Follows you',
    }));
    setNetworkActivity(activity);
  }, [id]);

  const navigateToHome = () => {
    navigate('/main');
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
      setInWishlist(false);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(movie);
      setInWishlist(true);
      toast.success('Added to wishlist');
    }
  };

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(id);
      setFavorited(false);
      toast.success('Removed from favorites');
    } else {
      addFavorite(movie);
      setFavorited(true);
      toast.success('Added to favorites');
    }
  };

  const handleAddReview = (review) => {
    addReview(id, review);
    setReviews((prev) => [review, ...prev]);
    setShowReviewForm(false);
    toast.success('Review posted!');
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <NavbarMovie />
        <p className="px-6 py-8 text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <NavbarMovie />
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <button
          onClick={navigateToHome}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
        >
          ← Go back
        </button>

        {usingFallback && (
          <p className="rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-400 ring-1 ring-amber-400/30">
            Could not reach the API — showing sample data instead.
          </p>
        )}

        <div className="rounded-2xl bg-slate-900/70 p-6 ring-1 ring-white/10">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="relative w-40 shrink-0 self-start">
              <PosterPlaceholder title={movie.primaryTitle} seed={movie.tconst} className="aspect-[2/3] w-full" />
              <button
                onClick={handleToggleFavorite}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-xl shadow-md backdrop-blur transition ${
                  favorited ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/70 text-amber-400 hover:bg-slate-950'
                }`}
              >
                {favorited ? '★' : '☆'}
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h1 className="text-3xl font-extrabold text-white">{movie.primaryTitle}</h1>
                  <p className="mt-1 text-amber-400">{movie.genres?.map((g) => g.name).join(', ')}</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                  {movie.titleType}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                <span>{movie.startYear}{movie.endYear ? ` – ${movie.endYear}` : ''}</span>
                {movie.runtime && <span>{movie.runtime}</span>}
                {movie.isAdult && (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">18+</span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                    inWishlist
                      ? 'border border-slate-600 text-slate-200 hover:border-red-400 hover:text-red-400'
                      : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                  }`}
                >
                  {inWishlist ? '✓ In Wishlist — Remove' : '+ Add to Wishlist'}
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                    favorited
                      ? 'border border-slate-600 text-slate-200 hover:border-red-400 hover:text-red-400'
                      : 'border border-amber-400/50 text-amber-400 hover:bg-amber-500/10'
                  }`}
                >
                  {favorited ? '★ Favorited — Remove' : '☆ Add to Favorites'}
                </button>
              </div>

              {movie.summary && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-white">Story</h2>
                  <p className="mt-2 text-slate-300">{movie.summary}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {networkActivity.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">In Your Network</h2>
            <div className="space-y-2">
              {networkActivity.map(({ person, action, relationship }) => (
                <Link
                  key={`${person.id}-${action}`}
                  to={`/profile/${person.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/70 p-3 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-amber-400/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                      {person.name.charAt(0)}
                    </div>
                    <p className="truncate text-sm text-slate-200">
                      <span className="font-medium text-white">{person.name}</span>{' '}
                      {action === 'wishlist' ? 'added this to their wishlist' : 'marked this as a favorite'}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {relationship}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Cast</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cast.map((member) => (
              <Link
                key={member.nconst}
                to={`/actor/${member.nconst}`}
                className="flex items-center gap-3 rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{member.name}</p>
                  <p className="truncate text-xs text-slate-500">{member.character}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Reviews</h2>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
              >
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-4">
              <ReviewForm onSubmit={handleAddReview} onCancel={() => setShowReviewForm(false)} />
            </div>
          )}

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{review.date}</p>
                <p className="mt-2 text-sm text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
