import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const EditarVacunador = () => {

    const MySwal = withReactContent(Swal);

    const successAlert = () => {
        MySwal.fire({
            title: 'Los cambios se guardaron correctamente!',
            icon: 'success',
        })
    }

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
    
    const Formulario = ({willGo}) =>{
        return(
            <Form style={{}}>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Martin" onKeyDown={handleKeyDown} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" placeholder="Gomez" onKeyDown={handleKeyDown}/>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-8" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Martin123!" onKeyDown={handleKeyDownPassword}/>
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
                            <option>Municipalidad</option>
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

                <Link to={willGo} style={{textDecoration:"none"}}>
                    <Button variant="success" onClick={successAlert}>
                        Guardar cambios
                    </Button>
                </Link>
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
                            <Formulario willGo={'/admin'}/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}