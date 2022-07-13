import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderTurnos } from "../../components/BuscarTurno/HeaderTurnos";
import { BuscarTurno } from "../../components/BuscarTurno/BuscarTurno";

export const BuscarTurnoContainer = () => {
    const [ turnos, setTurnos ] =useState ();
    const [ dni, setDni ] = useState('');
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();

    const handleEmpty = () => {
        setTurnos();
        setISearchedButton(false);
    }

    const fetchTurnosPaciente = async () =>{
        try{
            const response = await axios.get(`http://localhost:8080/getTurnosFuturosPorDni?dni=${+dni}`)
            console.log(response.data)
            setTurnos(response.data)
            setISearchedButton(true);
        }
        catch(err){
            console.log(err.stack)
        }
    }

    const handleChange = (event) => {
        setDni(event.target.value);
    };

    const handleDniSubmit = (event) =>{
        event.preventDefault();
    }


    return(
        <Container className="mt-4">
            <h1 className="display-5">Turnos pendientes - paciente</h1>
            <HeaderTurnos fetchTurnosPaciente={fetchTurnosPaciente} handleEmpty={handleEmpty} dni={dni} handleChange={handleChange} mounted={mounted} iSearchedButton={iSearchedButton} setClicked={setClicked} handleDniSubmit={handleDniSubmit} />
            <Row>
                <Col>
                    <BuscarTurno turnos={turnos} />
                </Col>
            </Row>
        </Container>    
    )
}