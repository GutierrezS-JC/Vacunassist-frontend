import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { LoginCode } from "./LoginCode";

export const LoginForm = ({ userForm, errors, hasValidated, spinner, errorAlert, successAlert, handleSubmit, handleChange}) => {
    
    return(
        <>
            <Form className="formSize mt-5 ms-3" noValidate onSubmit={handleSubmit} >
                <h2>Iniciar Sesion</h2>

                <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label><b>Email</b></Form.Label>
                    {hasValidated 
                    ? <Form.Control disabled type="email" placeholder="Ingresa tu email" onChange={handleChange} required isInvalid={errors.email} name='email'/> 
                    : <Form.Control type="email" placeholder="Ingresa tu email" onChange={handleChange} required isInvalid={errors.email} name='email' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-2">
                    <Form.Label><b>Contraseña</b></Form.Label>
                    {hasValidated
                    ? <Form.Control disabled type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required isInvalid={errors.password} name='password' />
                    : <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required isInvalid={errors.password} name='password' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                {!hasValidated ? (userForm.password.length > 5 ?
                (<Button className="mt-2" variant="dark" type="submit">Siguiente</Button>) : (<Button className="mt-2" variant="secondary" disabled> Siguiente </Button>))
                : ( spinner ? <SpinnerLoading/> : <LoginCode handleChange={handleChange} successAlert={successAlert} errorAlert={errorAlert} errors={errors} />) 
                }

            </Form>
            <div className="text-muted mt-2 ms-3">
                <p>¿Sos un usuario nuevo? <Link to="/">Registrarse</Link></p>
            </div>
        </>
    )
}