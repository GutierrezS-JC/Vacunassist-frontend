import {Table, Button, ButtonGroup, Row, Col, Container} from "react-bootstrap";

export const ListadoSolicitudes = ({solicitudes, eliminarSolicitud}) => {
   
    const SolicitudesRender = () =>{
        return(
            <>
                {solicitudes.map((solicitud,index) => {
                    return(
                            <tr key={`tr${solicitud.id}`}>
                                <td key={`Nombre ${solicitud.id}`}>{solicitud.pacienteNombre}</td>
                                <td key={`Apellido ${solicitud.id}`}>{solicitud.pacienteApellido}</td>
                                <td key={`DNI ${solicitud.id}`}>{solicitud.pacienteDni}</td>
                                <td key={`Fecha solicitud ${solicitud.id}`}>{solicitud.fechaSolicitud}</td>
                                <ButtonGroup role="group">
                                    <Button variant="outline-success">Aceptar</Button>
                                    <Button variant="outline-danger">Rechazar</Button>
                                </ButtonGroup>
                            </tr>
                    )
                })}
            </>
        )
    }
    

    const TableSolicitudes = () =>{
        return(
            <Table  hover responsive="lg">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Fecha solicitud</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <SolicitudesRender/> */}
                </tbody>
            </Table>
        )
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
                                        <Button className="justify-content-center align-self-center me-2" variant="outline-success">Aceptar</Button>
                                        <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=> eliminarSolicitud()}>Rechazar</Button>
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
                                            <Button className="justify-content-center align-self-center me-2" variant="outline-success">Aceptar</Button>
                                            <Button className="justify-content-center align-self-center" variant="outline-danger" onClick={(e)=> eliminarSolicitud()}>Rechazar</Button>
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
            </Container>
        )
    }

    return(
        <>
           {solicitudes.length !== 0 ? <TableSolicitudesV2/>  : <h3> No hay solicitudes para la vacuna de la Fiebre Amarilla </h3>}
        </>
    )
}