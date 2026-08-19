const STORAGE_KEY = 'reviews';

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const writeAll = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getReviews = (titleId) => readAll()[titleId] || [];

export const addReview = (titleId, review) => {
  const all = readAll();
  const existing = all[titleId] || [];
  const updated = [review, ...existing];
  all[titleId] = updated;
  writeAll(all);
  return updated;
};
