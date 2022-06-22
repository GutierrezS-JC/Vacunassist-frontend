import { Container, Row, Col, Button, Card, Badge, ToggleButton} from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import MySwal from 'sweetalert2'
import '../../styles/protected.css';
import { SpinnerLoading } from "../Spinner/SpinnerLoading";

export const PacienteHome = ({vacunas}) => {
    const auth = useAuth();
    // const [checkedCovid, setCheckedCovid] = useState(false);
    // const [checkedColdWar, setCheckedColdWar] = useState(false);
    // const [checkedYellow, setCheckedYellow] = useState(false);
    const { format } = require("date-fns");

    const successAlert = () => {
        MySwal.fire({
            title:'Todo bien!',
            text: 'Se ha registrado su solicitud para la vacuna de Fiebre Amarilla',
            icon: 'success',
        })
    }

    const errorAlert = () => {
        MySwal.fire({
            title: 'Error',
            text: 'Cuidate cuidate',
            icon: 'error',
        })
    }

    const solicitarTurno = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/solicitarTurnoFiebreAmarilla`,{
                pacienteId : auth.user.id,
                dni : auth.user.dni
            });
            console.log(response.data)
            if(response.data == true){
                successAlert();
            }
            else{
                errorAlert();
            }
        }
        catch(e){
            console.log(e.stack)
        }
        return;
    }

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
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy HH:mm")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy HH:mm:ss")} </i></li>
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
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy HH:mm")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy HH:mm:ss")} </i></li>
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

    const CardVaccineColdWar = ({vacuna}) => {
        return(
            <Card border="success" style={{ width: '500', height: '90%' }} className="mt-4">
                <Card.Body>    
                    <Badge pill bg="primary mb-2">
                        {vacuna.tipoVacuna}
                    </Badge>
                    <Card.Subtitle className="mb-2 text-muted">
                        {vacuna.ultimaFechaVacunaAplicada == "-" ? <> Ultima aplicacion: <i>Sin datos</i> </>
                        : <> Ultima aplicacion: {format(new Date(vacuna.ultimaFechaVacunaAplicada),"dd/MM/yyyy HH:mm")} </>}
                    </Card.Subtitle>
                    <hr className="my-3"/>
                        {vacuna.listaDetalles.length > 0 ? 
                            vacuna.listaDetalles.map((detalle, index)=>{
                                return(
                                    <React.Fragment key={`Fragment ${index}`} >
                                        <ul className="list-unstyled mt-3">
                                            <li className="text-muted"><strong>Vacuna #{index + 1}:</strong></li>
                                            <ul>
                                                <li>Fecha de Aplicacion: <i> {format(new Date(detalle.fechaAplicacion),"dd/MM/yyyy HH:mm:ss")} </i></li>
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

    // const Selector = () => {
    //     return(
    //         <div className="mt-3">
    //             <ToggleButton
    //                 className="mb-2"
    //                 id="toggle-check-covid"
    //                 type="checkbox"
    //                 variant="outline-success"
    //                 checked={checkedCovid}
    //                 value="1"
    //                 onChange={(e) => {setCheckedCovid(e.currentTarget.checked); setCheckedColdWar(false); setCheckedYellow(false)}}
    //             >
    //             Covid
    //             </ToggleButton>

    //             <ToggleButton
    //                 className="mb-2 ms-2"
    //                 id="toggle-check-coldwar"
    //                 type="checkbox"
    //                 variant="outline-primary"
    //                 checked={checkedColdWar}
    //                 value="2"
    //                 onChange={(e) => {setCheckedColdWar(e.currentTarget.checked); setCheckedYellow(false); setCheckedCovid(false)}}
    //             >
    //             Gripe
    //             </ToggleButton>

    //             <ToggleButton
    //                 className="mb-2 ms-2"
    //                 id="toggle-check-yellow"
    //                 type="checkbox"
    //                 variant="outline-warning"
    //                 checked={checkedYellow}
    //                 value="3"
    //                 onChange={(e) => {setCheckedYellow(e.currentTarget.checked); setCheckedCovid(false); setCheckedColdWar(false)}}
    //             >
    //             Amarilla
    //             </ToggleButton>
    //         </div>
    //     )
    // }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Mis vacunas</h1>
                {/* <Selector/> */}
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