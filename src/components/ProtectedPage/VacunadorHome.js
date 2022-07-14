import '../../styles/protected.css'
import { Container, Button, Col, Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";

export const VacunadorHome = () => {
    const auth = useAuth();

    const Jumbotron = ({cantSol}) => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido/a {`${auth.user.nombre} ${auth.user.apellido}`} !</h1>
                    <hr className="my-3"/>
                    <p className="lead">Seleccione la acción que desea realizar</p>
                </Container>
            </div>
        ) 
    }

    const CardVacunadorColor = ({name, willGo, text, boton}) => {
        return(
            <>
                <Card bg={"light"} text={'dark'} className="mt-4 cardCustom">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <hr className="my-3"/>
                        {text}   
                        <br/>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={willGo} style={{textDecoration:"none"}}>
                            <div className="d-grid gap-2 mt-4">
                                <Button variant="outline-success">{boton}</Button>
                            </div>
                        </Link>
                    </Card.Footer>
                </Card>
            </>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Panel de Tareas del Vacunador</h1>
                <hr/>
                <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={4} >
                    <Col>
                        {/*<CardVacunadorColor name={"Registrar aplicacion de vacuna"} willGo={'/registrarAplicacionVacuna'} text={"Se mostrara un formulario para cargar la aplicacion de una vacuna a una persona no registrada."} boton={'Solicitar'}/>*/}
                        <CardVacunadorColor name={"Registrar aplicacion de vacuna"} willGo={'/vacunador'} text={"Se mostrara un formulario para cargar la aplicacion de una vacuna a una persona no registrada."} boton={'Proximamente...'}/>
                    </Col>
                    <Col>
                        {/*<CardVacunadorColor name={"Registrar asistencia a turno"} willGo={'/asistenciasTurnos'} text={"Se mostrara un listado con los turnos del dia para registrar la asistencia de los turnos."} boton={'Solicitar'}/>*/}
                        <CardVacunadorColor name={"Registrar asistencia a turno"} willGo={'/vacunador'} text={"Se mostrara un listado con los turnos del dia para registrar la asistencia de los turnos."} boton={'Proximamente...'}/>
                    </Col>
                    <Col>
                        <CardVacunadorColor name={"Solicitar listado de turnos"} willGo={'/listadoTurnosDia'} text={"Se mostrara un listado con los turnos del dia."} boton={'Solicitar'}/>
                    </Col> 
                    <Col>
                        <CardVacunadorColor name={"Buscar turno por DNI"} willGo={'/buscarTurno'} text={"Se mostrara un listado con los turnos del DNI ingresado."} boton={'Solicitar'}/>
                    </Col> 
                </Row>
            </Container>
        )
    }

    return(
        <>
          <Jumbotron/>  
          <Main/>
        </>
    )
}