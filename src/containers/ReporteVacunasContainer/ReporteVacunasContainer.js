import Report from '../../img/Report.svg';
import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';
import { HeaderReporteVacunas } from '../../components/ReporteVacunas/HeaderReporteVacunas';
import { ReporteVacunas } from "../../components/ReporteVacunas/ReporteVacunas";
import { ChartInside } from '../../components/ReporteVacunas/ChartInside';
import axios from 'axios';
import '../../styles/reporteVacunas.css';

export const ReporteVacunasContainer = () => {
    const [ checkedCovid, setCheckedCovid ] = useState(false);
    const [ checkedColdWar, setCheckedColdWar ] = useState(false);
    const [ checkedYellow, setCheckedYellow ] = useState(false);
    const [ reporteChart, setReporteChart ] = useState();
    const [ turnos, setTurnos ] = useState();
    const [ hasClicked, setHasClicked] = useState(0);
    
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

    // useEffect inicial
    // useEffect(()=>{
    //     fetchTurnosCovid();
    //     fetchReporteCovid();
    // },[])
   
    // useEffect cada vez que hago click
    useEffect(()=>{

        if(hasClicked == 0){
            setTurnos()
            setCheckedCovid(false);
            setCheckedColdWar(false);
            setCheckedYellow(false);
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
        setHasClicked(hasClicked == e.target.control.value ? 0 : e.target.control.value);
    }

    const Nothing = () =>{
        return(
            <>
                <img alt="notFound" className="notFound" src={Report} /> 
                <p className="text-center fs-4 fw-light">Seleccione alguna de las vacunas para generar un reporte</p> 
            </>
        )
    }

    return(
        <>
            <Container className='mt-3'>
                <HeaderReporteVacunas handleClickedSelector={handleClickedSelector} checkedCovid={checkedCovid} checkedColdWar={checkedColdWar} checkedYellow={checkedYellow} />
                <Row>
                    <Col>
                            {turnos ? 
                            <>
                                <ReporteVacunas turnos={turnos} hasClicked={hasClicked} /> 
                                {/* <ChartInside reporteChart={reporteChart} /> */}
                            </>
                            : <Nothing/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}