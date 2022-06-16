import React from "react";
import { Form, Button, Row, Col, Alert} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/registerForm.css"
export const RegisterForm = ({ setWillAddVacunas, willAddVacunas, handleVacunaAdd, handleFechaNacimiento, handleChecked, handleNormalChange, handleDateChange, handleVacunaChange, handleSubmit, vacunas, vacunasForm, zonas, usuarioForm, validarDni, validoDni }) => {
    return(
        
        <Form className="mt-4 mb-5 mx-auto registerForm" noValidate onSubmit={handleSubmit} >
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
            
            <Form.Group className="mb-3 col-12 col-sm-6">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <DatePicker
                    selected={usuarioForm.fechaNacimiento}
                    onChange={(date) => handleFechaNacimiento(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    name="fechaNacimiento"
                    maxDate={new Date()}
                    className="estiloCalendar"
                />
            </Form.Group>

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

            <Row>
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
            {/* <hr/> */}
            <Row>
                {vacunas ?
                    
                    vacunasForm.length !== 0 ? 
                        <>
                        {vacunasForm.map((vacunaForm, index) => {
                            return(
                                <React.Fragment key={`formContainer${index}`}>
                                    <strong key={`vacuna${index}`} className="mb-3">Vacuna #{index + 1}</strong>
                                    <Form.Group as={Col} md={4} className="mb-3" key={`Input${index}`}>
                                        <Form.Select name="vacunaId" onChange={(e) => handleVacunaChange(e, index)}>
                                            {vacunas.map((vacuna, indexVacuna)=>{
                                                return(
                                                    <option key={`Vacuna${indexVacuna}`} value={vacuna.id}>{vacuna.nombre}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md={4} className="mb-3">
                                        <Form.Select name="zonaId" value={usuarioForm.zonaId} onChange={handleNormalChange}>
                                            {zonas.map((zona, index)=>{
                                                return(
                                                    <option key={`ZonaVacunaAnterior${index}`} value={zona.id}>{zona.nombreZona}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md={4} className="mb-3">
                                        <DatePicker 
                                            name="fechaAplicacion"
                                            selected={vacunaForm.fechaAplicacion}
                                            onChange={(e) => handleDateChange(e, index, "fechaAplicacion")} 
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            maxDate={new Date()}
                                            className="estiloCalendar"
                                            as={Col}
                                        />
                                    </Form.Group>
                                    <hr key={`hr${index}`} style={{width:"95%"}} className="mx-auto"/>
                                </React.Fragment>
                            )    
                        })}
                        <Form.Group as={Col} md={3} className="mb-3">
                            <Button variant="outline-success" onClick={handleVacunaAdd}>Agregar vacuna</Button>
                        </Form.Group>
                        </>
                    : 
                    <Alert variant={'secondary'} style={{width:"97%"}} className="mx-auto"> 
                        <p class="fs-5">Vacunas anteriores</p>
                        <p>A continuacion debera indicar si usted ha recibido con anterioridad alguna vacuna de <strong>Covid 19</strong> (incluidas las
                        dosis de refuerzo), <strong>Fiebre Amarilla</strong> y la ultima vacuna recibida contra la <strong> Gripe. </strong> </p>
                        <p>Para ello, puede hacer click en el boton <em>Agregar vacuna</em> que encontrara a continuacion. </p>
                        <Button variant="outline-success" onClick={handleVacunaAdd}>Agregar vacuna</Button>
                    </Alert>
                : <></>}
            </Row>

            {!validoDni ? 
                (<Button variant="success" disabled type='submit'>
                    Registrarme
                </Button>) :
                    (<Button variant="success" type='submit'>
                    Registrarme
                </Button>)}
        </Form>
    )
}