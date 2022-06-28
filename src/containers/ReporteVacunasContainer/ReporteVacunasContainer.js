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
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchTurnosGripe = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosGripe");
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchTurnosYellow = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getTurnosYellow");
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        if(hasClicked == 1){
            fetchTurnosCovid();
            setCheckedCovid(true);
            setCheckedColdWar(false);
            setCheckedYellow(false);
        }
        
        if(hasClicked == 2){
            fetchTurnosGripe();
            setCheckedCovid(false);
            setCheckedColdWar(true);
            setCheckedYellow(false);
        }

        if(hasClicked == 3){
            fetchTurnosYellow();
            setCheckedCovid(false);
            setCheckedColdWar(false);
            setCheckedYellow(true);
        }

    },[hasClicked])

    const handleClickedSelector = (e) => {
        setHasClicked(e.target.control.value);
    }

    return(
        <>
            <Container className='mt-3'>
                <HeaderReporteVacunas handleClickedSelector={handleClickedSelector} checkedCovid={checkedCovid} checkedColdWar={checkedColdWar} checkedYellow={checkedYellow} />
                <Row>
                    <Col>
                            {turnos ? <ReporteVacunas turnos={turnos} hasClicked={hasClicked} /> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}