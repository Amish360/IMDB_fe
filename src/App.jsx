import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup/SignUp';
import Login from './components/login/Login';
import FavShow from './components/FavShow/FavShow';
import MainPage from './components/Shows/MainPage';
import ActorList from './components/Actors/ActorsList';
import Userprofile from './components/Userprofiles/Userprofile';
import Editprofile from './components/Userprofiles/Editprofile';
import Welcome from './components/welcome/Welcome';
import MovieDetails from './components/Details/MovieDetails';
import CastDetails from './components/Details/CastDetails';
import PublicProfile from './components/Userprofiles/PublicProfile';
import Followers from './components/Users/Followers';
import Following from './components/Users/Following';
import Wishlist from './components/Users/Wishlist';
import Onboarding from './components/Onboarding/Onboarding';
import PeopleSearch from './components/Users/PeopleSearch';
import ChangePassword from './components/changepass/ChangePassword';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: { iconTheme: { primary: '#f59e0b', secondary: '#0f172a' } },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/Actors" element={<ActorList />} />
          <Route path="/title/:id" element={<MovieDetails />} />
          <Route path="/actor/:id" element={<CastDetails />} />
          <Route path="/Fav" element={<FavShow />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/userDetails" element={<Userprofile />} />
          <Route path="/editUser" element={<Editprofile />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/people" element={<PeopleSearch />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
