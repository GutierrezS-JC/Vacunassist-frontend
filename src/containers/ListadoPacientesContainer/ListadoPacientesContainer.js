import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';
import { HeaderPacientes} from "../../components/ListadoPacientes/HeaderPacientes";
import { ListadoPacientes } from "../../components/ListadoPacientes/ListadoPacientes";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";

export const ListadoPacientesContainer = () => {   
    const [ pacientes, setPacientes ] = useState([]); 
    const [ zonas, setZonas ] = useState(); 
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const [ spinner, setSpinner] = useState(false);

    const [dni, setDni] = useState('')
    const [zonaId, setZonaId] = useState('')

    useEffect(()=>{

        const fetchZonas = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/getZonas");
                setZonas(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchPacientes = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getPacientes");
                console.log(response.data)
                setPacientes(response.data)
                setISearchedButton(false);
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchPacientesPorDni = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/getPacienteByDni/${+dni}`)
                console.log(response);
                setPacientes(response.data)
                setISearchedButton(true);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchPacientesPorZona = async () =>{
            try{
                const response = await axios.get(`http://localhost:8080/getPacientesEnZona?zonaId=${+zonaId}`)
                console.log(response.data)
                setPacientes(response.data)
                setISearchedButton(true);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        //No necesitamos condicion para hacer un fetch de las zonas okk
        fetchZonas();

        if(clicked == 0){
            fetchPacientes();
            setMounted(true)
        }

        if (clicked == 1){
            fetchPacientesPorDni()
            setMounted(true)
        }

        if (clicked == 2){
            fetchPacientesPorZona()
            setMounted(true)   
        }
    }, [clicked])

    const handleChange = (event) => {
        console.log(event.target.value);
        setDni(event.target.value);
    };

    const handleChangeSubmit = (event) => {
        console.log(event.target.value);
        setZonaId(event.target.value);
    };

    const handleDniSubmit = (event) =>{
        event.preventDefault();
    }

    const handleZonaSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.zonaId.value);
    }

    return(
        <>
        {mounted ?
            <Container className="mt-4">
                <HeaderPacientes dni={dni} handleChange={handleChange} handleChangeSubmit={handleChangeSubmit} mounted={mounted} iSearchedButton={iSearchedButton} zonas={zonas} setClicked={setClicked} handleZonaSubmit={handleZonaSubmit} handleDniSubmit={handleDniSubmit} />
                <Row>
                    <Col md={8}>
                        <ListadoPacientes pacientes={pacientes} />
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Vac} />
                    </Col>
                </Row>
            </Container>  
        : <SpinnerLoading/>    
        }  
        </>
    )
}