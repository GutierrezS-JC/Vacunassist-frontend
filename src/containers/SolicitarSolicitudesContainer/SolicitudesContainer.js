import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ListadoSolicitudes } from "../../components/AceptarSolicitudes/ListadoSolicitudes";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import MySwal from "sweetalert2";

export const SolicitudesContainer = () => {   
    const [ solicitudes, setSolicitudes ] = useState(); 
    const [ spinner, setSpinner] = useState(false);
    const [ hasClicked, setHasClicked ] = useState();

    const fetchSolicitudes = async () => {
        try{
            const response = await axios.get("http://localhost:8080/getSolicitudes");
            console.log(response.data)
            setSolicitudes(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const eliminarSolicitud = async () => {
        MySwal.fire({
            title: '¿Está seguro que desea rechazar la solicitud?',
            text: 'No queremos problemas okk?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si padre',
            cancelButtonText: 'Ay, mejor no',
        }).then( (result) => {
            if(result.isConfirmed){
                MySwal.fire({
                    title:'Eliminado!',
                    text:'La solicitud fue eliminada con exito',
                    icon:'success'
                })
            }
        })
    }

    useEffect(()=>{
        fetchSolicitudes();
    }, [])

    return(
        <>
            <Container className="mt-4">
                <h1 className="display-5">Solicitudes para la vacuna de la Fiebre Amarilla</h1>
                <Row>
                    {solicitudes ? <ListadoSolicitudes solicitudes={solicitudes} eliminarSolicitud={eliminarSolicitud} /> : <SpinnerLoading/>}
                </Row>
            </Container>    
        </>
    )
}