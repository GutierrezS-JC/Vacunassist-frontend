import { Button, Row, Col, Container} from "react-bootstrap";
import { useState } from "react";
import { ModalForm } from "./ModalForm";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/listaSolicitudes.css';
import { useAuth } from "../../providers/useAuth";

export const ListadoSolicitudes = ({fetchSolicitudes, solicitudes, eliminarSolicitud }) => {
    const auth = useAuth();
    const [show, setShow] = useState(false);
    const [preData, setPreData] = useState({
        solicitudId:'',
        pacienteId:'',
        adminId: auth.user.id,
    })

    // Modal
    const handleClose = () => {
        setPreData({...preData, ["pacienteId"] : ''})
        setShow(false);
    }
    
    const handleShow = (e, solicitud) => {
        setPreData({...preData, ["pacienteId"] : solicitud.pacienteId, "solicitudId" : solicitud.id})
        setShow(true);
    }

    const SolicitudesRenderV2 = () =>{
        return(
            <>
                {solicitudes.map((solicitud, index) => {
                    return(
                        <div key={`div ${index}`}>
                            <div className="d-none d-md-block">
                                <Row className="mt-4">
                                <Col className="col-md-1 col-12 d-flex" >
                                        <p className="justify-content-center align-self-center  ml-md-4"><strong>{solicitud.id}</strong></p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex" >
                                        <p className="justify-content-center align-self-center  ml-md-4">{solicitud.pacienteNombre}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex " >
                                        <p className="justify-content-center align-self-center ml-md-4">{solicitud.pacienteApellido}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{solicitud.pacienteDni}</p>
                                    </Col>
                                    <Col className="col-md-2 col-12 d-flex"  >
                                        <p className="justify-content-center align-self-center ml-md-3" >{solicitud.fechaSolicitud}</p>
                                    </Col>
                                    <Col className="col-md-3 col-12 d-flex">
                                        <Button className="justify-content-center align-self-center me-2" variant="outline-success" onClick={(e)=> handleShow(e,solicitud)}>Aceptar</Button>
                                        <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=>{ eliminarSolicitud(solicitud.id)}}>Rechazar</Button>
                                    </Col>
                                </Row>
                                <hr key={`hr ${index}`} />
                            </div>
                     

                            <div className="d-block d-md-none">
                                <Row className="mt-4">
                                    <Col className="col-sm-12">
                                        <Col className="col-sm-12" >
                                            <b>ID:</b> {solicitud.id}
                                            <br/>
                                            <b>Nombre completo:</b> {solicitud.pacienteNombre} {solicitud.pacienteApellido}
                                            <br/>
                                            <b>DNI:</b> {solicitud.pacienteDni}
                                            <br/>
                                            <b>Fecha Solicitud</b> {solicitud.fechaSolicitud}
                                        </Col>
                                        <Col className="col-sm-12 mt-3">
                                            <Button className="justify-content-center align-self-center me-2" variant="outline-success" onClick={(e)=> handleShow(e,solicitud)}>Aceptar</Button>
                                            <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=> eliminarSolicitud(solicitud.id)}>Rechazar</Button>
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

    const TableSolicitudesV2 = () => {
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
                            <h6><strong>Apellido</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>DNI</strong></h6>
                        </Col>
                        <Col className="col-2">
                            <h6><strong>Fecha Solicitud</strong></h6>
                        </Col>
                
                    </Row>
                </div>
                <hr style={{ height: "1px", border: "none", color: "#333", backgroundColor: "#333" }} />
                <SolicitudesRenderV2/>
                <ModalForm handleClose={handleClose} fetchSolicitudes={fetchSolicitudes} show={show} preData={preData}/>
            </Container>
        )
    }

    return(
        <>
           {solicitudes.length !== 0 ? <TableSolicitudesV2/>  : <h3> No hay solicitudes para la vacuna de la Fiebre Amarilla </h3>}
        </>
    )
}