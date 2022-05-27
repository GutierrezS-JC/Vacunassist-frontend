import '../../styles/protected.css'
import { Container, Button, Col, Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

export const AdminHome = () => {

    const Jumbotron = () => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Hola Admin!</h1>
                    <p className="lead">No me preguntes, solo soy un placeholder</p>
                    <hr className="my-3"/>
                    <p>Abran paso que llego el admin</p>
                    <Link to={"/misTurnos"}><Button className="btn btn-primary">Mis turnos</Button></Link>
                </Container>
            </div>
        ) 
    }

    const CardAdminColor = ({name, willGo}) => {
        return(
            <>
                <Card bg={"light"} key={"success"} text={'dark'} className="mt-4 cardCustom">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <hr className="my-3"/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
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

    const CardAdmin = ({name}) => {
        return(
            <>
                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Lorem</Card.Subtitle>
                        <hr className="my-3"/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        <br/>
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="success">
                                Block level button
                            </Button>
                        </div>
                        {/* <Button className="mt-4" variant="success">Solicitar</Button> */}
                    </Card.Body>
                </Card>
            </>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Panel de administrador</h1>
                <hr/>
                <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={4} >
                    <Col>
                        <CardAdminColor name={"Solicitar Listado de vacunadores"} willGo={'/admin'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Modificar nombre de vacunatorio"} willGo={'/admin'} />
                    </Col>
                    <Col>
                        <CardAdminColor name={"Registrar vacunadores en el sistema"} willGo={'/registrarVacunador'}/>
                    </Col>  
                    <Col>
                        <CardAdminColor name={"Solicitar listado de pacientes"} willGo={'/admin'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitar reporte de stock de vacuna por vacunatorio"} willGo={'/admin'}/>
                    </Col>
                    <Col>
                        <CardAdminColor name={"Solicitudes de fiebre amarilla"} willGo={'/admin'}/>
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