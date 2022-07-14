import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ListadoAsistencias } from "../../components/ListadoAsistencias/ListadoAsistencias";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import MySwal from "sweetalert2";
import { useAuth } from "../../providers/useAuth";

export const AsistenciasContainer = () => {   
    const auth = useAuth();
    const [ turnos, setTurnos ] = useState(); 

    useEffect(()=>{
        fetchTurnos();
    }, [])

    const fetchTurnos = async () => {
        try{
            //const response = await axios.get("http://localhost:8080/getTurnosDia");//cambiar por turnos del dia
            const response = await axios.get(`http://localhost:8080/getTurnosDiaVacunatorio?vacunatorioId=${auth.user.zona_id}`);
            console.log(response.data)
            setTurnos(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const handleNoAsistioV2 = async (turnoId) => {//handle no asistio
        try{
            //const response = await axios.post(`http://localhost:8080/rechazarSolicitud`,{ //endpoint no asistio --> reasignar turno
            //    adminId: +auth.user.id,
            //    turnoId : +turnoId
            //})
            const response = await axios.post(`http://localhost:8080/reasignarTurno?turnoId=${turnoId}`);
            console.log(response.data)

            if(response.data){
                MySwal.fire({
                    title:'Se ha reasignado el turno del paciente!',
                    icon:'success'
                })
                fetchTurnos();
            }
            else{
                MySwal.fire({
                    title:'Tuvimos problemas reasignando el turno del paciente',
                    icon:'error'
                })
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const handleNoAsistio = (turnoId) => {//handleNoAsistio
        MySwal.fire({
            title: 'Confirma que el paciente no asistio?',
            text: 'No podrá deshacer esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if(result.isConfirmed){
                const response = axios.post(`http://localhost:8080/setAsistioTurno?turnoId=${turnoId}&asistio=${false}`); //tira error el await
                if(response.data){
                    MySwal.fire({
                        title:'Se ha registrado la asistencia al turno!',
                        icon:'success'
                    })
                    //fetchTurnos();
                    handleNoAsistioV2(turnoId);
                }
                else{
                    MySwal.fire({
                        title:'Tuvimos problemas registrando la asistencia al turno',
                        icon:'error'
                    })
                }

            }
        })
    }
    
    const handleAsistioV2 = async (turnoId) => {//handle no asistio
        try{
            //const response = await axios.post(`http://localhost:8080/rechazarSolicitud`,{ //endpoint no asistio --> reasignar turno
            //    adminId: +auth.user.id,
            //    turnoId : +turnoId
            //})
            const response = axios.post(`http://localhost:8080/reasignarTurno?turnoId=${turnoId}`); //http://localhost:8080/asistioAlTurno?turnoId=${turnoId} //tira error el await
            console.log(response.data)

            if(response.data){
                MySwal.fire({
                    title:'Se ha guardado el estado del turno!',
                    icon:'success'
                })
                fetchTurnos();
            }
            else{
                MySwal.fire({
                    title:'Hubo problemas al querer realizar la accion',
                    icon:'error'
                })
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const handleAsistio = (turnoId) => {
        MySwal.fire({
            title: 'Confirma que el paciente asistio?',
            text: 'No podrá deshacer esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if(result.isConfirmed){
                const response = axios.post(`http://localhost:8080/setAsistioTurno?turnoId=${turnoId}&asistio=${true}`); //tira error el await
                if(response.data){
                    MySwal.fire({
                        title:'Se ha registrado la asistencia al turno!',
                        icon:'success'
                    })
                    handleAsistioV2(turnoId);
                    //fetchTurnos();
                }
                else{
                    MySwal.fire({
                        title:'Tuvimos problemas registrando la asistencia al turno',
                        icon:'error'
                    })
                }
            }
        })
    }

    return(
        <>
            <Container className="mt-4">
                <h1 className="display-5">Turnos del dia para confirmar asistencia</h1>
                <Row>
                    <Col>
                        {turnos ? <ListadoAsistencias fetchTurnos={fetchTurnos} turnos={turnos} handleNoAsistio={handleNoAsistio} handleAsistio={handleAsistio}/> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>    
        </>
    )
}