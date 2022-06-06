import Register_dummy from '../../img/Register_dummy.svg';
import axios from "axios";
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg'; 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';


export const RegistroVacunador = () => {
    const [ hasClicked, setHasClicked ] = useState(false)
    const [ spinner, setSpinner ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const MySwal = withReactContent(Swal)
    
    const [ zonas, setZonas ] = useState(); 
    const [ codigosVacunadores, setCodigosVacunadores ] = useState();
    const [ dnisVacunadores, setDnisVacunadores ] = useState();
    const [ emailsVacunadores, setEmailsVacunadores ] = useState();
    const [validoDni, setValidoDni] = useState(false)
    const [buttonDni, setButtonDni] = useState(false)

    const numbers = /[0-9]/; 
    const alpha = /[a-zA-Z ]/; 
    
    
    const successAlert = () => {
        MySwal.fire({
            title:'Todo bien!',
            text: 'Se ha registrado un nuevo vacunador',
            icon: 'success',
        })
    }

    const successAlert2 = () => {
        MySwal.fire({
            title:'Bien',
            text: 'El DNI no se encuentra registrado',
            icon: 'success',
        })
    }

    const warningAlert = () => {
        MySwal.fire({
            title:'Alerta',
            text: 'Es necesario validar el DNI ingresado',
            icon: 'warning',
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

    const getCodigosVacunadores = () =>{
        axios.get("http://localhost:8080/getCodigosVacunadores")
        .then((res) => {
            console.log(res.data)
            const allCodigos = res.data;
            setCodigosVacunadores(allCodigos);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getMailsVacunadores = () =>{
        axios.get("http://localhost:8080/getMailsVacunadores")
        .then((res) => {
            console.log(res.data)
            const allMails = res.data;
            setEmailsVacunadores(allMails);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getDnisVacunadores = () =>{
        axios.get("http://localhost:8080/getDnisVacunadores")
        .then((res) => {
            console.log(res.data)
            const allDnis = res.data;
            setDnisVacunadores(allDnis);
        })
        .catch(error => console.log('Error: ' + error));
    }

    useEffect(()=>{
        getZonas();
        getCodigosVacunadores();
        getMailsVacunadores();
        getDnisVacunadores();
    },[])

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
            successAlert()
        })
        .catch((error) => {
            console.log('Error: ' + error)
        });
    }
    
    // const verificarCodigoEnBD = (codigoParam) => {
    //     axios.get(`http://localhost:8080/getExisteCodigoVacunador?codigo=${codigoParam}`)
    //     .then((res) => {
    //         console.log(res.data)
    //         const response = res.data;
    //         setCodigoEnBd(response);
    //     })
    //     .catch(error => console.log('Error: ' + error));
    // }

    const verificarMail = (mailParam) => {
        console.log(`Verificar Email ${emailsVacunadores.includes(mailParam)}`)
        return emailsVacunadores.includes(mailParam)
    }

    const verificarCodigo = (codeParam) => {
        console.log(`Verificar Codigo ${codigosVacunadores.includes(+codeParam)}`)
        return codigosVacunadores.includes(+codeParam)
    }

    const verificarDni = (dniParam) => {
        console.log(`Verificar Dni ${dnisVacunadores.includes(+dniParam)}`)
        return dnisVacunadores.includes(+dniParam)
    }

    //HU VALIDAR DNI
    const numbers2 = /^[0-9]+$/;
    const validarDni = (evento) =>{
        evento.preventDefault();
        let dni = document.getElementById("dniForm").value
        console.log(dni)
        if(dni.length <= 0){
            errorAlert("El DNI no puede estar vacio")
            setValidoDni(false);
            return;
        }
        if (!dni.match(numbers2)) {
            errorAlert("Solo esta permitido ingresar caracteres numericos")
            setValidoDni(false);
            return;
        }
        if (dni.length < 6) {
            errorAlert("Ingrese un DNI valido")
            setValidoDni(false);
            return;
        }
        if(verificarDni(dni) == true){
            errorAlert("El DNI ingresado ya se encuentra registrado en el sistema");
            setValidoDni(false);
            return;
        }
        successAlert2()
        setValidoDni(true);
    }

    const verificarFormulario = (target) => {
        const newErrors = {}

        if (target.dni.value <= 0 || !target.dni.value || target.dni.value =="" ) {
            newErrors.dni="El DNI indicado es invalido, ingrese un DNI valido para continuar";
            return newErrors.dni;
        }
        
        if(!target.email.value || target.email.value=="" || target.email.value.length < 5){
            newErrors.email="El mail indicado es invalido";
            return newErrors.email;

        //Verificar mail con datos
        }else if(verificarMail(target.email.value) == true){
            newErrors.email="El mail indicado ya esta dado de alta en el sistema";
            return newErrors.email;
        }

        if(target.codigoUnico.value.length < 5 || !target.codigoUnico.value || target.codigoUnico.value==""){
            newErrors.codigoUnico="El codigo ingresado es invalido, ingrese una clave de 5 digitos";
            return newErrors.codigoUnico;
        }
        //Verificar codigo con datos
        else if(verificarCodigo(target.codigoUnico.value) == true){
            newErrors.codigoUnico = "El codigo ingresado ya se encuentra registrado en el sistema";
            return newErrors.codigoUnico;
        }
    
        if (!target.password || target.password.value.length <= 0 || target.password.value=="") {
            newErrors.password="La contraseña ingresada es invalida";
            return newErrors.password;
        } else if(target.password.value.length >= 1 && target.password.value.length < 6) {
            newErrors.password="La contraseña ingresada es demasiado corta debe tener al menos 6 caracteres";
            return newErrors.password;
        }
    }


    const handleKeyDown = (event) => {
        if (!event.key.match(alpha)) {
            event.preventDefault();
          }
    }

    //Sus
    const handleKeyDownPassword = (event) => {
        if ((event.key === " ")) {
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
        const newErrors = verificarFormulario(event.target);
        if(newErrors){
            console.log(newErrors)
            errorAlert(newErrors);
        }
        else{
            console.log(newErrors)
            if(validoDni == true){
                cargarVacunadorTry(event);
                setValidoDni(false)
            }
            else{
                warningAlert()
            }
        }
        return;
    }

    const Formulario = () =>{
        return(
            <Form onSubmit={handleSubmit}>
                <Form.Label>DNI</Form.Label>
                <Form.Group className="d-flex mb-3" >
                    <FormControl
                        type="text"
                        placeholder="..."
                        className="me-2"
                        aria-label="Search"
                        name="dni"
                        id="dniForm"
                    />
                    <Button variant="outline-success" type="submit" onClick={validarDni}>Validar</Button>
                </Form.Group>
                
                <Row>
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control name="apellido" type="text" placeholder="..." onKeyDown={handleKeyDown}/>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="..." />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-6" style={{}} controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control name="codigoUnico" type="text" placeholder="..."/>
                    </Form.Group>
                   
                </Row>


            
                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control name="password" type="password" placeholder="..." onKeyDown={handleKeyDownPassword} />
                </Form.Group>
                 
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
             
                {!validoDni ? 
                    (<Button variant="success" disabled type='submit'>
                        Dar de alta
                    </Button>) :
                     (<Button variant="success" type='submit'>
                        Dar de alta
                    </Button>)}
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