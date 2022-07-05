import {Button, Modal, Container, Row, Col} from "react-bootstrap";
import { useState, useEffect } from "react";
import { setHours, setMinutes, addDays, getDay } from "date-fns";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css'

export const ModalForm = ({fetchSolicitudes, handleClose, show, preData}) => {
    const MySwal = withReactContent(Swal)
    const [ horasConTurno, setHorasConTurno ] = useState();
    const [ mounted, setMounted ] = useState();
    const [ turnoForm, setTurnoForm] = useState({
        solicitudId: preData.solicitudId,
        pacienteId: preData.pacienteId,
        adminId: preData.adminId,
        fechaTurno: null,
        horaNuevoTurno: null
    })

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
      setTurnoForm({...turnoForm, "fechaTurno" : event, "horaNuevoTurno" : null})
    }

    const handleHora = (event) => {
      setTurnoForm({...turnoForm, "horaNuevoTurno" : event})
  }

  //Deshabilitar fines de semana
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  
  const asignarTurno = async () => {
    //Placeholder
    try{
        const response = await axios.post(`http://localhost:8080/asignarTurnoFiebreAmarilla`,{
            solicitudId: +turnoForm.solicitudId,
            pacienteId: +turnoForm.pacienteId,
            adminId: +turnoForm.adminId,
            fechaTurno: format(new Date(turnoForm.fechaTurno),"yyyy-MM-dd"),
            horaTurno: format(new Date(turnoForm.horaNuevoTurno),"HH:mm"),
        });
        if(response.data){   
            MySwal.fire({
                title: 'Todo bien!',
                html: `El turno fue asignado correctamente 
                <br/>
                <ul class='mt-2'>
                  <li>
                    Solicitud ID: ${turnoForm.solicitudId}
                  </li>
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
                    Hora: ${format(new Date(turnoForm.horaNuevoTurno),"HH:mm")}
                  </li>
                </ul>`,
                icon: 'success',
            })
            fetchSolicitudes();
            handleClose();
        }
        else{
            MySwal.fire({
                title: 'Error',
                text: 'No se pudo procesar el turno para la fecha indicada. Vuelva a intentarlo o seleccione otro horario',
                icon: 'error',
            })
        }
        
    }
    catch(e){
      console.log(e)
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
                    selected={turnoForm.fechaTurno == null ? '' : turnoForm.fechaTurno}
                    minDate={(new Date(), addDays(new Date(), 1))}
                    onChange={(date) => handleFecha(date)}
                    locale="es"
                    inline          
                    filterDate={isWeekday}
                  />
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <b>Hora: </b>
                  <p className="text-muted">Solo se visualizan los horarios que no tienen turnos asignados</p>
                  {turnoForm.fechaTurno !== null ? 
                    <DatePicker
                      selected={turnoForm.horaNuevoTurno}
                      onChange={(hora) => handleHora(hora)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      // eslint-disable-next-line
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
                      dateFormat="HH:mm"
                      className="estiloCalendar"
                      placeholderText="Ver horarios"
                    />
                  :  
                    <DatePicker
                    disabled
                    placeholderText="Seleccione una fecha"
                    className="estiloCalendar"
                  />}
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