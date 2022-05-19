import { useState } from "react";
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom";

export const LoginForm = ({errorAlert, sucessAlert}) => {
    //New below
    const [ errors, setErrors ] = useState({})
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    // const validateForm = () => {
    //     if (user.email === '' || user.password === '') {
    //         errorAlert('Por favor, completa todos los campos');
    //     } else {
    //         if (user.password !== "1234") {
    //             errorAlert('Por favor verifique sus datos');
    //         } else {
    //             console.log(user);
    //         }
    //     }
    // }

    const validateForm2 = () => {
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
    
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === true) {
    //         validateForm()
    //     }
    //     setValidated(true);
    // };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        const newErrors = validateForm2();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else{
            setValidated(true);
            sucessAlert(user)
        }

    };

    // const handleChange = (event) => {
    //     setUser({ ...user, [event.target.name]: event.target.value });
    // }
    
    const handleChange2 = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        
        //new
        if(!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };

    return(
        <>
        < Form className="formSize mt-5 ms-3" noValidate validated={validated} onSubmit={handleSubmit2} >
            <h2>Iniciar Sesion</h2>
            
            <Form.Group controlId="formBasicEmail" className="mb-2">
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu email" onChange={handleChange2} required isInvalid={errors.email} name='email' />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-2">
                <Form.Label><b>Contraseña</b></Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={handleChange2} required isInvalid={errors.password} name='password' />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            
            {user.password.length > 6 ? (<Button className="mt-2" variant="dark" type="submit">Siguiente</Button>) : (<Button className="mt-2" variant="secondary" disabled> Siguiente </Button>)}
        </Form >
            <div className="text-muted mt-2 ms-3">
                <p>
                    ¿Sos un usuario nuevo? <Link to="/">Registrarse</Link>
                </p>
            </div>
            </>
    )
}