import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup/SignUp';
import Login from './components/login/Login';
import FavShow from './components/FavShow/FavShow';
import MainPage from './components/Shows/MainPage';
import ActorList from './components/Actors/ActorsList';
import Userprofile from './components/Userprofiles/Userprofile';
import Editprofile from './components/Userprofiles/Editprofile';
import Welcome from './components/welcome/Welcome';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/Actors" element={<ActorList />} />
          <Route path="/Fav" element={<FavShow />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/userDetails" element={<Userprofile />} />
          <Route path="/editUser" element={<Editprofile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
