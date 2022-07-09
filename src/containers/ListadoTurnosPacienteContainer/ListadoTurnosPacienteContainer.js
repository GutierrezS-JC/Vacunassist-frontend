import axios from "axios";
import { useEffect, useState } from "react";
import { HeaderTurnosPaciente } from "../../components/ListadoTurnosPaciente/HeaderTurnosPaciente";
import { ListadoTurnosPaciente } from "../../components/ListadoTurnosPaciente/ListadoTurnosPaciente";

export const ListadoTurnosPacienteContainer = () => {
    const [ mounted, setMounted ] = useState();
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ turnos, setTurnos ] = useState([]);
    const [dni, setDni] = useState('')

    const handleEmpty = () => {
        setTurnos([]);
    }

    const fetchTurnosPaciente = async () =>{
        try{
            const response = await axios.get(`http://localhost:8080/getTurnosFuturosPorDni?dni=${+dni}`)
            console.log(response.data)
            setTurnos(response.data)
            setISearchedButton(true);
        }
        catch(err){
            console.log(err.stack)
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setDni(event.target.value);
    };

    const handleDniSubmit = (event) =>{
        event.preventDefault();
    }

    return(
        <Container className="mt-4">
            <h1 className="display-5">Turnos pendientes de paciente:</h1>
            <HeaderTurnosPaciente dni={dni} handleChange={handleChange} iSearchedButton={iSearchedButton} handleDniSubmit={handleDniSubmit} handleEmpty={handleEmpty} fetchTurnosPaciente={fetchTurnosPaciente}/>
            <Row>
                <Col>
                    {turnos ? <ListadoTurnosPaciente /> : <SpinnerLoading/>}
                </Col>
            </Row>
        </Container>    
    )
}