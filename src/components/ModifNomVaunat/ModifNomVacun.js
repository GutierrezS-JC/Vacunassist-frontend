import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg'; 
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import {useState} from 'react';

export const ModifNomVacun = () => {
    {/*const [nameForm, setNameForm] = useState({
        optionsVacun: '',
        changeName: ''
    });
    

    const onChange = (e) => {
        e.preventDefault();
        setNameForm({ ...nameForm, [e.target.name]: e.target.value });
    }

    const onBlur = (e) => {

    }

    const validacion = () => {
        if(nameForm.optionsVacun.value !== 0){
            if(nameForm.optionsVacun.value !== nameForm.changeName.value){

            }
            else{

            }
        }
    }

    const Formulario = () => {
        return(
            <Form>
                <Form.Group>
                    <Form.Label htmlFor=''>Vacunatorio</Form.Label>
                    <Form.Select value={nameForm.optionsVacun}>
                        <option value="">- Seleccione un vacunatorio -</option>
                        <option value="Municipalidad">Municipalidad</option>
                        <option value="Terminal">Terminal</option>
                        <option value="Cementerio">Cementerio</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor=''>Nuevo Nombre</Form.Label>
                    <Form.Input type="text" placeholder="..." id="changeName" value={nameForm.changeName} onChange={onChange} onBlur={validacion}></Form.Input>
                </Form.Group>

                <Button type="submit">Aceptar</Button>
                <p>Nombre modificado con éxito</p>
            </Form>
        )
    }
*/}
    function miFunc() {

        alert('Se ha modificado el nombre del vacunatorio correctamente.')
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
                    <Form className="formSize mt-5 ms-3" >
                        
                        <Form.Group controlId="vacunatorio" className="mb-2">
                            <Form.Label><b>Vacunatorio</b></Form.Label>
                            <Form.Select>
                                <option value="">- Seleccione un vacunatorio -</option>
                                <option value="Municipalidad">Municipalidad</option>
                                <option value="Terminal">Terminal</option>
                                <option value="Cementerio">Cementerio</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-12" controlId="changeName">
                            <Form.Label>Nuevo Nombre</Form.Label>
                            <Form.Control type="text" placeholder="..." />
                        </Form.Group>

                        <Button variant="success">Aceptar</Button>
                    </Form>
                </Col>
                <Col className='smSize'>
                    <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                </Col>
            </Row>
        </Container>  
            

        </>
    )
}
