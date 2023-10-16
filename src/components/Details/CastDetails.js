import React from "react";
import { useParams } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom'
import MovieList from "./MovieList";


function CastDetails(){
    const { id } = useParams();
    const navigate=useNavigate();

    const navigateToHome = () => {
        navigate('/main');
      };

    return(
        <section>
        <NavbarMovie />
        <div>
            <h2>ID:{id}</h2>
        </div>

        <div className="Details-image-Container">
            <img src="" alt=""/>
        </div>
        
        
        <div className="Details-info-Container">
            <h1>{name}</h1>
            <span>{Age}</span>
            <span>{titlesknown}</span>
        </div>

        <div className="Details-info-Container">
            <h1>BIODATA:</h1>
            <p>{BIODATA}</p>
        </div>

        <div className="Details-info-Container">
            <h1>Details:</h1>
            <p>{year}</p>
            <p>{runtime}</p>
        </div>


        <button onClick={navigateToHome}><p>Go back</p></button>


        <Routes>
          <Route path="/main" element={MovieList} />
        </Routes>

        </section>
    
    );
}



export default CastDetails;