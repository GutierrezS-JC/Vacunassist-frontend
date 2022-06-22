import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ListadoSolicitudes } from "../../components/AceptarSolicitudes/ListadoSolicitudes";
import { SpinnerLoading } from "../../components/Spinner/SpinnerLoading";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MySwal from "sweetalert2";

export const SolicitudesContainer = () => {   
    const [ solicitudes, setSolicitudes ] = useState([]); 
    //const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState(0);
    const [ mounted, setMounted ] = useState();
    const [ spinner, setSpinner] = useState(false);
    //const [dni, setDni] = useState('')
    // Cambiar por un 1 y ordenar BD
    //const [zonaId, setZonaId] = useState('') 

    useEffect(()=>{
        const fetchSolicitudes = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getSolicitudes");
                console.log(response.data)
                //const [ solicitudes, setSolicitudes ] = useState([]); 
                setSolicitudes(response.data)
                //setISearchedButton(false);
            }
            catch(e){
                console.log(e.stack)
            }
        }

        if(clicked == 0){
            fetchSolicitudes();
            setMounted(true)
        }

    }, [clicked])

    //const handleZonaSubmit = (event) =>{
    //    event.preventDefault();
    //    console.log(event.target.zonaId.value);
    //}
        
    const rechazar = (eventId)=>{
        MySwal.fire({
            title: 'Esta seguro de que desea rechazar la solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro!',
            cancelButtonText: 'Cancelar'
        })
        //cambiar estado de la solicitud a rechazada
    }

        
        function Result(props) {
            const [value, onChange] = useState(new Date());
        
            const onDateChange=(newDate)=>{
            //Your custom code here
            props.handleOnclick(newDate);
            onChange(newDate);
            };
        
            return (
            <div>
                <DatePicker
                onChange={onDateChange}
                value={value}
                />
            </div>
            );
        }


    //problema con el calendar
    const aceptar = (eventId)=>{
        MySwal.fire({
            title: 'Seleccione la fecha y el horario para asignar el turno',
            onOpen: function() {
                //asi encontre que se usa pero no se de donde se importa datetimepicker
              //  $('#datetimepicker').datetimepicker({
                //    format: 'DD/MM/YYYY hh:mm A',
                  //  defaultDate: new Date()
                
                  //asi esta en registerForm pero no me funciona
                  <DatePicker 
                  name="fechaAplicacion"
                  //selected={vacunaForm.fechaAplicacion}
                  //onChange={(e) => handleDateChange(e, index, "fechaAplicacion")} 
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  className="estiloCalendar"
                  as={Col}
                  locale="es"
              />
                //});
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Asignar turno!',
            cancelButtonText: 'Cancelar'
        })
        //cambiar estado de la slicitud a aceptada
        //endpoint crear/asignar turno

    }
        
    return(
        <>
        {mounted ?
            <Container className="mt-4">
                <h1>Solicitudes para la vacuna de la Fiebre Amarilla</h1>
                <hr/>
                <Row>
                    <ListadoSolicitudes solicitudes={solicitudes} rechazar={rechazar} aceptar={aceptar}/>
                </Row>
            </Container>  
        : <SpinnerLoading/>    
        }  
        </>
    )
}
