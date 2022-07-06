import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';
import { HeaderReporteVacunas } from '../../components/ReporteVacunas/HeaderReporteVacunas';
import { ReporteVacunas } from "../../components/ReporteVacunas/ReporteVacunas";
import { ChartInside } from '../../components/ReporteVacunas/ChartInside';
import axios from 'axios';

export const ReporteVacunasContainer = () => {
    const [ checkedCovid, setCheckedCovid ] = useState(true);
    const [ checkedColdWar, setCheckedColdWar ] = useState(false);
    const [ checkedYellow, setCheckedYellow ] = useState(false);
    const [ reporteChart, setReporteChart ] = useState();
    const [ turnos, setTurnos ] = useState();
    const [ hasClicked, setHasClicked] = useState();
    
    const fetchReporteCovid = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteCovid");
            setReporteChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const fetchReporteGripe = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteGripe");
            setReporteChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const fetchReporteYellow = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteYellow");
            setReporteChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }
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
        fetchReporteCovid();

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
            fetchReporteCovid();
            setCheckedCovid(true);
            setCheckedColdWar(false);
            setCheckedYellow(false);
        }
        
        if(hasClicked == 2){
            fetchTurnosGripe();
            fetchReporteGripe();
            setCheckedCovid(false);
            setCheckedColdWar(true);
            setCheckedYellow(false);
        }

        if(hasClicked == 3){
            fetchTurnosYellow();
            fetchReporteYellow();
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
                            {turnos && reporteChart ? 
                            <>
                                <ReporteVacunas turnos={turnos} hasClicked={hasClicked} /> 
                                <ChartInside reporteChart={reporteChart} />
                            </>
                            : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}