export const FALLBACK_CAST = [
  { nconst: 'nm-001', name: 'Elena Marsh', character: 'Captain Reyes' },
  { nconst: 'nm-002', name: 'Daniel Cho', character: 'Dr. Adisa' },
  { nconst: 'nm-003', name: 'Priya Nair', character: 'Lt. Voss' },
  { nconst: 'nm-004', name: 'Marcus Webb', character: 'Commander Hale' },
];

export const FALLBACK_REVIEWS = [
  { id: 1, author: 'CineFan88', rating: 5, date: '2026-07-02', comment: 'A gripping story with great pacing. The cast really sells the tension.' },
  { id: 2, author: 'MovieBuffJ', rating: 4, date: '2026-06-18', comment: 'Visually stunning, though the middle act drags a little.' },
  { id: 3, author: 'ReelTalk', rating: 3, date: '2026-05-30', comment: 'Solid performances but the plot leans on familiar tropes.' },
];

export const FALLBACK_FILMOGRAPHY = [
  { tconst: 'tt-101', primaryTitle: 'The Last Horizon', startYear: 2021, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }] },
  { tconst: 'tt-102', primaryTitle: 'Midnight Circuit', startYear: 2019, endYear: 2023, titleType: 'tvSeries', isAdult: false, genres: [{ name: 'Thriller' }, { name: 'Drama' }] },
  { tconst: 'tt-103', primaryTitle: 'Paper Moons', startYear: 2022, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Romance' }, { name: 'Comedy' }] },
];

export const getFallbackMovie = (id) => ({
  tconst: id || 'tt-101',
  primaryTitle: 'The Last Horizon',
  titleType: 'movie',
  startYear: 2021,
  endYear: null,
  runtime: '128 min',
  genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }],
  isAdult: false,
  summary: 'A crew of explorers ventures beyond the edge of the known galaxy in search of a new home for humanity, uncovering secrets that challenge everything they know.',
});

export const FALLBACK_PEOPLE = [
  { id: 'u-1', name: 'Elena Marsh', country: 'USA', age: 39, bio: 'Sci-fi enthusiast and weekend film critic.' },
  { id: 'u-2', name: 'Daniel Cho', country: 'Canada', age: 34, bio: 'Loves slow-burn dramas and indie cinema.' },
  { id: 'u-3', name: 'Priya Nair', country: 'UK', age: 27, bio: 'TV series binge-watcher, thriller fan.' },
  { id: 'u-4', name: 'Marcus Webb', country: 'Australia', age: 45, bio: 'Classic movie buff, collects vintage posters.' },
  { id: 'u-5', name: 'Sofia Reyes', country: 'USA', age: 31, bio: 'Documentary lover and aspiring filmmaker.' },
];

export const getFallbackPerson = (id) =>
  FALLBACK_PEOPLE.find((person) => person.id === id) || {
    id: id || 'u-1',
    name: 'Jordan Lee',
    country: 'Unknown',
    age: 30,
    bio: 'A fellow movie and show enthusiast.',
  };

export const ONBOARDING_MOVIES = [
  { tconst: 'ob-1', primaryTitle: 'The Last Horizon', startYear: 2021, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }] },
  { tconst: 'ob-2', primaryTitle: 'Midnight Circuit', startYear: 2019, endYear: 2023, titleType: 'tvSeries', isAdult: false, genres: [{ name: 'Thriller' }, { name: 'Drama' }] },
  { tconst: 'ob-3', primaryTitle: 'Paper Moons', startYear: 2022, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Romance' }, { name: 'Comedy' }] },
  { tconst: 'ob-4', primaryTitle: 'Iron Harbor', startYear: 2018, endYear: 2020, titleType: 'tvSeries', isAdult: true, genres: [{ name: 'Crime' }, { name: 'Action' }] },
  { tconst: 'ob-5', primaryTitle: 'Hollow Pines', startYear: 2020, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Horror' }, { name: 'Thriller' }] },
  { tconst: 'ob-6', primaryTitle: 'The Silver Court', startYear: 2017, endYear: 2019, titleType: 'tvSeries', isAdult: false, genres: [{ name: 'Fantasy' }, { name: 'Adventure' }] },
  { tconst: 'ob-7', primaryTitle: 'Nine Lives of June', startYear: 2023, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Comedy' }, { name: 'Romance' }] },
  { tconst: 'ob-8', primaryTitle: 'Deep Static', startYear: 2022, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Sci-Fi' }, { name: 'Action' }] },
  { tconst: 'ob-9', primaryTitle: 'Field Notes', startYear: 2021, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Documentary' }, { name: 'Drama' }] },
  { tconst: 'ob-10', primaryTitle: 'Wolf & Ember', startYear: 2016, endYear: 2022, titleType: 'tvSeries', isAdult: false, genres: [{ name: 'Fantasy' }, { name: 'Drama' }] },
  { tconst: 'ob-11', primaryTitle: 'Redline City', startYear: 2019, endYear: null, titleType: 'movie', isAdult: true, genres: [{ name: 'Crime' }, { name: 'Thriller' }] },
  { tconst: 'ob-12', primaryTitle: 'The Quiet Orchard', startYear: 2020, endYear: null, titleType: 'movie', isAdult: false, genres: [{ name: 'Drama' }, { name: 'Romance' }] },
];

export const getRecommendedShows = (preferredGenres, limit = 8) => {
  if (!preferredGenres || preferredGenres.length === 0) {
    return [];
  }
  const matches = ONBOARDING_MOVIES.filter((show) =>
    show.genres.some((g) => preferredGenres.includes(g.name))
  );
  return matches.slice(0, limit);
};

export const PEOPLE_ACTIVITY = {
  'u-1': { wishlist: ['ob-1', 'fallback-1', 'tt-101', 'wish-1'], favorites: ['ob-5'] },
  'u-2': { wishlist: ['ob-2'], favorites: ['ob-1', 'fallback-2', 'tt-101'] },
  'u-3': { wishlist: ['ob-3', 'ob-8', 'fallback-3'], favorites: [] },
  'u-4': { wishlist: [], favorites: ['tt-101', 'ob-1', 'fallback-1'] },
  'u-5': { wishlist: ['ob-9', 'wish-2'], favorites: ['ob-3'] },
};

export const getNetworkActivityForTitle = (tconst) => {
  const results = [];
  FALLBACK_PEOPLE.forEach((person) => {
    const activity = PEOPLE_ACTIVITY[person.id];
    if (!activity) return;
    if (activity.wishlist.includes(tconst)) {
      results.push({ person, action: 'wishlist' });
    }
    if (activity.favorites.includes(tconst)) {
      results.push({ person, action: 'favorite' });
    }
  });
  return results;
};

export const getFallbackActor = (id) => ({
  nconst: id || 'nm-001',
  primaryName: 'Elena Marsh',
  birthYear: 1987,
  deathYear: null,
  primaryProfession: 'actress, producer',
  bio: 'Elena Marsh is an actress and producer best known for her work in science-fiction and drama, with a career spanning over a decade across film and television.',
});
