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
            const response = await axios.get("http://localhost:8080/getTurnosDia");//cambiar por turnos del dia
            console.log(response.data)
            setTurnos(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const handleNoAsistioV2 = async (turnoId) => {//handle no asistio
        try{
            const response = await axios.post(`http://localhost:8080/rechazarSolicitud`,{ //endpoint no asistio --> reasignar turno
                adminId: +auth.user.id,
                turnoId : +turnoId
            })
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
                handleNoAsistioV2(turnoId);
            }
        })
    }
    
    return(
        <>
            <Container className="mt-4">
                <h1 className="display-5">Turnos del dia para cnfirmar asistencia</h1>
                <Row>
                    <Col>
                        {turnos ? <ListadoAsistencias fetchTurnos={fetchTurnos} turnos={turnos} handleNoAsistio={handleNoAsistio} /> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>    
        </>
    )
}