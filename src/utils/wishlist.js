const STORAGE_KEY = 'wishlist';

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const write = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const getWishlist = () => read();

export const isInWishlist = (tconst) => read().some((show) => show.tconst === tconst);

export const addToWishlist = (show) => {
  const list = read();
  if (list.some((item) => item.tconst === show.tconst)) return list;
  const updated = [...list, show];
  write(updated);
  return updated;
};

export const removeFromWishlist = (tconst) => {
  const updated = read().filter((show) => show.tconst !== tconst);
  write(updated);
  return updated;
};
