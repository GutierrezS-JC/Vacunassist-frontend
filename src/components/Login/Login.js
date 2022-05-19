import '../../styles/login.css';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from './LoginForm';
import { LoginCarousel } from '../LoginCarousel/LoginCarousel';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const Login = () => {
    const MySwal = withReactContent(Swal)
    
    const sucessAlert = (user) => {
        MySwal.fire({
            title: '¡Bienvenido!',
            text: ` Cuidate cuidate ${user.email}`,
            icon: 'success',
        })
    }
    const errorAlert = (error) => {
        MySwal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
        })
    }

    return (
    
        <Container fluid style={{height:"100vh"}}>
                <Row style={{height:"100%"}}>
                    <Col className="col-md-6 col-12 rightContainer p-5">
                        <LoginCarousel />
                    </Col>
                    <Col className="col-md-6 col-12 leftContainer p-5">
                        <LoginForm errorAlert={errorAlert} sucessAlert={sucessAlert}/>
                    </Col>
                    
                </Row>
        </Container>
    )
}