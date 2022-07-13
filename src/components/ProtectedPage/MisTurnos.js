import '../../styles/protected.css';
import { Container, Button, Row, Col, Card, Badge} from 'react-bootstrap';
import { useAuth } from "../../providers/useAuth";
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../Spinner/SpinnerLoading';

export const MisTurnos = ({turnos, eliminarTurno, reasignarAlert}) => {
    const auth = useAuth();
    const { format } = require("date-fns");

    const Jumbotron = () => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido/a {auth.user.nombre} {auth.user.apellido} !</h1>
                    <p className="lead">¡Cuidarte es cuidarnos!</p>
                    <hr className="my-3"/>
                    <p>Aquí podrás ver la información de tus turnos</p>
                    <Link to={"/paciente"}><Button className="btn btn-success" style={{marginRight: '1rem'}}>Mis vacunas</Button></Link>
               </Container>
            </div>
        ) 
    }

    const Main = () =>{
        return(
            <Container className="my-4">
                 <h1>Mis turnos ({turnos.length})</h1>
                 <hr/>
                 <Row className="mt-3" xs={1} sm={2} md={2} lg={3} xl={4}>
                    {turnos.map((turno, index) => {
                        return(
                            <Col key={`Col ${index}`}>
                                <Card border="info" style={{ width: '18rem' }} className="mt-4">
                                    <Card.Body>    
                                        <Badge pill bg="info mb-2">
                                            Turno
                                        </Badge>
                                        <Card.Title>{turno.vacunaId == 1 || turno.vacunaId == 2 || turno.vacunaId == 3 ? "Covid" :
                                         turno.vacunaId == 4 ? "Gripe" : "Amarilla"}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{turno.asistio == true ? format(new Date(turno.fechaAplicacion),"dd/MM/yyyy") : format(new Date(turno.fechaAplicacion),"dd/MM/yyyy HH:mm")}</Card.Subtitle>
                                        <hr className="my-3"/>
                                        {turno.asistio == null ? <>Debera presentarse en el vacunatorio correspondiente a <strong>Zona {turno.nombreZona}</strong></>
                                        :<></>}
                                        <ul className="list-unstyled mt-3">
                                                <li className="text-muted"><strong>Detalles:</strong></li>
                                                <ul>
                                                    <li>Vacunatorio: <strong>{turno.nombreVacunatorio}</strong></li>
                                                    <li>Direccion:<strong> Calle {turno.calle} - {turno.altura} </strong></li>
                                                    <li>Vacuna <strong>{turno.nombreVacuna}</strong></li>
                                                </ul>
                                        </ul>
                                        {turno.vacunaId === 5 ? (turno.asistio == null ? <Button size='sm' variant="danger" onClick={()=> eliminarTurno(turno.turnoId)}>Cancelar</Button> : <></>) : (turno.asistio == null ? <Button size='sm' variant="warning" onClick={()=> reasignarAlert(turno.turnoId)}>Reasignar</Button> : <></>)}
                                    </Card.Body>
                                    {turno.asistio !== null ? 
                                    (turno.asistio == true ? <Card.Footer className="text-center aplicada"> Aplicada </Card.Footer>  :
                                    <Card.Footer className="text-center aplicada"> No Aplicada </Card.Footer>) 
                                    : <Card.Footer className="text-muted text-center"> Pendiente </Card.Footer>}
                                </Card>
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
            {turnos ? <Main/> : <SpinnerLoading/>}
        </>
    )
}