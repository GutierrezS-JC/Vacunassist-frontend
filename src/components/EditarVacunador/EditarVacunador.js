import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const EditarVacunador = () => {
    
    const Formulario = () =>{
        return(
            <Form style={{}}>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Martin" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" placeholder="Gomez" />
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-8" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="text" placeholder="Martin123!" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-4" controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control disabled type="text" placeholder="12345" />
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group className="mb-3 col-12 col-sm-12" controlId="formGridState">
                        <Form.Label>Zona de vacunacion</Form.Label>
                        <Form.Select defaultValue="Zona actual asignada">
                            <option>Centro</option>
                            <option>Terminal</option>
                            <option>Cementerio</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled type="email" placeholder="martingomez@gmail.com" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formDNI">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control disabled style={{}} type="text" placeholder="33333333" />
                    </Form.Group>
                </Row>

                <Button variant="success">
                    Guardar cambios
                </Button>
            </Form>
        )
    }

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Editar perfil</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Editar perfil</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                            <Formulario/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}