import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { HeaderSolicitudes } from "../../components/AceptarSolicitudes/HeaderSolicitudes";
import { ListadoSolicitudes } from "../../components/AceptarSolicitudes/ListadoSolicitudes";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";

export const SolicitudesContainer = () => {   
    const [ solicitudes, setSolicitudes ] = useState([]); 
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const [ spinner, setSpinner] = useState(false);
    const [dni, setDni] = useState('')
    // Cambiar por un 1 y ordenar BD
    const [zonaId, setZonaId] = useState('') 

    /*useEffect(()=>{
        const fetchSolicitudes = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getSolicitudes");
                console.log(response.data)
                const [ solicitudes, setSolicitudes ] = useState([]); 
                (response.data)
                setISearchedButton(false);
            }
            catch(e){
                console.log(e.stack)
            }
        }

        if(clicked == 0){
            fetchSolicitudes();
            setMounted(true)
        }

    }, [clicked])*/

    const handleChange = (event) => {
        console.log(event.target.value);
        setDni(event.target.value);
    };

    const handleChangeSubmit = (event) => {
        console.log(event.target.value);
        setZonaId(event.target.value);
    };

    const handleDniSubmit = (event) =>{
        event.preventDefault();
    }

    const handleZonaSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.zonaId.value);
    }

    return(
        <>
        {mounted ?
            <Container className="mt-4">
                <ListadoSolicitudes />
                {//<HeaderSolicitudes dni={dni} handleChange={handleChange} handleChangeSubmit={handleChangeSubmit} mounted={mounted} iSearchedButton={iSearchedButton} zonas={zonas} setClicked={setClicked} handleZonaSubmit={handleZonaSubmit} handleDniSubmit={handleDniSubmit} />
                
                //<Row>
                    //<ListadoSolicitudes solicitudes={solicitudes} />
                    
                
                //</Row>
                }
            </Container>  
        : <SpinnerLoading/>    
        }  
        </>
    )
}