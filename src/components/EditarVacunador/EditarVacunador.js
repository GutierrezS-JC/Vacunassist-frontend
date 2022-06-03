import axios from 'axios';
import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import { useAuth } from "../../providers/useAuth"

export const EditarVacunador = () => {
    const auth = useAuth();
    const [mounted, setMounted] = useState(false)
    const [hasClicked, setHasClicked] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const MySwal = withReactContent(Swal);
    const [ zonas, setZonas ] = useState(); 
    const alpha = /[a-zA-Z ]/; 
    const numbers = /[0-9]/; 

    const successAlert = () => {
        MySwal.fire({
            title: 'Los cambios se guardaron correctamente!',
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

    const getZonas = () =>{
        axios.get("http://localhost:8080/getZonas")
        .then((res) => {
            console.log(res.data)
            const allZonas = res.data;
            setZonas(allZonas);
        })
        .catch(error => console.log('Error: ' + error));
    }

    useEffect(()=>{
        setMounted(true)
        getZonas();
    },[])

    const EditarVacunadorTry = (evento) => {
        console.log(evento.target)
        axios.put(`http://localhost:8080/editarVacunador?nombre=${evento.target.nombre.value}&apellido=${evento.target.apellido.value}&password=${evento.target.password.value}&idZona=${evento.target.options.value}&dni=${evento.target.dni.value}`)
        .then((res) => {
            console.log(res.data)
            successAlert("Su perfil se ha actualizado con exito")
        })
        .catch(error => console.log('Error: ' + error));
    }

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

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!event.target.dni.value || event.target.dni.value == ""){
            errorAlert("Debe ingresar un DNI")
        }
        else if(event.target.dni.value.length < 6){
            errorAlert("Ingrese un DNI valido")
        }
        else{
            EditarVacunadorTry(event);
        }
    }

    const Formulario = () =>{
        return(
            <Form onSubmit={handleSubmit}>
                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" type="text" placeholder={auth.user.nombre} onKeyDown={handleKeyDown} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control name="apellido" type="text" placeholder={auth.user.apellido} onKeyDown={handleKeyDown}/>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-8" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control name="password" type="password" placeholder="*******" onKeyDown={handleKeyDownPassword}/>
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-4" controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control disabled name="codigoUnico" type="text" placeholder="*****" /> {/*/*poner disable cuando este en la sesion del vacunador, lo saque para probar */ }
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group className="mb-3 col-12 col-sm-12" controlId="formGridState">
                        <Form.Label>Zona de vacunacion</Form.Label>
                        <Form.Select name="options">
                            {zonas.map((zona, index)=>{
                                return(
                                    <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled name="email" type="email" placeholder={auth.user.email} /> {/*/*poner disable cuando este en la sesion del vacunador, lo saque para probar */ }
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formDNI">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control name="dni" style={{}} type="text" placeholder={auth.user.dni} /> {/*/*poner disable cuando este en la sesion del vacunador, lo saque para probar */ }
                    </Form.Group>
                </Row>
                    <Button variant="success" type='submit' onClick={successAlert}>
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
                            {zonas ? (<Formulario/>) : (<><p>No hay nada</p></>)}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}