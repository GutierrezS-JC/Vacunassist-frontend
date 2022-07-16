import { PacienteHome } from "../../components/ProtectedPage/PacienteHome";
import { useState, useEffect } from "react"
import { useAuth } from "../../providers/useAuth";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import axios from "axios"
import MySwal from 'sweetalert2'

export const PacienteHomeContainer = () => {
    const [ vacunas, setVacunas ] = useState([]); 
    const [ tieneSolicitud, setTieneSolicitud ] = useState(); 
    const auth = useAuth();

    const fetchTieneSolicitud = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/getTieneSolicitudFiebreAmarillaPacienteV2?pacienteId=${auth.user.id}`);
            console.log(response.data)
            setTieneSolicitud(response.data)
            if(response.data.aceptada == false){
                restoreAmarilla();
                solicitudAlert();
            }
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const restoreAmarilla = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/resetSolicitudFiebreAmarilla?pacienteId=${auth.user.id}`);
            console.log(response.data)
        }
        catch(e){
            console.log(e)
        }
    }

    const fetchVacunas = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/getVacunasPaciente?pacienteId=${auth.user.id}`);
            setVacunas(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }
    
    useEffect(()=>{
        fetchTieneSolicitud();
        fetchVacunas();
    }, [])

    const successAlert = () => {
        MySwal.fire({
            title:'Todo bien!',
            text: 'Se ha registrado su solicitud para la vacuna de Fiebre Amarilla',
            icon: 'success',
        })
    }

    const errorAlert = () => {
        MySwal.fire({
            title: 'Error',
            text: 'Usted es mayor a 60 años, no puede aplicarse esta vacuna',
            icon: 'error',
        })
    }

    const solicitudAlert = () => {
        MySwal.fire({
            title: 'Aviso',
            text: 'Su solicitud para la vacuna de fiebre amarilla fue rechazada',
            icon: 'warning',
        })
    }

    const solicitarTurno = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/solicitarTurnoFiebreAmarilla`,{
                pacienteId : auth.user.id,
                dni : auth.user.dni
            });
            
            if(response.data == true){
                successAlert();
                fetchTieneSolicitud()
            }
            else{
                errorAlert();
            }
        }
        catch(e){
            console.log(e.stack)
        }
        return;
    }


    return(
        <>
            {vacunas ? <PacienteHome solicitarTurno={solicitarTurno} vacunas={vacunas} tieneSolicitud={tieneSolicitud} /> : <SpinnerLoading/> }
        </>
    )
}