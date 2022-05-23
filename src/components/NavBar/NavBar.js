import { Navbar, Container, Nav, NavItem, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Logo } from '../Logo/Logo'

export const NavBar = () => {
    return (
         <Navbar bg="dark" variant="dark" expand="md">
            <Container fluid>
                <Navbar.Brand>
                    <Link className="navbar-brand" to="/" style={{ color: "white", textDecoration: "none" }}><Logo />
                    {' '}
                    Vacunassist
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem>
                            <Link to="/" className="nav-link">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login" className="nav-link">Iniciar Sesion</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}