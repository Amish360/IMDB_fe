import React from 'react';
import ShowList from './ShowList';
import NavbarMovie from './NavbarMovie'

function MainPage() {
 
  return (
    <div className="App">
      <NavbarMovie />
      <h1>TV Shows</h1>
      <ShowList/>
    </div>
  );
}

export default MainPage;
