import '../../styles/navbar.css';
import { Navbar, Container, Nav, NavItem, NavLink, Button, Dropdown } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { Logo } from '../Logo/Logo'
import { useAuth } from "../../providers/useAuth"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const NavBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const logoutAlert = () => {
        MySwal.fire({
            position: 'top-end',
            title: 'Sesion cerrada',
            showConfirmButton: false,
            icon: 'success',
            timer:1500
        })
    }

    const handleLogout = () => {
        setTimeout(() => {
            auth.logout();
            logoutAlert()
            navigate('/login')
        }, 500)
    }

    const UserCircle = () => {
        return (
            <Dropdown drop='start'>
                <Dropdown.Toggle className='circle rounded-circle caret-off' variant="success" id="dropdown-basic">
                    {auth.user.email[0].toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Mi perfil</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={ ()=> handleLogout() }>Cerrar Sesion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const NavBarLoggedIn = () =>{
        return (
            <Navbar bg="dark" variant="dark" expand="md">
               <Container fluid>
                   <Navbar.Brand>
                       <Link className="navbar-brand" to="/protected" style={{ color: "white", textDecoration: "none" }}><Logo />
                       {' '}
                       Vacunassist
                       </Link>
                   </Navbar.Brand>
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse id="basic-navbar-nav" >
                       <Nav className="me-auto">
                           <NavItem>
                               <Link to="/protected" className="nav-link">Mis vacunas</Link>
                           </NavItem>
                           <NavItem>
                               <Link to="/misTurnos" className="nav-link">Mis turnos</Link>
                           </NavItem>
                           <NavItem>
                               <Link to="/protected" className="nav-link d-sm-block d-md-none">Mi Perfil</Link>
                           </NavItem>
                           <NavItem>
                               <Nav.Link onClick={ ()=> handleLogout() } className="nav-link d-sm-block d-md-none">Cerrar sesion</Nav.Link>
                           </NavItem>
                        </Nav>
                        <Nav className="justify-content-end d-none d-md-block">
                           <NavItem><UserCircle/></NavItem>
                       </Nav>
                   </Navbar.Collapse>
               </Container>
           </Navbar>
        )
    }

    const NavBarNotLoggedIn = () => {
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
                        </Nav>
                        <Nav>
                            <NavItem>
                                <Button onClick={() => navigate("/login")} variant="outline-success">Iniciar Sesion</Button>
                            </NavItem>
                       </Nav>
                   </Navbar.Collapse>
               </Container>
           </Navbar>
       )
    }
   
    return auth.user ? <NavBarLoggedIn/> : <NavBarNotLoggedIn/>
}