import {Button, Modal, Form, Container, Row, Col} from "react-bootstrap";
import { useState, useEffect } from "react";
import { setHours, setMinutes, parse } from "date-fns";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css'

export const ModalForm = ({handleClose, show, preData}) => {
    const { format } = require("date-fns");
    const MySwal = withReactContent(Swal)
    const [ horasConTurno, setHorasConTurno ] = useState();
    const [ mounted, setMounted ] = useState();
    const [ turnoForm, setTurnoForm] = useState({
        pacienteId: preData.pacienteId,
        adminId: preData.adminId,
        fechaTurno: null,
        horaNuevoTurno: null
    })

    console.log(preData)
    useEffect(()=>{
        const fetchTurnosDia = async () => {
          try{
              const response = await axios.get(`http://localhost:8080/getTurnosHorasAsignadosEnFecha?fecha=${format(new Date(turnoForm.fechaTurno),"yyyy-MM-dd")}`);
              setHorasConTurno(response.data)
              setMounted(true)
          }
          catch(e){
            console.log(e.stack)
          }
        }

    fetchTurnosDia();
    },[turnoForm.fechaTurno])

    const handleFecha = (event) => {
        setTurnoForm({...turnoForm, ["fechaTurno"] : event, ["horaNuevoTurno"] : null})
    }

    const handleHora = (event) => {
      console.log(event)
      setTurnoForm({...turnoForm, ["horaNuevoTurno"] : event})
  }

  const asignarTurno = () => {
    //Placeholder
    try{
        MySwal.fire({
            title: 'Todo bien!',
            html: `El turno fue asignado correctamente 
            <br/>
            <ul class='mt-2'>
              <li>
                Paciente ID: ${turnoForm.pacienteId}
              </li>
              <li>
                Administrador ID: ${turnoForm.adminId}
              </li>
              <li>
                Fecha: ${format(new Date(turnoForm.fechaTurno),"dd/MM/yyyy")}
              </li>
              <li>
                Hora: ${format(new Date(turnoForm.horaNuevoTurno),"hh:mm")}
              </li>
            </ul>`,
            icon: 'success',
        })
    }
    catch(e){

    }
  }

  return (
      <>        
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Turnos disponibles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <b>Eleccion de turno:</b>
                <p>A continuacion debera seleccionar la fecha y hora para el turno que desea asignar al paciente correspondiente a la 
                  vacuna de la <strong>fiebre amarilla</strong>
                </p>
                <Col xs={12} md={12} lg={6} style={{justifyContent:"center", display:'flex'}}>
                  <DatePicker
                    name="fechaNuevoTurno"
                    selected={turnoForm.fechaTurno}
                    minDate={new Date()}
                    onChange={(date) => handleFecha(date)}
                    locale="es"
                    inline          
                  />
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <b>Hora: </b>
                  <p className="text-muted">Solo se visualizan los horarios que no tienen turnos asignados</p>
                  <DatePicker
                    selected={turnoForm.horaNuevoTurno}
                    onChange={(hora) => handleHora(hora)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    excludeTimes={mounted ? new Object(horasConTurno.map((hora)=>{
                      let splitted = hora.split(':');
                      console.log(splitted)
                      console.log(turnoForm)
                      return(
                        setHours(setMinutes(new Date().setSeconds(0), +splitted[1]), +splitted[0])
                      )
                    })): []}
                    minTime={setHours(setMinutes(new Date(), 0), 10)}
                    maxTime={setHours(setMinutes(new Date(), 0), 17)}
                    timeCaption="Hora"
                    locale="es"
                    dateFormat="hh:mm"
                    className="estiloCalendar"
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            {turnoForm.fechaTurno == null || turnoForm.horaNuevoTurno == null ?
              <Button variant="success" disabled>
                Asignar turno
              </Button>
            :
              <Button variant="success" onClick={()=> asignarTurno()}>
              Asignar turno
              </Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
}