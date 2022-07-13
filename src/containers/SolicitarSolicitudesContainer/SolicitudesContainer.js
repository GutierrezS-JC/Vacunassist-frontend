import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ListadoSolicitudes } from "../../components/AceptarSolicitudes/ListadoSolicitudes";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import MySwal from "sweetalert2";
import { useAuth } from "../../providers/useAuth";

export const SolicitudesContainer = () => {   
    const auth = useAuth();
    const [ solicitudes, setSolicitudes ] = useState(); 

    useEffect(()=>{
        fetchSolicitudes();
    }, [])

    const fetchSolicitudes = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getSolicitudesPendientes");
            console.log(response.data)
            setSolicitudes(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const postRechazoSolicitud = async (solicitudId) => {
        try{
            const response = await axios.post(`http://localhost:8080/rechazarSolicitud`,{
                adminId: +auth.user.id,
                solicitudId : +solicitudId
            })
            console.log(response.data)

            if(response.data){
                MySwal.fire({
                    title:'Eliminado!',
                    text:'La solicitud fue eliminada con exito',
                    icon:'success'
                })
                fetchSolicitudes();
            }
            else{
                MySwal.fire({
                    title:'Ay!',
                    text:'No se',
                    icon:'error'
                })
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const eliminarSolicitud = (solicitudId) => {
        MySwal.fire({
            title: '¿Está seguro que desea rechazar la solicitud?',
            text: 'No podrá deshacer esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if(result.isConfirmed){
                postRechazoSolicitud(solicitudId);
            }
        })
    }
    
    return(
        <>
            <Container className="mt-4">
                <h1 className="display-5">Solicitudes para la vacuna de la Fiebre Amarilla</h1>
                <Row>
                    <Col>
                        {solicitudes ? <ListadoSolicitudes fetchSolicitudes={fetchSolicitudes} solicitudes={solicitudes} eliminarSolicitud={eliminarSolicitud} /> : <SpinnerLoading/>}
                    </Col>
                </Row>
            </Container>    
        </>
    )
}
