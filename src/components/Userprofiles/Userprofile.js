import React, { useEffect, useState } from 'react';
import NavbarMovie from '../Shows/NavbarMovie';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      fetch('http://127.0.0.1:8000/api/get_user_profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Response Status:', response.status);
          if (!response.ok) {
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then((data) => {
          console.log('API Response:', data);
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setError(error.message); // Store the error message
          setLoading(false);
        });
    } else {
      console.log('No token found.');
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <NavbarMovie />
      <Link to="/editUser">
        <button>Edit Profile</button>
      </Link>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Email: {user.email}</p>
          <p>Country: {user.country}</p>
          <p>Age: {user.age}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;
