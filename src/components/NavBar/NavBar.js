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
                    {auth.user.nombre[0].toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header><strong>{`${auth.user.nombre} ${auth.user.apellido}`}</strong></Dropdown.Header>
                    {auth.isAdmin() ?
                        <></>
                    :   <Dropdown.Item onClick={ () => navigate('/editarVacunador')}>Editar Perfil</Dropdown.Item>
                    }
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
                       <Link className="navbar-brand" to="/admin" style={{ color: "white", textDecoration: "none" }}><Logo />
                       {' '}
                       Vacunassist
                       </Link>
                   </Navbar.Brand>
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse id="basic-navbar-nav" >
                       <Nav className="me-auto">
                            {auth.isAdmin() ?
                                <></>
                            :   
                            <>
                             <NavItem>
                               <Link to="/vacunador" className="nav-link">Vacunador</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/editarVacunador" className="nav-link d-sm-block d-md-none">Editar Perfil</Link>
                            </NavItem>
                            </>
                            } 
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