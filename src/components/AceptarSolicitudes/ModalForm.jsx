import {Button, Modal, Form} from "react-bootstrap";
import { useState, useEffect } from "react";
import { setHours, setMinutes, parse } from "date-fns";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css'
import { setSeconds } from "date-fns";

export const ModalForm = ({handleClose, show}) => {
    const { format } = require("date-fns");
    const [ horasConTurno, setHorasConTurno ] = useState();
    const [ mounted, setMounted ] = useState();
    const [ turnoForm, setTurnoForm] = useState({
        pacienteId:'',
        adminId: '',
        fechaTurno: new Date(),
        
    })

    useEffect(()=>{
        const fetchTurnosDia = async () => {
          try{
              const response = await axios.get(`http://localhost:8080/getTurnosHorasAsignadosEnFecha?fecha=${format(new Date(turnoForm.fechaTurno),"yyyy-MM-dd")}`);
              console.log(response.data)
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
        console.log(event)
        setTurnoForm({...turnoForm, ["fechaTurno"] : event})
    }

    return (
        <>        
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Turnos disponibles</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-auto" style={{display:"block"}}>
              <Form onSubmit={(e)=> e.preventDefault()}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-center" style={{display:"block"}}> :)</Form.Label>
                  <DatePicker
                    name="fechaNuevoTurno"
                    minDate={new Date()}
                    selected={turnoForm.fechaTurno}
                    onChange={(date) => handleFecha(date)}
                    locale="es"
                    showTimeSelect
                    // excludeTimes={[setHours(setMinutes(turnoForm.fechaTurno, '00'), '10')]}
                    excludeTimes={mounted ? new Object(horasConTurno.map((hora)=>{
                      let splitted = hora.split(':');
                      console.log(splitted)
                      console.log(turnoForm)
                      return(
                        setHours(setMinutes(turnoForm.fechaTurno.setSeconds(0), +splitted[1]), +splitted[0])
                      )
                    })): []}
                    timeIntervals={15}
                    minTime={setHours(setMinutes(new Date(), 0), 10)}
                    maxTime={setHours(setMinutes(new Date(), 0), 17)}
                    timeCaption="Hora"
                    inline
                />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success" onClick={handleClose}>
                Asignar turno
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}