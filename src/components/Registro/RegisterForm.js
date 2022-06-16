import { Form, Button, Row, Col} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const RegisterForm = ({ handleVacunaAdd, handleChecked, handleNormalChange, handleDateChange, handleVacunaChange, vacunas, vacunasForm, zonas, usuarioForm, validarDni, validoDni }) => {
    return(
        
        <Form className="mt-4 mx-auto registerForm" noValidate >
            <Form.Label>DNI</Form.Label>
            {!validoDni ?
                    <Form.Group className="d-flex mb-3" >
                        <Form.Control
                            type="text"
                            placeholder="..."
                            className="me-2"
                            aria-label="Search"
                            name="dni"
                            value={usuarioForm.dni}
                            onChange={handleNormalChange}
                            id="dniForm"
                        />
                        <Button variant="outline-success" type="submit" onClick={(e)=>{ e.preventDefault(); validarDni() }}>Verificar</Button>
                    </Form.Group>
                :   <Form.Group className="d-flex mb-3" >
                        <Form.Control
                            type="text"
                            placeholder="..."
                            className="me-2"
                            aria-label="Search"
                            name="dni"
                            value={usuarioForm.dni}
                            onChange={handleNormalChange}
                            id="dniForm"
                            disabled
                        />
                        <Button disabled variant="outline-success" type="submit" onClick={(e)=>{ e.preventDefault(); validarDni() }}>Verificar</Button>
                    </Form.Group>
            }

            <Row>
                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={usuarioForm.nombre} onChange={handleNormalChange} name="nombre" type="text" placeholder="..."/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={usuarioForm.apellido}  onChange={handleNormalChange} name="apellido" type="text" placeholder="..."/>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={usuarioForm.email} onChange={handleNormalChange} name="email" type="email" placeholder="..." />
                <Form.Text className="text-muted">
                    La direccion de email debe ser mayor a 8 caracteres
                </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control value={usuarioForm.password} onChange={handleNormalChange} name="password" type="password" placeholder="..." />
                <Form.Text className="text-muted">
                    La contraseña debe tener al menos 6 caracteres
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check value={usuarioForm.riesgo} onChange={handleChecked} name="riesgo" type="checkbox" label="Paciente de riesgo" />
                <Form.Text className="text-muted">
                    Si usted es un paciente de riesgo marque esta opcion
                </Form.Text>
            </Form.Group>

            <Row className="">
                <Form.Group className="mb-3 col-12 col-sm-12" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select name="zonaId" value={usuarioForm.zonaId} onChange={handleNormalChange}>
                        {zonas.map((zona, index)=>{
                            return(
                                <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Seleccione la zona a la que desea asistir para la aplicacion de su vacuna
                    </Form.Text>
                </Form.Group>
            </Row>

            {/* Agregar validacion por si le dio click */}
            <Form.Label>Vacuna Aplicada</Form.Label>
            {vacunas ? vacunasForm.map((vacunaForm, index) => {
                return(
                    <Form.Group className="d-flex mb-3" key={`Input${index}`}>
                        <Form.Select name="vacunaId" onChange={(e) => handleVacunaChange(e, index)}>
                            {vacunas.map((vacuna, indexVacuna)=>{
                                return(
                                    <option key={`Vacuna${indexVacuna}`} value={vacuna.id}>{vacuna.nombre}</option>
                                )
                            })}
                        </Form.Select>
                        <DatePicker className="ms-4" name="fechaAplicacion" selected={vacunaForm.fechaAplicacion} onChange={(e) => handleDateChange(e, index, "fechaAplicacion")} />
                        <Button variant="outline-success" onClick={handleVacunaAdd}>Agregar</Button>
                    </Form.Group>
                )    
            }): <></>}

            {!validoDni ? 
                (<Button variant="success" disabled type='submit'>
                    Dar de alta
                </Button>) :
                    (<Button variant="success" type='submit'>
                    Dar de alta
                </Button>)}
        </Form>
    )
}