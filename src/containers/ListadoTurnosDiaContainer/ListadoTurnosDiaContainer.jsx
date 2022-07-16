import { ListadoTurnosDia } from "../../components/ListadoTurnosDia/ListadoTurnosDia";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import es from "date-fns/esm/locale/es/index.js";
import { useAuth } from "../../providers/useAuth";

export const ListadoTurnosDiaContainer = () => {
    const auth = useAuth()
    const [ turnosDia, setTurnosDia ] = useState();
    const { format } = require("date-fns");

    const fetchTurnosDia = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/getTurnosDiaVacunatorio?vacunatorioId=${auth.user.zona.vacunatorio.id}`);
            setTurnosDia(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    useEffect(()=>{
        fetchTurnosDia();
        
    },[])

    const registrarInasistenciaTurno = async (turnoId) => {
        try{
            const response = await axios.post(`http://localhost:8080/registrarInasistenciaTurno?turnoId=${turnoId}`);
            if (response.data){
                fetchTurnosDia();
            }
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const registrarAsistenciaTurno = async (turnoId) => {
        try{
            const response = await axios.post(`http://localhost:8080/registrarAsistenciaTurno?turnoId=${turnoId}`);
            if (response.data){
                fetchTurnosDia();
            }
        }
        catch(e){
            console.log(e.stack)
        }
    }

    return(
        <>
            <Container className='mt-3'>
                <h1 className="display-5">Listado de turnos: {format(new Date(),"dd 'de' MMMM yyyy", { locale: es })}</h1>
                <Row className="mt-4">
                    <Col>
                        {turnosDia ? <ListadoTurnosDia turnosDia={turnosDia} registrarAsistenciaTurno={registrarAsistenciaTurno} registrarInasistenciaTurno={registrarInasistenciaTurno} /> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}