import { MisTurnos } from "../../components/ProtectedPage/MisTurnos";
import { useState, useEffect } from "react";
import axios from "axios";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import { useAuth } from "../../providers/useAuth";

export const MisTurnosContainer = () => {
    const [ turnos, setTurnos ] = useState([]); 
    const [ zonas, setZonas ] = useState(); 
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();

    const auth = useAuth();

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

    return(
        <>
            {turnos ? <MisTurnos turnos={turnos}/> : <SpinnerLoading/> }
        </>
    )
}