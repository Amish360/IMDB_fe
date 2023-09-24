import React from "react";
import {  Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer from react-router-bootstrap



function Welcome() {

    return(
        <div>
            <h1>Welcome to the IMDB clone.</h1>
                <LinkContainer to="/Signup">
                    <Button>Sign Up</Button>
                </LinkContainer>

                <LinkContainer to="/login">
                    <Button>Login</Button>
                </LinkContainer>
        </div>
     
    );
};


export default Welcome