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
                        <Button className="mt-4" variant="success">Solicitar</Button>
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
                <Row className="mt-3" xs={1} sm={2} md={2} lg={3}>
                    <Col>
                        <CardAdmin name={"Solicitar Listado de vacunadores"}/>
                    </Col>
                    <Col>
                        <CardAdmin name={"Modificar nombre de vacunatorio"} />
                    </Col>
                    <Col>
                        <CardAdmin name={"Registrar vacunadores en el sistema"}/>
                    </Col>  
                    <Col>
                        <CardAdmin name={"Solicitar listado de pacientes"}/>
                    </Col>
                    <Col>
                        <CardAdmin name={"Generar reporte (por vacuna)"}/>
                    </Col>
                    <Col>
                        <CardAdmin name={"Solicitudes de fiebre amarilla"}/>
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