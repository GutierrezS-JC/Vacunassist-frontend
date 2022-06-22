import { PacienteHome } from "../../components/ProtectedPage/PacienteHome";
import { useState, useEffect } from "react"
import { useAuth } from "../../providers/useAuth";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import axios from "axios"

export const PacienteHomeContainer = () => {
    const [ vacunas, setVacunas ] = useState([]); 
    const [ tieneSolicitud, setTieneSolicitud ] = useState(false); 
    const auth = useAuth();

    useEffect(()=>{
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

    return(
        <>
            {vacunas ? <PacienteHome vacunas={vacunas} tieneSolicitud={tieneSolicitud} /> : <SpinnerLoading/> }
        </>
    )
}