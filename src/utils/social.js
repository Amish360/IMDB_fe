const STORAGE_KEY = 'following';

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

export const getFollowing = () => read();

export const isFollowing = (userId) => read().includes(userId);

export const followUser = (userId) => {
  const list = read();
  if (list.includes(userId)) return list;
  const updated = [...list, userId];
  write(updated);
  return updated;
};

export const unfollowUser = (userId) => {
  const updated = read().filter((id) => id !== userId);
  write(updated);
  return updated;
};
