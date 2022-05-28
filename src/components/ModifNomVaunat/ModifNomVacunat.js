import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Register_dummy from '../../img/Register_dummy.svg';
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg';
import { AdminHome } from "../ProtectedPage/AdminHome";
import { useState } from "react";

export const ModifNomVacunat = ({ errors, hasValidated, spinner, errorAlert, successAlert, handleSubmit}) => {
    const handleChange = (event) => {
        console.log(event.target.value)
        setUserForm({ ...userForm, [event.target.name]: event.target.value });
    }

    const [userForm, setUserForm] = useState({
        newName: ''
    })

    const Opciones = () => {
        return(
            <Form style={{}}>
                <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Vacunatorio</Form.Label>
                    <Form.Select>
                        <option>Vacunatiorio...</option>
                        <option value="1">Centro</option>
                        <option value="2">Terminal</option>
                        <option value="3">Cementerio</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" style={{}} controlId="formUniqueCode">
                <Form.Label>Nuevo Nombre</Form.Label>
                {hasValidated 
                    ? <Form.Control disabled type="newName" placeholder="Ingresa un  nuevo nombre" onChange={handleChange} required isInvalid={errors.newName} name='newName'/> 
                    : <Form.Control type="newName" placeholder="Ingresa un  nuevo nombre" onChange={handleChange} required isInvalid={errors.newName} name='newName' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.newName}
                    </Form.Control.Feedback>
                </Form.Group>                

                {!hasValidated ? (userForm.newName.length > 0 ?
                (<Button className="mt-2" variant="dark" type="submit">Aceptar</Button>) : (<Button className="mt-2" variant="secondary" disabled> Siguiente </Button>))
                : ( spinner ? <SpinnerLoading/> : <AdminHome handleChange={handleChange} successAlert={successAlert} errorAlert={errorAlert} errors={errors} />) 
                }

            </Form>
            
        )
    } 

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Modificar nombre de un vacunatorio</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Modificar nombre de un vacunatorio</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                            <Opciones/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}