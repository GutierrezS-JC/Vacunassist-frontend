import { Navbar, Container } from "react-bootstrap"
export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Vacunassist
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}