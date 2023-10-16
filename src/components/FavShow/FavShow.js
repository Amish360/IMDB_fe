import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Import jwt_decode if you haven't already
import NavbarMovie from '../Shows/NavbarMovie';
import FavShowCard from './FavShowCard';


const FavShow = () => {
  const [formData, setFormData] = useState({
    selectedShows: [],
  });

  const [tvShows, setTvShows] = useState([]);

  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('jwtToken');

  // Function to decode the JWT token and get the user ID
  const getUserId = () => {
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.user_id;
    }
    return null; // Handle the case when the token is not found in local storage
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/shows/api/random-titles/')
      .then((response) => {
        setTvShows(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching TV shows:', error);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        selectedShows: [...formData.selectedShows, name],
      });
    } else {
      setFormData({
        ...formData,
        selectedShows: formData.selectedShows.filter((show) => show !== name),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the user ID from your authentication system
      const userId = getUserId();

      if (userId) {
        // Include the user ID in the request data
        const requestData = {
          userId: userId,
          selectedShows: formData.selectedShows,
        };

        // Send selected TV shows and user ID to the API to save them
        await axios.post('http://127.0.0.1:8000/shows/api/create_favorite_tvshow/', requestData);
        alert('TV shows saved successfully!');
      } else {
        // Handle the case when the user ID is not available (e.g., token not found)
        // You can redirect to the login page or show an error message.
        alert('User not authenticated. Please log in.');
        
      }
    } catch (error) {
      console.error('Error saving TV shows:', error);
    }
  };

  return (
    <div>
      <NavbarMovie />
      <h2>Select Your Favorite TV Shows</h2>
      <form onSubmit={handleSubmit}>
        <div className="tv-show-cards">
          {tvShows.map((show) => (
            <FavShowCard
              key={show.tconst}
              show={show}
              isSelected={formData.selectedShows.includes(show.primaryTitle)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FavShow;
