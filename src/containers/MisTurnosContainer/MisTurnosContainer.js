import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import { MisTurnos } from "../../components/ProtectedPage/MisTurnos";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import { useAuth } from "../../providers/useAuth";
import axios from "axios";

export const MisTurnosContainer = () => {
    const MySwal = withReactContent(Swal)
    const [ turnos, setTurnos ] = useState([]); 
    const auth = useAuth();

    const deleteAlert = () => {
        MySwal.fire({
            title: 'Aviso',
            text: "Turno para la vacuna de la Fiebre Amarilla cancelado. Puede volver a solicitarlo desde el menu principal",
            icon: 'info',
        })
    }

    const successAlert = (text) => {
        MySwal.fire({
            title: 'Todo bien',
            text: text,
            icon: 'success',
        })
    }

    const reasignarAlert = (turnoId) => {
        MySwal.fire({
            title: 'Aviso',
            text: "Su turno sera reasignado ¿Esta seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Reasignar',
            confirmButtonColor: '#1c8e59',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reasignar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if(result.isConfirmed){
                reasignarTurno(turnoId);
                successAlert("Su turno ha sido reasignado correctamente")
            }
        })
    }

    const fetchTurnos = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/getTurnosPaciente?pacienteId=${auth.user.id}`);
            setTurnos(response.data)
        }
        catch(e){
            console.log(e.stack)
        }
    }

    useEffect(()=>{
        fetchTurnos();
    }, [])

    const eliminarTurno = async (turnoId) => {
        try{
            const response = await axios.delete(`http://localhost:8080/eliminarTurnoFiebreAmarilla?turnoId=${turnoId}`);
            if(response.data){
                fetchTurnos();
                deleteAlert()
            }
        }
        catch(e){
            console.log(e.stack)
        }
    }

    const reasignarTurno = async (turnoId) => {
        try{
            const response = await axios.post(`http://localhost:8080/reasignarTurno?turnoId=${turnoId}`);
            if(response.data){
                fetchTurnos();
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <>
            {turnos ? <MisTurnos turnos={turnos} eliminarTurno={eliminarTurno} reasignarAlert={reasignarAlert} /> : <SpinnerLoading/> }
        </>
    )
}