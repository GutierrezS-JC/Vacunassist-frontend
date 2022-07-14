import axios from 'axios';
import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { EditarPaciente, RegistrarAplicacionVacuna } from '../../components/RegistrarAplicacionVacuna/RegistrarAplicacionVacuna';
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import { useAuth } from "../../providers/useAuth"
import React from 'react';
import { useNavigate } from "react-router-dom";

export const RegistrarAplicacionVacunaContainer = () => {
    const auth = useAuth();
    const MySwal = withReactContent(Swal);
    const [ mounted, setMounted ] = useState(false)
    const [ hasClicked, setHasClicked ] = useState(0)
    const [ vacunas, setVacunas ] = useState();

    const [AplicacionForm, setAplicacionForm] = useState({
        dni: '',
        vacuna: '',
        vacunatorio: auth.user.zona_id,
        vacunador_id: auth.user.id,
    })

    console.log(AplicacionForm)
    const numbers = /[0-9]/; 

    const successAlert = () => {
        MySwal.fire({
            title: 'La aplicacion se registro correctamente!',
            icon: 'success',
        })
    }

    const errorAlert = (error) => {
        MySwal.fire({
            title: 'La aplicacion no se ha podido registrar',
            text: error,
            icon: 'error',
        })
    }
  
    useEffect(()=>{
        const fetchVacunas = async () =>{
            console.log("En fetchVacunas")
            try{
                const response = await axios.get("http://localhost:8080/getVacunas");
                console.log(response.data)
                setVacunas(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }
        fetchVacunas();
        setMounted(true)
    },[])
/*
    const verificarFormularioAplicacion = () => {
        const newErrors = {}
        if((verificarZona()) && (auth.user.nombre==pacienteForm.nombre) && (auth.user.apellido==pacienteForm.apellido) && (auth.user.esRiesgo==pacienteForm.deRiesgo)){
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
        } 
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        //console.log(paciente)
        const newErrors = verificarFormularioAplicacion();
        console.log(newErrors)
        if(newErrors){
            errorAlert(newErrors);
        }
        else{
            setHasClicked(1)
        }
        return;
    }*/
/*
    const handleChange = (event) => {
        console.log(event.target.value)
        setPacienteForm({ ...pacienteForm, [event.target.name]: event.target.value });
    }

    const handleChecked = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked)
        setPacienteForm({ ...pacienteForm, [event.target.name]: event.target.checked });
    }
*/
    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Registrar aplicacion de vacuna</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Registrar aplicacion de vacuna</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                        <RegistrarAplicacionVacuna datosForm={AplicacionForm} vacunas={vacunas} />
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}