import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';
import { HeaderTurnos } from "../../components/BuscarTurno/HeaderTurnos";
import { BuscarTurno } from "../../components/BuscarTurno/BuscarTurno";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import MySwal from "sweetalert2";


export const BuscarTurnoContainer = () => {
    const [ turnos, setTurnos ] =useState ([]);

    const [dni, setDni] = useState('');

    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const [ spinner, setSpinner] = useState(false);

    const handleChange = (event) => {
        console.log(event.target.value);
        setDni(event.target.value);
    };

    const handleDniSubmit = (event) =>{
        event.preventDefault();
    }

    return(
        <>
            <Container className="mt-4">
                <HeaderTurnos dni={dni} handleChange={handleChange} mounted={mounted} iSearchedButton={iSearchedButton} setClicked={setClicked} handleDniSubmit={handleDniSubmit} />
                <Row>
                    <Col md={8}>
                        <BuscarTurno turnos={turnos} />
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Vac}/>
                    </Col>
                </Row>
            </Container>    
        </>
    )
}