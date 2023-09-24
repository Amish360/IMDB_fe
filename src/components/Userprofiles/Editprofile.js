import React, { useState, useEffect } from 'react';

function EditProfile() {
  const [formData, setFormData] = useState({ country: '', age: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile data from the Django API
    fetch('/api/get_user_profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Get the JWT token from localStorage
      },
    })
      .then(response => response.json())
      .then(data => setFormData({ country: data.country, age: data.age }))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = event => {
    event.preventDefault();
    // Send a PUT request to update user profile
    fetch('http://127.0.0.1:8000/api/update_user_profile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Include JWT token
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.status === 204) {
          alert('Profile updated successfully');
          // Redirect to the UserProfile page
          window.location.href = '/userDetails'; // Use window.location to redirect
        } else {
          setError('Error updating profile');
        }
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSaveProfile}>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
