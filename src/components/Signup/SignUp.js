import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer from react-router-bootstrap
import axios from 'axios';


function SignUp() {
  const navigate = useNavigate();
  const initialFormData = {
    username: '', // Change from 'email' to 'username' if needed
    email: '',
    password: '',
    confirmpassword: '',
    age: '', // New field
    country: '', // New field
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = 'The passwords do not match';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 18) {
      newErrors.age = 'Age should be a number and at least 18';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmpassword, ...formDataToSend } = formData;

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register/', formDataToSend);

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        if (response.status === 201) {
          const jwtToken = response.data.refresh;
          localStorage.setItem('jwtToken', jwtToken);
          alert('Signup successful!');
          setFormData(initialFormData);
          setFormSubmitted(true);
          navigate('/Fav');
        } else {
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
      }
    }
  };

  const countries = ['Select Country', 'USA', 'Canada', 'UK', 'Australia', 'Other']; // Add more countries as needed

  return (
    <div className="App">
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <button type="submit">Signup</button>
      </form>
      <label>Already have a account? Login here:</label>
      <LinkContainer to="/login">
          <Button>Login</Button>
      </LinkContainer>
    </div>
  );
}

export default SignUp;
