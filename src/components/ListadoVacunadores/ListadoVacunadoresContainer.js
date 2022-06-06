import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';
import { HeaderVacunadores } from "./HeaderVacunadores";
import { ListadoVacunadores } from "./ListadoVacunadores";
import { SpinnerLoading } from "../Spinner/SpinnerLoading";

export const ListadoVacunadoresContainer = () => {   
    const [ vacunadores, setVacunadores ] = useState([]); 
    const [ vacunadorDni, setVacunadorDni ] = useState(); 
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

    const getVacunadores = () =>{
        axios.get("http://localhost:8080/getVacunadores")
        .then((res) => {
            console.log(res.data)
            const allVacunadores = res.data;
            setVacunadores(allVacunadores);
        })
        .catch(error => console.log('Error: ' + error));
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

    const getVacunadorPorDni = (dniBuscado) =>{
        axios.get(`http://localhost:8080/getVacunadorByDni/${+dniBuscado}`)
        .then((res) => {
            console.log(res.data)
            const searchedVacunador = res.data;
            setVacunadores(searchedVacunador);
            setISearchedButton(true);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getVacunadorPorZona = (dniBuscado) =>{
        axios.get(`http://localhost:8080/getVacunadorByDni/${dniBuscado}`)
        .then((res) => {
            console.log(res.data)
            const searchedVacunadores = res.data;
            setVacunadores(searchedVacunadores);
            setISearchedButton(true);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const handleDniSubmit = (event) =>{
        event.preventDefault();
        // console.log(event.target.dniInput);
        // if(clicked == 1){
        //      getVacunadorPorDni(event.target.dniInput.value);
        //      setISearchedButton(false);
        // }
    }

    const handleZonaSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.zonaId.value);
        // if(clicked == 3){
        //     getVacunadorPorZona();
        //     setISearchedButton(false);
        // }
        // else{
        //     getVacunadorPorDni(event.target.dniInput.value);
        // }
    }

    return(
        <>
        {mounted ?
            <Container className="mt-4">
                <HeaderVacunadores dni={dni} handleChange={handleChange} handleChangeSubmit={handleChangeSubmit} mounted={mounted} iSearchedButton={iSearchedButton} zonas={zonas} setClicked={setClicked} handleZonaSubmit={handleZonaSubmit} handleDniSubmit={handleDniSubmit} />
                <Row>
                    <Col md={8}>
                        <ListadoVacunadores clicked={clicked} vacunadorDni={vacunadorDni} vacunadores={vacunadores} />
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