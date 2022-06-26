import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';
import { HeaderReporteVacunas } from '../../components/ReporteVacunas/HeaderReporteVacunas';
import { ReporteVacunas } from "../../components/ReporteVacunas/ReporteVacunas";
import axios from 'axios';

export const ReporteVacunasContainer = () => {
    const [ checkedCovid, setCheckedCovid ] = useState(true);
    const [ checkedColdWar, setCheckedColdWar ] = useState(false);
    const [ checkedYellow, setCheckedYellow ] = useState(false);
    const [ turnos, setTurnos ] = useState();
    const [ hasClicked, setHasClicked] = useState();
    
    useEffect(()=>{
        const fetchTurnosCovid = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosCovid");
                console.log(response.data)
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        fetchTurnosCovid();
        
    },[])
   
    useEffect(()=>{
        const fetchTurnosCovid = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosCovid");
                console.log(response.data)
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchTurnosGripe = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosGripe");
                console.log(response.data)
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchTurnosYellow = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosYellow");
                console.log(response.data)
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        if(hasClicked == 1){
            fetchTurnosCovid();
        }
        
        if(hasClicked == 2){
            fetchTurnosGripe();
        }

        if(hasClicked == 3){
            fetchTurnosYellow();
        }

    },[hasClicked])

    const handleClickedSelector = (e) => {
        console.log(e.target.control.name);
        console.log(e.target.control.value);
        setHasClicked(e.target.control.value);
    }

    return(
        <>
            <Container>
                    <HeaderReporteVacunas handleClickedSelector={handleClickedSelector} checkedCovid={checkedCovid} checkedColdWar={checkedColdWar} checkedYellow={checkedYellow} />
                    <Row>
                        <Col>
                            {turnos ? <ReporteVacunas turnos={turnos} /> : <SpinnerLoading/>}
                        </Col>
                    </Row>
                </Container>   
        </>
    )
}