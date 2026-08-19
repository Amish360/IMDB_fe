const BIO_KEY = 'userBio';

export const getBio = () => localStorage.getItem(BIO_KEY) || '';

export const setBio = (bio) => {
  localStorage.setItem(BIO_KEY, bio);
};
