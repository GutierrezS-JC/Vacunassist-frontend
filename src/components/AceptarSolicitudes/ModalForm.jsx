import {Button, Modal, Form} from "react-bootstrap";
import { useState } from "react";
import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css'

export const ModalForm = ({handleClose, show}) => {
    const [ turnoForm, setTurnoForm] = useState({
        pacienteId:'',
        adminId: '',
        fechaTurno: new Date()
    })

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