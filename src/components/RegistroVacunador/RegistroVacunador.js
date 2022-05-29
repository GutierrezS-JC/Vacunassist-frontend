import Register_dummy from '../../img/Register_dummy.svg';
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg'; 

import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";

export const RegistroVacunador = () => {

    const numbers = /[0-9]/; 

    const alpha = /[a-zA-Z ]/; 

    const handleKeyDown = (event) => {
        if (!event.key.match(alpha)) {
            event.preventDefault();
          }
    }

    const handleKeyDownPassword = (event) => {
        if (!(event.key= " ")) {
            event.preventDefault();
          }
    }
    
    const handleKeyDownNumbers = (event) => {
        if (!event.key.match(numbers)) {
            event.preventDefault();
          }
    }

    const Formulario = () =>{
        return(
            <Form style={{}}>
                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="..." />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-6" style={{}} controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control type="text" placeholder="..." onKeyDown={handleKeyDownNumbers}/>
                    </Form.Group>
                   
                </Row>

                {/* <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-8" controlId="formDNI">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="..." />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Button variant="outline-success">
                            Validar DNI
                        </Button>
                    </Form.Group>

                </Row> */}

                <Form.Label>DNI</Form.Label>
                <Form.Group className="d-flex mb-3" >
                    <FormControl
                        type="text"
                        placeholder="..."
                        className="me-2"
                        aria-label="Search"
                        onKeyDown={handleKeyDownNumbers}
                    />
                    <Button variant="outline-success">Validar</Button>
                </Form.Group>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="..." onKeyDown={handleKeyDownPassword}/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formConfirmation">
                        <Form.Label>Confirmar</Form.Label>
                        <Form.Control type="password" placeholder="..." onKeyDown={handleKeyDownPassword}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select defaultValue="Zona...">
                        <option>Centro</option>
                        <option>Terminal</option>
                        <option>Cementerio</option>
                    </Form.Select>
                </Form.Group>
             

                <Button variant="success">
                    Dar de alta
                </Button>
            </Form>
        )
    }

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Registrar un nuevo vacunador</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Registrar un nuevo vacunador</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                            <Formulario/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}