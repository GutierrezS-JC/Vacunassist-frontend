import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';
import { HeaderVacunadores } from "../../components/ListadoVacunadores/HeaderVacunadores";
import { ListadoVacunadores } from "../../components/ListadoVacunadores/ListadoVacunadores";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import MySwal from "sweetalert2";

export const ListadoVacunadoresContainer = () => {   
    const [ vacunadores, setVacunadores ] = useState([]); 
    const [ zonas, setZonas ] = useState(); 
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const [ spinner, setSpinner] = useState(false);

    const [dni, setDni] = useState('')
    // Cambiar por un 1 y ordenar BD
    const [zonaId, setZonaId] = useState('1') 

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

        const fetchVacunadores = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getVacunadores");
                console.log(response.data)
                setVacunadores(response.data)
                setISearchedButton(false);
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchVacunadorPorDni = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/getVacunadorByDni/${+dni}`)
                console.log(response);
                setVacunadores(response.data)
                setISearchedButton(true);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchVacunadoresPorZona = async () =>{
            try{
                const response = await axios.get(`http://localhost:8080/getVacunadoresEnZona?zonaId=${+zonaId}`)
                console.log(response.data)
                setVacunadores(response.data)
                setISearchedButton(true);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        //No necesitamos condicion para hacer un fetch de las zonas okk
        fetchZonas();

        if(clicked == 0){
            fetchVacunadores();
            setMounted(true)
        }

        if (clicked == 1){
            fetchVacunadorPorDni()
            setMounted(true)
        }

        if (clicked == 2){
            fetchVacunadoresPorZona()
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

    const eliminar = (eventId)=>{
        const fetchVacunadores = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getVacunadores");
                console.log(response.data)
                setVacunadores(response.data)
                setISearchedButton(false);
            }
            catch(e){
                console.log(e.stack)
            }
        }

        MySwal.fire({
            title: '¿Está seguro que desea eliminarlo?',
            text: 'Esta acción no podrá revertirse!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if(result.isConfirmed) {
                const response = await axios.delete(`http://localhost:8080/deleteVacunador?vacunadorId=${eventId}`);
                if(response.data == true){
                    fetchVacunadores();
                    MySwal.fire(
                        'Eliminado',
                        'El vacunador ha sido eliminado!',
                        'success'
                    )
                    setClicked(0)
                }
            }
        })
    }

    return(
        <>
        {mounted ?
            <Container className="mt-4">
                <HeaderVacunadores dni={dni} handleChange={handleChange} handleChangeSubmit={handleChangeSubmit} mounted={mounted} iSearchedButton={iSearchedButton} zonas={zonas} setClicked={setClicked} handleZonaSubmit={handleZonaSubmit} handleDniSubmit={handleDniSubmit} />
                <Row>
                    <Col md={8}>
                        <ListadoVacunadores vacunadores={vacunadores} eliminar={eliminar} setClicked={setClicked} />
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Vac}/>
                    </Col>
                </Row>
            </Container>  
        : <SpinnerLoading/>    
        }  
        </>
    )
}