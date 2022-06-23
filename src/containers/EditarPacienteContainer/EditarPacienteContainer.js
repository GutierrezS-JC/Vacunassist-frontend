import axios from 'axios';
import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { EditarPaciente } from '../../components/EditarPaciente/EditarPaciente';
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import { useAuth } from "../../providers/useAuth"
import React from 'react';


export const EditarPacienteContainer = () => {
    const auth = useAuth();
    const MySwal = withReactContent(Swal);
    const [ mounted, setMounted ] = useState(false)
    const [ hasClicked, setHasClicked ] = useState(0)
    const [ spinner, setSpinner ] = useState(false);
    const [ paciente, setPaciente ] = useState();
    const [ passwordActual, setPasswordActual ] = useState(); 
    const [ zonas, setZonas ] = useState(); 
    
    const [pacienteForm, setPacienteForm] = useState({
        nombre: '',
        apellido: '',
        password: '',
        zonaId:'',
        dni:'',
        deRiesgo: false,
    })

    console.log(pacienteForm)
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
  
    useEffect(()=>{

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

        const getPassword = async() => {
            try{
                const response = await axios.get(`http://localhost:8080/getPasswordPaciente?dni=${auth.user.dni}`)
                console.log(response.data)
                setPasswordActual(response.data)
            }
            catch(err){
                console.log(err)
            }
        }

        const fetchPaciente = async() => {
            console.log("En fetchPaciente")
            console.log(auth.user.dni)
            try{
                const response = await axios.get(`http://localhost:8080/getPacienteByDni/${auth.user.dni}`);
                setPaciente(response.data[0])
                pacienteForm.nombre = response.data[0].nombre;
                pacienteForm.apellido = response.data[0].apellido
                pacienteForm.zonaId = response.data[0].zona.id;
                pacienteForm.dni = response.data[0].dni;
                pacienteForm.deRiesgo = response.data[0].esRiesgo
                console.log(pacienteForm)
            }
            catch(err){
                console.log(err)
            }
        }
        
        fetchZonas();
        fetchPaciente();
        getPassword();
        setMounted(true)
    },[])

    useEffect(()=>{
        console.log('En segundo useEffect')

        const fetchPaciente = async() => {
            console.log("En fetchPaciente 2")
            try{
                const response = await axios.get(`http://localhost:8080/getPacienteByDni/${auth.user.dni}`);
                setPaciente(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }
        const editarPaciente = async() => {
            console.log("En editar paciente 2")
            try{
                const response = await axios.put(`http://localhost:8080/editarPaciente?nombre=${pacienteForm.nombre}&apellido=${pacienteForm.apellido}&password=${pacienteForm.password}&idZona=${pacienteForm.zonaId}&dni=${pacienteForm.dni}&deRiesgo=${pacienteForm.deRiesgo}`);
                if(response.data == true && response!= null){
                    fetchPaciente();
                    successAlert("Su perfil se ha actualizado con exito")
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if(hasClicked == 1){
            editarPaciente();
            setHasClicked(0)
        }

    },[hasClicked])

    // useEffect(() => {
    //     console.log("UseEffect 3")

    //     const validarPassword = async() =>{
    //         try{
    //             const response = await axios.get(`http://localhost:8080/getVacunadorByDni?password=${vacunadorForm.password}&dni=${vacunadorForm.dni}`)
    //             if(response.data == true && response!=null){

    //             }
    //         }
    //         catch(err){

    //         }
    //     }

    // }, [validarPassword])

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

    const verificarZona = () =>{
        return (auth.user.zona.id == pacienteForm.zonaId);
    }

    const verificarPassword = () => {
        return (pacienteForm.password == passwordActual)
    }

    const verificarFormularioPaciente = () => {

        const newErrors = {}
        if(!pacienteForm.nombre || pacienteForm.nombre == ""){
            newErrors.nombre="Debe ingresar un nombre"
            return newErrors.nombre;
        }
        
        /* if(pacienteForm.password.length == 0){
            console.log(pacienteForm.password)
            newErrors.password="Debe ingresar una contraseña"
            return newErrors.password;
        } */

        if(pacienteForm.password.length >= 1 && pacienteForm.password.length < 6 ){
            newErrors.password="La contraseña debe ser mayor a 6 caracteres"
            return newErrors.password;
        }

        if(verificarPassword()){
            newErrors.password="Debe ingresar una contraseña distinta a la actual";
            return newErrors.password;
        }

        if((verificarPassword()) || (verificarZona()) || (auth.user.nombre==pacienteForm.nombre) || (auth.user.nombre==pacienteForm.apellido)){
            newErrors.datos="Debe modificar algún dato para guardar los cambios";
            return newErrors.datos;
        }
            
        // if((verificarPassword()) && (verificarZona()) && (response.data[0].nombre==pacienteForm.nombre) && (response.data[0].apellido==pacienteForm.apellido)){
        //     newErrors.datos="Debe modificar algún dato para guardar los cambios";
        //     console.log(response.data)
        //     return newErrors.datos;
        // }

        /* if(verificarZona()){
            newErrors.zona="Esta asignando la misma zona de vacunacion";
            return newErrors.zona;
        } */
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(paciente)
        const newErrors = verificarFormularioPaciente();
        console.log(newErrors)
        if(newErrors){
            errorAlert(newErrors);
        }
        else{
            setHasClicked(1)
        }
        return;
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setPacienteForm({ ...pacienteForm, [event.target.name]: event.target.value });
    }

    const handleChecked = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked)
        setPacienteForm({ ...pacienteForm, [event.target.name]: event.target.checked });
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
                            {zonas ? (<EditarPaciente zonas={zonas} pacienteForm={pacienteForm} handleSubmit={handleSubmit} handleChange={handleChange} handleChecked={handleChecked}/>) : (<><p>No hay nada</p></>)}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}