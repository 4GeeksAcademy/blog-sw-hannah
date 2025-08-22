import React from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";

const CustomNavbar = ({ favorites, removeFavorite }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Star Wars App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="warning">
                ⭐ Favoritos ({favorites.length})
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: "250px" }}>
                {favorites.length === 0 ? (
                  <Dropdown.Item disabled>No hay favoritos</Dropdown.Item>
                ) : (
                  favorites.map((fav) => (
                    <Dropdown.Item
                      key={`${fav.uid}-${fav.type}`}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{fav.name} <small>({fav.type})</small></span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFavorite(fav.uid, fav.type)}
                      >
                        ✖
                      </Button>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
