import { PacienteHome } from "../../components/ProtectedPage/PacienteHome";
import { useState, useEffect } from "react"
import { useAuth } from "../../providers/useAuth";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import axios from "axios"
import MySwal from 'sweetalert2'

export const PacienteHomeContainer = () => {
    const [ vacunas, setVacunas ] = useState([]); 
    const [ tieneSolicitud, setTieneSolicitud ] = useState(false); 
    const auth = useAuth();

    useEffect(()=>{
        console.log("En useEffect");
        const fetchVacunas = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/getVacunasPaciente?pacienteId=${auth.user.id}`);
                console.log(response.data)
                setVacunas(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        const fetchTieneSolicitud = async () => {
            console.log("En fetchTieneSolicitud")
            try{
                const response = await axios.get(`http://localhost:8080/getTieneSolicitudFiebreAmarillaPaciente?pacienteId=${auth.user.id}`);
                console.log(response.data)
                setTieneSolicitud(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

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

    const solicitarTurno = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/solicitarTurnoFiebreAmarilla`,{
                pacienteId : auth.user.id,
                dni : auth.user.dni
            });
            console.log(response.data)
            if(response.data == true){
                successAlert();
                setTieneSolicitud(response.data);
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