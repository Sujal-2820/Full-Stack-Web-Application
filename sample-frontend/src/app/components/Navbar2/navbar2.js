// // event/src/app/components/navbar.js

import "./navbar2.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function DashboardNavbarComponent() {
  const router = useRouter();

  const directToHome = () => {
    router.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body">
    <br/><br/>
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
            <Nav.Link className="Navbar-element" onClick={() => {router.push('/dashboard')}}>
              <i className="fa fa-tachometer"></i> Dashboard
            </Nav.Link>
            <Nav.Link className="Navbar-element" onClick={() => {router.push('/dashboard/addData')}}>
              <i className="fa fa-plus-square"></i> Add Data
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="Navbar-element" onClick={directToHome}>
              <i className="fas fa-sign-out"></i> Signout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbarComponent;
