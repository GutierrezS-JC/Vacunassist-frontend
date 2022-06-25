import { MisTurnos } from "../../components/ProtectedPage/MisTurnos";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import { useAuth } from "../../providers/useAuth";

export const MisTurnosContainer = () => {
    const [ turnos, setTurnos ] = useState([]); 
    const [ zonas, setZonas ] = useState(); 
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const MySwal = withReactContent(Swal)
    const auth = useAuth();

    /* const successAlert = () => {
        MySwal.fire({
            title:'Todo bien!',
            text: 'Se ha registrado su solicitud para la vacuna de Fiebre Amarilla',
            icon: 'success',
        })
    }

    const errorAlert = () => {
        MySwal.fire({
            title: 'Error',
            text: 'Cuidate cuidate',
            icon: 'error',
        })
    } */

    useEffect(()=>{
        const fetchTurnos = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/getTurnosPaciente?pacienteId=${auth.user.id}`);
                console.log(response.data)
                setTurnos(response.data)
            }
            catch(e){
                console.log(e.stack)
            }
        }

        fetchTurnos();
    }, [])

    /* const solicitarTurno = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/solicitarTurnoFiebreAmarilla`,{
                pacienteId : auth.user.id,
                dni : auth.user.dni
            });
            console.log(response.data)
            if(response.data == true){
                successAlert();
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
 */
    return(
        <>
            {turnos ? <MisTurnos turnos={turnos}/> : <SpinnerLoading/> }
        </>
    )
}