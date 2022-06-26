import '../../styles/protected.css'
import { Container, Button, Col, Row, Card } from "react-bootstrap"
import { useAuth } from "../../providers/useAuth"
import { Link } from "react-router-dom";

export const AdminHome = () => {
    const auth = useAuth();

    const Jumbotron = ({cantSol}) => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido/a {`${auth.user.nombre} ${auth.user.apellido}`}</h1>
                    <p className="lead">Seleccione la acción que desea realizar</p>
                    <hr className="my-3"/>
                </Container>
            </div>
        ) 
    }

    const CardAdminColor = ({name, willGo, text, boton}) => {
        return(
            <>
                <Card bg={"light"} key={"success"} text={'dark'} className="mt-4 cardCustom">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <hr className="my-3"/>
                        {text}   
                        <br/>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={willGo} style={{textDecoration:"none"}}>
                            <div className="d-grid gap-2 mt-4">
                                <Button disable variant="outline-success">{boton}</Button>
                            </div>
                        </Link>
                    </Card.Footer>
                </Card>
            </>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4 mb-5">
                <h1>Panel de Tareas del Administrador</h1>
                <hr/>
                <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={4} >
                    <Col>
                        <CardAdminColor name={"Solicitar listado de Vacunadores"} willGo={'/listadoVacunadores'} text={"Se generará un listado con la información de cada uno de los vacunadores registrados."} boton={'Solicitar'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Modificar nombre de vacunatorio"} willGo={'/modificarNombreVacunatorio'} text={"Se modificará el nombre del vacunatorio que seleccione por el nombre que usted ingrese."} boton={'Solicitar'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Registrar vacunadores en el sistema"} willGo={'/registrarVacunador'} text={"Se registrará un nuevo vacunador en el sistema y se le asignará un vacunatorio."} boton={'Solicitar'}/>
                    </Col> 
                    <Col>
                        <CardAdminColor name={"Solicitar reporte de stock de vacuna por vacunatorio"} willGo={'/ReporteVacunatorios'} text={"Se mostratrá la cantidad de vacunas que hay de cada tipo en cada uno de los vacunatorios."} boton={'Solicitar'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitar listado de pacientes"} willGo={'/listadoPacientes'} text={"Se generará un listado con la información de todos los pacientes registrados en el sistema."} boton={'Solicitar'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitudes de fiebre amarilla"} willGo={'/solicitudesFiebreAmarilla'} text={"Se mostrarán las distintas solicitudes de turnos para la fiebre amarilla."} boton={'Solicitar'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Generar reporte de vacunas"} willGo={'/reporteVacunas'} text={"Se mostrara un reporte de todos los turnos para una vacuna en particular"} boton={'Solicitar'}/>
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