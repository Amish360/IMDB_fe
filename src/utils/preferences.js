const STORAGE_KEY = 'preferredGenres';

export const getPreferredGenres = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const setPreferredGenres = (genres) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
};

export const hasCompletedOnboarding = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const deriveGenresFromSelection = (selectedShows) => {
  const counts = {};
  selectedShows.forEach((show) => {
    show.genres.forEach((g) => {
      counts[g.name] = (counts[g.name] || 0) + 1;
    });
  });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
};
