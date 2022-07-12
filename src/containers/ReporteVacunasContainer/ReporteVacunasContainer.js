import Report from '../../img/Report.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import format from "date-fns/format";
import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'; 
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';
import { HeaderReporteVacunas } from '../../components/ReporteVacunas/HeaderReporteVacunas';
import { ReporteVacunas } from "../../components/ReporteVacunas/ReporteVacunas";
import axios from 'axios';
import '../../styles/reporteVacunas.css';

export const ReporteVacunasContainer = () => {
    const MySwal = withReactContent(Swal)
    const [ checkedCovid, setCheckedCovid ] = useState(false);
    const [ checkedColdWar, setCheckedColdWar ] = useState(false);
    const [ checkedYellow, setCheckedYellow ] = useState(false);

    const [ reporteCovidChart, setReporteCovidChart ] = useState();
    const [ reporteGripeChart, setReporteGripeChart ] = useState();
    const [ reporteYellowChart, setReporteYellowChart ] = useState();
    
    const [ turnos, setTurnos ] = useState();
    const [ hasClicked, setHasClicked] = useState(0);
    
    const [ vacunatorios, setVacunatorios ] = useState();
    const [ iSearchedButton, setIsearchedButton ] = useState(false);

    const [ searchForm, setSearchForm ] = useState({
        pacienteDni:'',
        vacunaId: '',
        vacunatorioId: '',
        fechaInicio: null,
        fechaFin: null
    })
    
    const warningAlert = (warning) => {
        MySwal.fire({
            title: 'Alerta',
            text: warning,
            icon: 'warning',
        })
    }

    // As component
    const Nothing = () =>{
        return(
            <>
                <img alt="notFound" className="notFound" src={Report} /> 
                <p className="text-center fs-4 fw-light">Seleccione alguna de las vacunas para generar un reporte</p> 
            </>
        )
    }

    const fetchReporteCovid = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteCovid");
            setReporteCovidChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const fetchReporteGripe = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteGripe");
            setReporteGripeChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const fetchReporteYellow = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getReporteYellow");
            setReporteYellowChart(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }


    // Used in form
    const fetchVacunatorios = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getVacunatorios");
            setVacunatorios(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    // useEffect inicial
    useEffect(()=>{
        fetchVacunatorios();
    },[])
   
    // useEffect cada vez que hago click
    // Notar que los valores no corresponden con el toggle sino con los IDS de la BD
    useEffect(()=>{

        if(hasClicked == 0){
            setSearchForm({ ...searchForm, 'vacunaId': '' });
            setCheckedCovid(false);
            setCheckedColdWar(false);
            setCheckedYellow(false);
        }

        if(hasClicked == 1){
            // fetchReporteCovid();
            setSearchForm({ ...searchForm, 'vacunaId': 1 });
            setCheckedCovid(true);
            setCheckedColdWar(false);
            setCheckedYellow(false);
        }
        
        if(hasClicked == 2){
            setSearchForm({ ...searchForm, 'vacunaId': 4 });
            setCheckedCovid(false);
            setCheckedColdWar(true);
            setCheckedYellow(false);
        }

        if(hasClicked == 3){
            setSearchForm({ ...searchForm, 'vacunaId': 5 });
            setCheckedCovid(false);
            setCheckedColdWar(false);
            setCheckedYellow(true);
        }

    },[hasClicked])

    const ordenarMayorMenor = (array) => {
        console.log(array)
        let arraySave = array.sort(function (a,b) {
            return new Date(a.fechaAplicacion) - new Date(b.fechaAplicacion)
        });
        console.log(array)
        setTurnos(arraySave);
    }

    const ordenarMenorMayor = (array) => {
        console.log(array)
        let arraySave = array.sort(function (a,b) {
            return new Date(b.fechaAplicacion) - new Date(a.fechaAplicacion)
        });
        console.log(array)
        setTurnos(arraySave);
    }

    const handleClickedSelector = (e) => {
        setHasClicked(hasClicked == e.target.control.value ? 0 : e.target.control.value);
    }

    const handleChange = (event) => {
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
    };

    const handleDateChange = (event, fecha) => {
        setSearchForm({...searchForm, [fecha] : event})
    }

    // Una vez hecho click en generar reporte muteamos los inputs 
    const generarListado = async () => {
        try{
            const response = await axios.post("http://localhost:8080/generarListadoReporte",{
                pacienteDni: searchForm.pacienteDni,
                vacunaId: searchForm.vacunaId,
                vacunatorioId: searchForm.vacunatorioId == 0 ? '' : searchForm.vacunatorioId,
                fechaInicio: format(new Date(searchForm.fechaInicio),"yyyy-MM-dd"),
                fechaFin: format(new Date(searchForm.fechaFin),"yyyy-MM-dd")
            });
            setIsearchedButton(true);
            setTurnos(response.data)
            fetchReporteCovid();
            fetchReporteGripe();
            fetchReporteYellow();
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const unclicked = () =>{
        setTurnos()
        setIsearchedButton(false)
    }

    const verificarFormulario = () => {
        const newErrors = {}
        if (!searchForm.fechaInicio || searchForm.fechaInicio == null || !searchForm.fechaFin || searchForm.fechaFin == null){
            newErrors.fecha="Debe seleccionar una fecha de inicio y una fecha de fin para generar el reporte"
            return newErrors.fecha
        }
    }

    const handleSearchSubmit = () => {
        const alert = verificarFormulario();
        console.log(alert)
        if(alert){
            warningAlert(alert)
        }
        else{
            console.log('Todo good')
            generarListado();
        }
        return;
    }

    return(
        <>
            <Container className='mt-3'>
                {vacunatorios ? 
                    <HeaderReporteVacunas handleSearchSubmit={handleSearchSubmit} unclicked={unclicked} generarListado={generarListado} handleDateChange={handleDateChange} vacunatorios={vacunatorios} iSearchedButton={iSearchedButton}
                    handleChange={handleChange} searchForm={searchForm} handleClickedSelector={handleClickedSelector}
                    checkedCovid={checkedCovid} checkedColdWar={checkedColdWar} checkedYellow={checkedYellow} />
                :
                    <SpinnerLoading/>
                }
                <Row>
                    <Col>
                            {turnos && reporteCovidChart && reporteGripeChart && reporteYellowChart ? 
                            <>
                                <ReporteVacunas reporteCovidChart={reporteCovidChart} reporteGripeChart={reporteGripeChart} reporteYellowChart={reporteYellowChart} 
                                turnos={turnos} hasClicked={hasClicked} ordenarMayorMenor={ordenarMayorMenor} ordenarMenorMayor={ordenarMenorMayor}/> 
                            </>
                            : <Nothing/>}
                    </Col>
                </Row>
            </Container>   
        </>
    )
}