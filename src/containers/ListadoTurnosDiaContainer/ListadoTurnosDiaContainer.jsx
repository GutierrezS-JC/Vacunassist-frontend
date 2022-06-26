import { ListadoTurnosDia } from "../../components/ListadoTurnosDia/ListadoTurnosDia";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import es from "date-fns/esm/locale/es/index.js";

export const ListadoTurnosDiaContainer = () => {
    const [ turnosDia, setTurnosDia ] = useState();
    const { format } = require("date-fns");

    useEffect(()=>{
        const fetchTurnosDia = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosDia");
                setTurnosDia(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        fetchTurnosDia();
        
    },[])

    return(
        <>
            <Container className='mt-3'>
                <h1 className="display-5">Listado de turnos: {format(new Date(),"dd 'de' MMMM yyyy", { locale: es })}</h1>
                <Row className="mt-4">
                    <Col>
                        {turnosDia ? <ListadoTurnosDia turnosDia={turnosDia} /> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}