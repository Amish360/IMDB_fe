import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


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
          toast.success('Signup successful!');
          setFormData(initialFormData);
          setFormSubmitted(true);
          navigate('/onboarding');
        } else {
          toast.error('Signup failed. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error(error);
      }
    }
  };

  const countries = ['Select Country', 'USA', 'Canada', 'UK', 'Australia', 'Other']; // Add more countries as needed

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";
  const labelClass = "mb-1 block text-sm font-medium text-slate-300";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">Create an account</h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmpassword" className={labelClass}>Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className={inputClass}
              required
            />
            {errors.confirmpassword && <p className="mt-1 text-sm text-red-400">{errors.confirmpassword}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className={labelClass}>Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={inputClass}
                required
              />
              {errors.age && <p className="mt-1 text-sm text-red-400">{errors.age}</p>}
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-amber-400 hover:text-amber-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
