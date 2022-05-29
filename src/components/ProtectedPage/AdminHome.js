import '../../styles/protected.css'
import { Container, Button, Col, Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

export const AdminHome = () => {

    const Jumbotron = ({cantSol}) => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido/a Admin!</h1>
                    <p className="lead">Seleccione la acción que desea realizar</p>
                    <hr className="my-3"/>
                    <p>Solicitudes pendientes: {cantSol} (Acá agregar el número de solicitudes de fiebre amarilla)</p>
                </Container>
            </div>
        ) 
    }

    const CardAdminColor = ({name, willGo, text}) => {
        return(
            <>
                <Card bg={"light"} key={"success"} text={'dark'} className="mt-4 cardCustom">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <hr className="my-3"/>
                        {text}   
                        <br/>
                        <Link to={willGo} style={{textDecoration:"none"}}>
                            <div className="d-grid gap-2 mt-4">
                                <Button variant="outline-success">Solicitar</Button>
                            </div>
                        </Link>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Panel de Tareas del Administrador</h1>
                <hr/>
                <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={3} >
                    <Col>
                        <CardAdminColor name={"Solicitar Listado de Vacunadores"} willGo={'/listadoVacunadores'} text={"Se generará un listado con la información de cada uno de los vacunadores registrados."}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Modificar Nombre de Vacunatorio"} willGo={'/modificarNombreVacunatorio'} text={"Se modificará el nombre del vacunatorio que seleccione por el nombre que usted ingrese."}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Registrar Vacunadores en el Sistema"} willGo={'/registrarVacunador'} text={"Se registrará un nuevo vacunador en el sistema y se le asignará un vacunatorio."}/>
                    </Col> 
                    <Col>
                    <CardAdminColor name={"Solicitar Reporte de Stock de Vacuna por Vacunatorio"} willGo={'/ReporteVacunatorios'} text={"Se mostratrá la cantidad de vacunas que hay de cada tipo en cada uno de los vacunatorios."}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitar Listado de Pacientes"} willGo={'/admin'} text={"Se generará un listado con la información de todos los pacientes registrados en el sistema."}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitudes de Fiebre Amarilla"} willGo={'/admin'} text={"Se mostrarán las distintas solicitudes de turnos para la fiebre amarilla."}/>
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