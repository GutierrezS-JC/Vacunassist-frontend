import axios from "axios";
import Swal from 'sweetalert2'
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg';
import withReactContent from 'sweetalert2-react-content'
import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { RegistroVacunador } from "../../components/RegistroVacunador/RegistroVacunador";
import { Link } from "react-router-dom";

export const RegistroVacunadorContainer = () =>{
    const [ hasClicked, setHasClicked ] = useState(false)
    const [ spinner, setSpinner ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const MySwal = withReactContent(Swal)
    
    const [ mounted, setMounted ] = useState();
    const [ zonas, setZonas ] = useState(); 
    const [ codigosVacunadores, setCodigosVacunadores ] = useState();
    const [ dnisVacunadores, setDnisVacunadores ] = useState();
    const [ emailsVacunadores, setEmailsVacunadores ] = useState();
    const [ validoDni, setValidoDni ] = useState(false)
    const [ buttonDni, setButtonDni ] = useState(false)

    const [vacunadorForm, setVacunadorForm] = useState({
        dni: '',
        email: '',
        nombre: '',
        apellido: '',
        clave: '',
        password: '',
        zonaId:''
    })

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

    useEffect(()=>{
        console.log("useEffect en contenedor")

        const fetchZonas = async () =>{
            console.log("En fetchZonas")
            try{
                const response = await axios.get("http://localhost:8080/getZonas");
                console.log(response.data)
                setZonas(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchCodigosVacunadores = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getCodigosVacunadores")
                setCodigosVacunadores(response.data);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchEmailsVacunadores = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getMailsVacunadores");
                setEmailsVacunadores(response.data);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchDnisVacunadores = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getDnisVacunadores");
                setDnisVacunadores(response.data);
            }
            catch(err){
                console.log(err.stack)
            }
        }
        console.log("Arriba de FetchZonas")
        fetchZonas();
        fetchCodigosVacunadores();
        fetchEmailsVacunadores();
        fetchDnisVacunadores();

        setMounted(true)
    },[])

    const cargarVacunadorTry = () => {
        console.log(vacunadorForm)
        axios.post("http://localhost:8080/cargarVacunador",{   
            id: 0,
            dni: +vacunadorForm.dni,
            email: vacunadorForm.email,
            nombre: vacunadorForm.nombre,
            apellido: vacunadorForm.apellido,
            clave: +vacunadorForm.clave,
            password: vacunadorForm.password,
            fechaNacimiento: "2022-06-02T16:07:44.129Z",
            rolId: 2,
            zonaId: +vacunadorForm.zonaId
        }).then((res)=>{
            console.log(res.data)
            successAlert()
        })
        .catch((error) => {
            console.log('Error: ' + error)
        });
    }
    
    // Verificacion en JS
    const verificarMail = () => {
        console.log(`Verificar Email ${emailsVacunadores.includes(vacunadorForm.email)}`)
        return emailsVacunadores.includes(vacunadorForm.email)
    }

    const verificarCodigo = () => {
        console.log(`Verificar Codigo ${codigosVacunadores.includes(+vacunadorForm.clave)}`)
        return codigosVacunadores.includes(+vacunadorForm.clave)
    }

    // Validad DNI --> Ver abajo
    const verificarDni = () => {
        console.log(`Verificar Dni ${dnisVacunadores.includes(+vacunadorForm.dni)}`)
        return dnisVacunadores.includes(+vacunadorForm.dni)
    }

    //HU VALIDAR DNI
    const numbers2 = /^[0-9]+$/;
    const validarDni = () =>{
        if(vacunadorForm.dni.length <= 0 || vacunadorForm.dni == ""){
            errorAlert("El DNI no puede estar vacio")
            setValidoDni(false);
            return;
        }
        if (!vacunadorForm.dni.match(numbers2)) {
            errorAlert("Solo esta permitido ingresar caracteres numericos")
            setValidoDni(false);
            return;
        }
        if (vacunadorForm.dni.length >=1 && vacunadorForm.dni.length < 6) {
            errorAlert("Ingrese un DNI valido")
            setValidoDni(false);
            return;
        }

        //Aca usamos el cerificar DNI de arriba O.o
        if(verificarDni() == true){
            errorAlert("El DNI ingresado ya se encuentra registrado en el sistema");
            setValidoDni(false);
            return;
        }
        successAlert2()
        setValidoDni(true);
    }

    const verificarFormulario = () => {
        const newErrors = {}

        // if (!vacunadorForm.dni || vacunadorForm.dni.length <= 0 || vacunadorForm.dni == "" ) {
        //     newErrors.dni="El DNI indicado es invalido, ingrese un DNI valido para continuar";
        //     return newErrors.dni;
        // }
        
        if(!vacunadorForm.email|| vacunadorForm.email.length < 5 || vacunadorForm.email == ""){
            newErrors.email="El mail indicado es invalido";
            return newErrors.email;

        //Verificar mail con datos
        }else if(verificarMail() == true){
            newErrors.email="El mail indicado ya esta dado de alta en el sistema";
            return newErrors.email;
        }

        if(!vacunadorForm.clave || vacunadorForm.clave.length < 4 || vacunadorForm.clave == ""){
            newErrors.codigoUnico="El codigo ingresado es invalido, ingrese una clave de 5 digitos";
            return newErrors.codigoUnico;
        }

        //Verificar codigo con datos
        else if(verificarCodigo() == true){
            newErrors.codigoUnico = "El codigo ingresado ya se encuentra registrado en el sistema";
            return newErrors.codigoUnico;
        }
    
        if (!vacunadorForm.password || vacunadorForm.password.length <= 0 || vacunadorForm.password == "") {
            newErrors.password="La contraseña ingresada es invalida";
            return newErrors.password;
        } else if(vacunadorForm.password.length >= 1 && vacunadorForm.password.length < 6) {
            newErrors.password="La contraseña ingresada es demasiado corta debe tener al menos 6 caracteres";
            return newErrors.password;
        }
    }


    // const handleKeyDown = (event) => {
    //     if (!event.key.match(alpha)) {
    //         event.preventDefault();
    //       }
    // }

    // //Sus
    // const handleKeyDownPassword = (event) => {
    //     if ((event.key === " ")) {
    //         event.preventDefault();
    //     } 
    // }
    
    // const handleKeyDownNumbers = (event) => {
    //     if (!event.key.match(numbers)) {
    //         event.preventDefault();
    //       }
    // }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const newErrors = verificarFormulario();
        if(newErrors){
            errorAlert(newErrors);
        }
        else{
            if(validoDni == true){
                cargarVacunadorTry();
                setValidoDni(false)
            }
            else{
                warningAlert()
            }
        }
        return;
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setVacunadorForm({ ...vacunadorForm, [event.target.name]: event.target.value });
    }

    return(
        <>
        {mounted ?
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
                            <RegistroVacunador mounted={mounted} handleChange={handleChange} handleSubmit={handleSubmit}
                            zonas={zonas} validoDni={validoDni} dni={vacunadorForm.dni} 
                            nombre={vacunadorForm.nombre} apellido={vacunadorForm.apellido} email={vacunadorForm.email}
                             clave={vacunadorForm.clave} password={vacunadorForm.password} zonaId={vacunadorForm.zonaId}
                             validarDni={validarDni}/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        : <p>Cargando</p>}
        </>
    )
}