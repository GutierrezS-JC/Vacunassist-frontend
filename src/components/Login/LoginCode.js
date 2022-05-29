import { Form, Button } from "react-bootstrap";

export const LoginCode = ({errorAlert, successAlert, handleChange, errors}) => {

    const handleKeyDown = (event) => {
        if (event.key === " ") {
            event.preventDefault();
          }
    }

    return(
        <>
            <Form.Group controlId="formVerificationCode" className="mb-2">
                <Form.Label><b>Código único de acceso</b></Form.Label>
                        <Form.Control onKeyDown={handleKeyDown} type="password" placeholder="Ingresa tu código" onChange={handleChange} isInvalid={errors.codeVerification} name='verificationCode' /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.codeVerification}
                        </Form.Control.Feedback>
            </Form.Group>
            <Button className="mt-2" variant="dark" type="submit">Login</Button>
        </>
    )
}