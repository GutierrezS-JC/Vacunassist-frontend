import { Button, Row, Col, Container} from "react-bootstrap";
import Notify  from '../../img/Notify.svg';
import { useState } from "react";
//import { ModalForm } from "./ModalForm";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css';
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";

export const ListadoAsistencias = ({fetchTurnos, turnos, handleNoAsistio, handleAsistio}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { format } = require("date-fns");
    const [preData, setPreData] = useState({
        turnoId:'',
        pacienteId:'',
        adminId: auth.user.id,
    })

    // Modal
    const handleClose = () => {
        setPreData({...preData, ["pacienteId"] : ''})
        setShow(false);
    }
    


    const AsistenciasRenderV2 = () =>{
        return(
            <>
                {turnos.map((turno, index) => {
                    return(
                        <div key={`div ${index}`}>
                            <div className="d-none d-md-block">
                                <Row className="mt-4">
                                <Col className="col-md-1 col-12 d-flex" >
                                        <p className="justify-content-center align-self-center  ml-md-4"><strong>{turno.id}</strong></p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex" >
                                        <p className="justify-content-center align-self-center  ml-md-4">{turno.pacienteNombre} {turno.pacienteApellido}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex " >
                                        <p className="justify-content-center align-self-center ml-md-4">{turno.dni}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.nombreVacunatorio}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{turno.nombreVacuna}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{format(new Date(turno.fechaAplicacion),"dd/MM/yyyy")}</p>
                                    </Col>
                                    <Col className="col-md-3 col-12 d-flex">
                                        <Button className="justify-content-center align-self-center me-2" variant="outline-success" onClick={(e)=> handleAsistio(turno.id)}>Asistio</Button> 
                                        <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=>{ handleNoAsistio(turno.id)}}>No asistio</Button>
                                    </Col>
                                </Row>
                                <hr key={`hr ${index}`} />
                            </div>
                     

                            <div className="d-block d-md-none">
                                <Row className="mt-4">
                                    <Col className="col-sm-12">
                                        <Col className="col-sm-12" >
                                            <b>ID:</b> {turno.id}
                                            <br/>
                                            <b>Nombre completo:</b> {turno.pacienteNombre} {turno.pacienteApellido}
                                            <br/>
                                            <b>DNI:</b> {turno.dni}
                                            <br/>
                                            <b>Nombre vacunatorio:</b> {turno.nombreVacunatorio}
                                            <br/>
                                            <b>Nombre vacuna:</b> {turno.nombreVacuna}
                                            <br/>
                                            <b>Fecha aplicacion:</b> {turno.fechaAplicacion}
                                            
                                            
                                        </Col>
                                        <Col className="col-sm-12 mt-3">
                                            <Button className="justify-content-center align-self-center me-2" variant="outline-success" onClick={(e)=> handleAsistio(turno.id)}>Asistio</Button>   
                                            <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=> handleNoAsistio(turno.id)}>No asistio</Button>
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

    const TableAsistenciasV2 = () => {
        return(
            <Container style={{width:"90%"}}>
                <div className="d-none d-md-block">
                    <Row className="mt-4">
                        <Col className="col-1">
                            <h6><strong>#</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Nombre</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>DNI</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Vacunatorio</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Vacuna</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Fecha Programada</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Hora</strong></h6>
                        </Col>
                        
                    </Row>
                </div>
                <hr style={{ height: "1px", border: "none", color: "#333", backgroundColor: "#333" }} />
                <AsistenciasRenderV2/>
                {/*<ModalForm handleClose={handleClose} fetchTurnos={fetchTurnos} show={show} preData={preData}/>   /* no me funciona :( para que sirvee?*/}
            </Container>
        )
    }

    return(
        <>
            {turnos.length !== 0 ? <TableAsistenciasV2/>  :
            <>
                <img alt="notFound" className="notFound" src={Notify} /> 
                <p className="text-center fs-4 fw-light">No hay turnos para el dia de hoy</p> 
                <Button className="mx-auto" style={{display:"block"}} variant={"success"} onClick={() => navigate('/vacunador')} >Volver al menu </Button>
            </>
            }
        </>
    )
}