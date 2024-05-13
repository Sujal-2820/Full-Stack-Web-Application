// // event/src/app/components/navbar.js

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";


function NavbarComponent() {
  const router = useRouter();

  const toSignupPage = () => {
    router.push("/signup");
  };

  const directToHome = () => {
    router.push("/");
  };

  const toDashboard = () => {
    router.push("/dashboard");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body">
      <Container>
        <Navbar.Brand href="#home">
          <span className="navbar-brand-1">Full</span>
          <span className="navbar-brand-2">Stack</span>
          <span className="navbar-brand-3">Project</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="Navbar-element" onClick={directToHome}>
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link className="Navbar-element" href="#home">
              <i className="fas fa-info-circle"></i> About
            </Nav.Link>
            <Nav.Link className="Navbar-element" onClick={toDashboard}>
              <i className="fa fa-tachometer"></i> Dashboard
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="Navbar-element" onClick={toSignupPage}>
              <i className="fas fa-user"></i> Signup/Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
