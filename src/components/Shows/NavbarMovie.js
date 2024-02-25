import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 
import { useNavigate } from 'react-router-dom';

function NavbarMovie() {

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
  
    if (confirmLogout) {
      alert("You have been logged oout successfully.")
      localStorage.removeItem('jwtToken')
      navigate('/login')
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/main">
        <Nav.Link>
          <Button>Home</Button>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/Actors">
        <Nav.Link>
          <Button>Actors</Button>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/Fav">
        <Nav.Link>
          <Button>Wishlist</Button>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/userDetails">
        <Nav.Link>
          <Button>Profile</Button>
        </Nav.Link>
      </LinkContainer>

        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>

    </Navbar>
  );
}

export default NavbarMovie;
