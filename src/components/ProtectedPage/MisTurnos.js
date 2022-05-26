import '../../styles/protected.css';
import { Container, Button, Row, Col, Card, Badge} from 'react-bootstrap';
import { useAuth } from "../../providers/useAuth";
import { Link } from 'react-router-dom';

export const MisTurnos = () => {
    const auth = useAuth();

    const Jumbotron = () => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido {auth.user.email} !</h1>
                    <p className="lead">No me preguntes, solo soy un placeholder</p>
                    <hr className="my-3"/>
                    <p>Ay no c</p>
                    <Link to={"/protected"}><Button className="btn btn-success">Mis vacunas</Button></Link>
                </Container>
            </div>
        ) 
    }

    const CardTurno = ({name, zona, estado}) => {
        return(
            <>
                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Badge pill bg="info mb-2">
                            Turno
                        </Badge>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Marzo 20, 2021 10:00 AM</Card.Subtitle>
                        <hr className="my-3"/>
                           Debera presentarse en el vacunatorio correspondiente a <strong>Zona {zona}</strong>
                           <ul className="list-unstyled mt-3">
                                <li className="text-muted"><strong>Detalles:</strong></li>
                                <ul>
                                    <li>Vacuna <strong>{name}</strong></li>
                                    <li>Direccion: Calle falsa 123</li>
                                    <li>Zona: {zona}</li>
                                </ul>
                           </ul>
                        <Card.Link href="#">Liily</Card.Link>
                    </Card.Body>
                    {estado ? <Card.Footer className="text-center aplicada"> {estado} </Card.Footer> 
                    : <Card.Footer className="text-muted text-center"> Pendiente </Card.Footer>}
                </Card>
            </>
        )
    }


    const Main = () =>{
        return(
            <Container className="my-4">
                 <h1>Mis turnos (8)</h1>
                 <hr/>
                 <Row className="mt-3" xs={1} sm={2} md={2} lg={3} xl={4}>
                    <Col>
                        <CardTurno name={"Covid"} zona={"Centro"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Covid"} zona={"Centro"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Covid"} zona={"Cementerio"} estado={"Aplicada"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Covid"} zona={"Terminal"} estado={"Aplicada"}/>
                    </Col>  
                    <Col>
                        <CardTurno name={"Amarilla"} zona={"Cementerio"} estado={"Aplicada"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Gripe"} zona={"Centro"} estado={"Aplicada"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Gripe"} zona={"Centro"} estado={"Aplicada"}/>
                    </Col>
                    <Col>
                        <CardTurno name={"Gripe"} zona={"Centro"} estado={"Aplicada"}/>
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