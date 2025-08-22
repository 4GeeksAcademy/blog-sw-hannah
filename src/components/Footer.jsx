import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <small>© 2025 Star Wars Fan App. Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
}