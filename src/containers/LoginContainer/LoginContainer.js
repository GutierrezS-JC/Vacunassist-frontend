import '../../styles/login.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../../components/Login/LoginForm';
import {LoginCarousel } from '../../components/Login/LoginCarousel';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const LoginContainer = () => {
    const [ errors, setErrors ] = useState({})
    const [ hasValidated, setHasValidated] = useState(false);
    const [ hasVerificationCode, setVerificationCode] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        verificationCode: ''
    })

    const MySwal = withReactContent(Swal)
    
    const successAlert = (user) => {
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

    const validateForm = () => {
        const newErrors = {}
        if (user.email === "" || !user.email ) {
            newErrors.email="Ingrese una direccion de correo electronico";
        } else if( user.email.length < 15){
            newErrors.email="Revise su direccion de correo electronico"
        }
        
        if (user.password === "" || !user.password) {
            newErrors.password="Ingrese su contraseña";
        } else if(user.password.length < 8) {
            newErrors.password="Por favor verifique sus datos";
        }
        
        return newErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSpinner(true);
        console.log(user)
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else if(!user.verificationCode && user.verificationCode===""){
            console.log(user)
            //No hay errores pero no ingresamos el codigo
            setHasValidated(true)
            setTimeout(() => {
                setSpinner(false)
            }, 1500)
        } 
        else {
            //No hay errores pero ahora SI ingresamos el codigo
            setTimeout(() => {
                setSpinner(false)
                successAlert(user)
            }, 1500)
        }
    };


    const handleChange = (event) => {
        console.log(event.target.value)
        setUser({ ...user, [event.target.name]: event.target.value });
        
        //new
        if(!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };


    return (
    
        <Container fluid style={{height:"100vh"}}>
                <Row style={{height:"100%"}}>
                    <Col className="col-md-6 col-12 rightContainer p-5">
                        <LoginCarousel />
                    </Col>
                    <Col className="col-md-6 col-12 leftContainer p-5">
                        <LoginForm hasVerificationCode={hasVerificationCode} user={user} errors={errors} hasValidated={hasValidated} spinner={spinner} errorAlert={errorAlert} sucessAlert={successAlert} validateForm={validateForm} handleSubmit={handleSubmit} handleChange={handleChange}/>
                    </Col>
                </Row>
        </Container>
    )
}