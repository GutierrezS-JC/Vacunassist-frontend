import Register_dummy from '../../img/Register_dummy.svg';
import axios from "axios";
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg'; 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';


export const RegistroVacunador = () => {
    const [mounted, setMounted] = useState(false)
    const [hasClicked, setHasClicked] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const MySwal = withReactContent(Swal)
    const [ zonas, setZonas ] = useState(); 

    const numbers = /[0-9]/; 
    const alpha = /[a-zA-Z ]/; 
    
    
    const successAlert = () => {
        MySwal.fire({
            title: 'Se ha registrado un nuevo vacunador!',
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

    // const editarNombreVacunatorio = (nameVacunParam, optionValue) =>{
    //     axios.put(`http://localhost:8080/editarNombreVacunatorio?nombre=${nameVacunParam}&id=${optionValue}`)
    //     .then((res) => {
    //         console.log(res.data)
    //         const resultado = res.data;
    //         successAlert("El nombre del vacunatorio ha sido modificado de forma exitosa")
    //     })
    //     .catch(error => console.log('Error: ' + error));
    // }

    const cargarVacunadorTry = (evento) => {
        console.log(evento.target)
        axios.post("http://localhost:8080/cargarVacunador",{   
            id: 0,
            dni: evento.target.dni.value,
            email: evento.target.email.value,
            nombre: evento.target.nombre.value,
            apellido: evento.target.apellido.value,
            clave: evento.target.codigoUnico.value,
            password: evento.target.password.value,
            fechaNacimiento: "2022-06-02T16:07:44.129Z",
            rolId: 2,
            zonaId: evento.target.options.value
        }).then((res)=>{
            console.log(res.data)
            successAlert("Ok")
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
        cargarVacunadorTry(event);
    }

    const Formulario = () =>{
        return(
            <Form onSubmit={handleSubmit}>
                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="nombre" type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name="apellido" type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="..." />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-6" style={{}} controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control name="codigoUnico" type="text" placeholder="..." onKeyDown={handleKeyDownNumbers}/>
                    </Form.Group>
                   
                </Row>

                <Form.Label>DNI</Form.Label>
                <Form.Group className="d-flex mb-3" >
                    <FormControl
                        type="text"
                        placeholder="..."
                        className="me-2"
                        aria-label="Search"
                        onKeyDown={handleKeyDownNumbers}
                        name="dni"
                    />
                    <Button variant="outline-success">Validar</Button>
                </Form.Group>

                {/* <Row className=""> */}
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control name="password" type="password" placeholder="..." onKeyDown={handleKeyDownPassword}/>
                    </Form.Group>

                    {/* <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formConfirmation">
                        <Form.Label>Confirmar</Form.Label>
                        <Form.Control type="password" placeholder="..." onKeyDown={handleKeyDownPassword}/>
                    </Form.Group> */}
                {/* </Row> */}

                {/* <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select defaultValue="Zona...">
                        <option>Centro</option>
                        <option>Terminal</option>
                        <option>Cementerio</option>
                    </Form.Select>
                </Form.Group> */}
                 <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select name="options">
                        {zonas.map((zona, index)=>{
                            return(
                                <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
             
                <Button variant="success" type='submit'>
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
                            {zonas ? (<Formulario/>) : (<><p>No hay nada</p></>)}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}