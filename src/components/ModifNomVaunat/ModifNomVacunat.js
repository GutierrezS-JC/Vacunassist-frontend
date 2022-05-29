import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Register_dummy from '../../img/Register_dummy.svg';
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg';
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const ModifNomVacunat = ({ hasValidated }) => {
    const [ errors, setErrors ] = useState({});
    const MySwal = withReactContent(Swal);
    const [userForm, setUserForm] = useState({
        newName: ''
    })
    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setUserForm({ ...userForm, [event.target.name]: event.target.value });
        
        //new
        if(!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };
    const successAlert = (userForm) => {
        MySwal.fire({
            title: '¡Bienvenido!',
            text: ` Cuidate ${userForm.email}`,
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

    const Opciones = () => {
        return(
            <Form style={{}}>
                <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Vacunatorio</Form.Label>
                    <Form.Select>
                        <option>...</option>
                        <option value="1">Centro</option>
                        <option value="2">Terminal</option>
                        <option value="3">Cementerio</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" style={{}} controlId="formName">
                    <Form.Label>Nuevo nombre</Form.Label>
                    {hasValidated 
                    ? <Form.Control disabled type="text" placeholder="Ingresa un  nuevo nombre" onChange={handleChange} required isInvalid={errors.newName} name='newName'/> 
                    : <Form.Control type="text" placeholder="Ingresa un nuevo nombre para el vacunatorio" onChange={handleChange} required isInvalid={errors.newName} name='newName' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.newName}
                    </Form.Control.Feedback>
                </Form.Group>                

                {(userForm.newName != "vacunatorio 1" ?
                (<Button className="mt-2" variant="dark" type="submit">Aceptar</Button>) : (<Button className="mt-2" variant="secondary" disabled> Aceptar </Button>)) 
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