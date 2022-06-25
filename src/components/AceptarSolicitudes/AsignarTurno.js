import { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
//model para asignar turno una vez que se clickea el boton asignar/aceptar
export const AsignarTurno = ({dni, handleChange, handleChangeSubmit, mounted, iSearchedButton, zonas, setClicked, handleZonaSubmit, handleDniSubmit }) => {
    const [ toggle, setToggle ] = useState(false);

    return (
        <>
            {mounted ? 
                <>
                <div class="modal turno" id="modal-turno" role="dialog">
                    <div class="modal-dialog">
                    
                        <div class="modal-content">
                            <div class="modal-body" style="padding:40px 50px;">
                            <label > Seleccione un turno</label>
                            <form role="form">
                                <div class="form-group">
                                    <label > Dia</label>
                                </div>
                                <div class="form-group">
                                    <label > Hora</label>
                                </div>
                                <button type="submit"> Asignar</button>
                            </form>
                            </div>
                        </div>
                    
                    </div>
                </div> 
                </> 
            : <> </> }
        </>
    )
}