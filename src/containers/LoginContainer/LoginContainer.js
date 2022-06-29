import '../../styles/login.css';
import { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../../components/Login/LoginForm';
import {LoginCarousel } from '../../components/Login/LoginCarousel';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '../../providers/useAuth';
import { useNavigate } from 'react-router-dom';


export const LoginContainer = () => {
    const [ errors, setErrors ] = useState({})
    const [ hasVerificationCode, setVerificationCode] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
        verificationCode: ''
    })

    const MySwal = withReactContent(Swal)
    
    const successAlert = (userForm) => {
        MySwal.fire({
            title: '¡Bienvenido/a!',
            text: ` Hola ${userForm.nombre}`,
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
        if (userForm.email === "" || !userForm.email ) {
            newErrors.email="Ingrese una direccion de correo electronico";
        } else if( userForm.email.length < 15){
            newErrors.email="Revise su direccion de correo electronico"
        }
    
        if (userForm.password === "" || !userForm.password) {
            newErrors.password="Ingrese su contraseña";
        } else if(userForm.password.length < 6) {
            newErrors.password="Por favor verifique sus datos";
        }
    
        return newErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();    
        
    }
    
    const handleChange = (event) => {
        setUserForm({ ...userForm, [event.target.name]: event.target.value });
        
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
                        <LoginForm hasVerificationCode={hasVerificationCode} userForm={userForm} errors={errors} errorAlert={errorAlert} sucessAlert={successAlert} validateForm={validateForm} handleSubmit={handleSubmit} handleChange={handleChange}/>
                    </Col>
                </Row>
        </Container>
    )
}