import {Button, Col, Row, Container} from "react-bootstrap";
import Notify from '../../img/Notify.svg';
import { useNavigate } from "react-router-dom";

export const BuscarTurno = ({turnos}) => {
    const navigate = useNavigate();
    const { format } = require("date-fns");

    // const TurnosRender = () =>{
    //     return(
    //         <>
    //             {turnos.map((turno,index) => {
    //                 return(
    //                         <tr key={`tr${turno.id}`}>
    //                             <td key={`Id${turno.id}`}>{turno.id}</td>
    //                             <td key={`Fecha Asignacion ${turno.id}`}>{turno.fechaAsignacion}</td>
    //                             <td key={`Fecha Aplicacion ${turno.id}`}>{turno.fechaAplicacion}</td>
    //                             <td key={`DNI ${turno.id}`}>{turno.paciente_id.dni}</td>
    //                             <td key={`Nombre ${turno.id}`}>{turno.paciente.nombre}</td>
    //                             <td key={`Apellido ${turno.id}`}>{turno.paciente.apellido}</td>
    //                             <td key={`Zona ${turno.id}`}>{turno.zona.nombreZona}</td>
    //                             <td key={`Vacunatorio ${turno.id}`}>{turno.zona.vacunatorio.nombreVacunatorio}</td>
    //                             <td key={`Estado ${turno.id}`}>{turno.asistio}</td>
    //                         </tr>
    //                 )
    //             })}
    //         </>
    //     )
    // }

    const TurnosRender = () =>{
        return(
            <>
                {turnos.map((turno, index) => {
                    return(
                        <div key={`div ${index}`}>
                            <div className="d-none d-md-block">
                                <Row className="mt-4">
                                    <Col className="col-md-1 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.pacienteDni}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.pacienteNombre} {turno.pacienteApellido}</p>
                                    </Col>
                                    <Col className="col-md-1 col-12 d-flex " >
                                        <p className="justify-content-center align-self-center ml-md-4">{format(new Date(turno.fechaAplicacion),"dd/MM/yyyy")}</p>
                                    </Col>
                                    <Col className="col-md-1 col-12 d-flex " >
                                        <p className="justify-content-center align-self-center ml-md-4">{format(new Date(turno.fechaAplicacion),"HH:mm")}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.nombreZona}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.nombreVacunatorio}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex">
                                        <Button className="justify-content-center align-self-center me-2" variant="outline-success">I'm not a button</Button>
                                        <Button className="justify-content-center align-self-center" variant="outline-danger">Me neither</Button>
                                    </Col>
                                </Row>
                                <hr key={`hr ${index}`} />
                            </div>
                     

                            <div className="d-block d-md-none">
                                <Row className="mt-4">
                                    <Col className="col-sm-12">
                                        <Col className="col-sm-12" >
                                            <b>DNI:</b> {turno.pacienteDni}
                                            <br/>
                                            <b>Nombre completo:</b> {turno.pacienteNombre} {turno.pacienteApellido}
                                            <br/>
                                            <b>Fecha:</b> {format(new Date(turno.fechaAplicacion),"dd/MM/yyyy")}
                                            <br/>
                                            <b>Hora:</b> {format(new Date(turno.fechaAplicacion),"HH:mm")}
                                            <br/>
                                            <b>Zona:</b> {turno.nombreZona}
                                            <br/>
                                            <b>Vacunatorio:</b> {turno.nombreVacunatorio}
                                        </Col>
                                        <Col className="col-sm-12 mt-3">
                                            <Button className="justify-content-center align-self-center me-2" variant="outline-success">I'm not a button</Button>
                                            <Button className="justify-content-center align-self-center" variant="outline-danger">Me neither</Button>
                                        </Col>
                                    </Col>
                                </Row>
                                <hr />
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const TableTurnosPaciente = () => {
        return(
            <Container style={{width:"100%"}}>
                <div className="d-none d-md-block">
                    <Row className="mt-4">
                        <Col className="col-1">
                            <h6><strong>DNI</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Nombre Completo</strong></h6>
                        </Col>
                        <Col className="col-1">
                            <h6><strong>Fecha</strong></h6>
                        </Col>
                        <Col className="col-1">
                            <h6><strong>Hora</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Zona</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Vacunatorio</strong></h6>
                        </Col>
                    </Row>
                </div>
                <hr style={{ height: "1px", border: "none", color: "#333", backgroundColor: "#333" }} />
                <TurnosRender/>
            </Container>
        )
    }

    const NotFound = () => {
        return(
            <>
                <img alt="notFound" className="notFound" src={Notify} /> 
                <p className="text-center fs-4 fw-light">No se encontraron turnos pendientes para el paciente ingresado </p> 
            </>
        )
    }

    return(
        <>
            {turnos ? (turnos.length !== 0 ? <TableTurnosPaciente /> : <NotFound/> ) : <h4 className="mt-4">Ingrese un dni . . .</h4>}
        </>
    )
}