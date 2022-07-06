import { Container, Row, Col, Button, Card, Badge, ToggleButton, OverlayTrigger, Popover} from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { Link } from "react-router-dom";
import '../../styles/protected.css';
import { SpinnerLoading } from "../Spinner/SpinnerLoading";

export const PacienteHome = ({solicitarTurno, vacunas, tieneSolicitud}) => {
    const auth = useAuth();
    const { format } = require("date-fns");

    const Jumbotron = () => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido/a {`${auth.user.nombre} ${auth.user.apellido}`} !</h1>
                    <p className="lead">¡Cuidarte es cuidarnos!</p>
                    <hr className="my-3"/>
                    <p>Aquí podrás ver información sobre tus vacunas</p>
                    <Link to={"/misTurnos"}><Button className="btn btn-primary">Mis turnos</Button></Link>
                </Container>
                
            </div>
        ) 
    }

    const CardVaccineCovid = ({vacuna}) => {
        return(
            <Card border="success" style={{ width: '500', height: '90%' }} className="mt-4">
                <Card.Body>    
                    <Badge pill bg="success mb-2">
                        {vacuna.tipoVacuna}
                    </Badge>
                    <Card.Subtitle className="mb-2 text-muted">
                        {vacuna.ultimaFechaVacunaAplicada == "-" ? <> Ultima aplicacion: <i>Sin datos</i> </>
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy")} </i></li>
                                                <li>Administrada en <strong><i>{detalle.nombreVacunatorio}</i></strong></li>
                                                <li>Vacuna: <strong><i>{detalle.nombreVacuna}</i></strong></li>
                                            </ul>
                                        </ul>
                                    </React.Fragment>
                                )
                            }) : 
                            <>
                                <p className="text-muted"><strong>Aviso:</strong></p>
                                <p>Usted no tiene registrada la aplicacion de una vacuna
                                     correspondiente a la <strong><i>{vacuna.tipoVacuna}</i></strong></p>
                            </>}
                </Card.Body>
            </Card>
        )
    }

    const CardVaccineYellow = ({vacuna}) => {
        return(
            <Card border="success" style={{ width: '500', height: '90%' }} className="mt-4">
                <Card.Body>    
                    <Badge pill bg="warning mb-2">
                        {vacuna.tipoVacuna}
                    </Badge>
                    <Card.Subtitle className="mb-2 text-muted">
                        {vacuna.ultimaFechaVacunaAplicada == "-" ? <> Ultima aplicacion: <i>Sin datos</i> </>
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy")} </i></li>
                                                <li>Administrada en <strong><i>{detalle.nombreVacunatorio}</i></strong></li>
                                                <li>Vacuna: <strong><i>{detalle.nombreVacuna}</i></strong></li>
                                            </ul>
                                        </ul>
                                    </React.Fragment>
                                )
                            }) : 
                            <>
                                <p className="text-muted"><strong>Aviso:</strong></p>
                                <p>Usted no tiene registrada la aplicacion de una vacuna
                                     correspondiente a la <strong><i>{vacuna.tipoVacuna}</i></strong></p>
                                {(tieneSolicitud.tieneSolicitud == null ) ? <Button onClick={()=> solicitarTurno()} variant={"warning"}>Solicitar Turno</Button> 
                                :
                                (tieneSolicitud.aceptada == null ? 
                                <OverlayTrigger
                                    key={'top'}
                                    placement={'top'}
                                    overlay={
                                      <Popover id={`popover-trigger-hover-focus`}>
                                        <Popover.Header as="h3">Vacunassist informa</Popover.Header>
                                        <Popover.Body>
                                            Su solicitud aun <strong>no ha sido aceptada</strong>
                                        </Popover.Body>
                                      </Popover>
                                    }
                                >
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none' }} disabled onClick={()=> solicitarTurno()} variant={"warning"}>Solicitar Turno</Button>
                                    </span>
                                </OverlayTrigger>
                                :
                                (tieneSolicitud.aceptada == true ? 
                                <OverlayTrigger
                                    key={'top'}
                                    placement={'top'}
                                    overlay={
                                      <Popover id={`popover-trigger-hover-focus`}>
                                        <Popover.Header as="h3">Vacunassist informa</Popover.Header>
                                        <Popover.Body>
                                            Su solicitud fue <strong> aceptada</strong>
                                        </Popover.Body>
                                      </Popover>
                                    }
                                >
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none' }} disabled onClick={()=> solicitarTurno()} variant={"success"}>Solicitar Turno</Button>
                                    </span>
                                </OverlayTrigger>
                                :
                                <OverlayTrigger
                                    key={'top'}
                                    placement={'top'}
                                    overlay={
                                      <Popover id={`popover-trigger-hover-focus`}>
                                        <Popover.Header as="h3">Vacunassist informa</Popover.Header>
                                        <Popover.Body>
                                            Su solicitud fue <strong> rechazada </strong>
                                        </Popover.Body>
                                      </Popover>
                                    }
                                >
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none' }} disabled onClick={()=> solicitarTurno()} variant={"danger"}>Solicitar Turno</Button>
                                    </span>
                                </OverlayTrigger> 
                                ))}
                            </>
                        }
                </Card.Body>
            </Card>
        )
    }

    const CardVaccineColdWar = ({vacuna}) => {
        return(
            <Card border="success" style={{ width: '500', height: '90%' }} className="mt-4">
                <Card.Body>    
                    <Badge pill bg="primary mb-2">
                        {vacuna.tipoVacuna}
                    </Badge>
                    <Card.Subtitle className="mb-2 text-muted">
                        {vacuna.ultimaFechaVacunaAplicada == "-" ? <> Ultima aplicacion: <i>Sin datos</i> </>
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy")} </i></li>
                                                <li>Administrada en <strong><i>{detalle.nombreVacunatorio}</i></strong></li>
                                                <li>Vacuna: <strong><i>{detalle.nombreVacuna}</i></strong></li>
                                            </ul>
                                        </ul>
                                    </React.Fragment>
                                )
                            }) : 
                            <>
                                <p className="text-muted"><strong>Aviso:</strong></p>
                                <p>Usted no tiene registrada la aplicacion de una vacuna
                                     correspondiente a la <strong><i>{vacuna.tipoVacuna}</i></strong></p>
                            </>}
                </Card.Body>
            </Card>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Mis vacunas</h1>
                <hr/>
                <Row className="mt-3" xs={1} sm={1} md={1} lg={3} xl={3}>
                   {vacunas.map((vacuna, index)=>{
                        return(
                            <Col key={`Col ${index}`}>
                                {vacuna.tipoVacuna == "Covid" ? <CardVaccineCovid vacuna={vacuna} /> : (vacuna.tipoVacuna == "Gripe" ? <CardVaccineColdWar vacuna={vacuna} /> : <CardVaccineYellow vacuna={vacuna} />)}
                            </Col>
                        )
                   })}
                </Row>
            </Container>
            
        )
    }

    return(
        <>
            <Jumbotron/> 
            {vacunas ? <Main/> : <SpinnerLoading/>}
        </>
    )
}