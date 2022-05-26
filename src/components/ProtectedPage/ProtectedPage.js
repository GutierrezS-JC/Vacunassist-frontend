import { Container, Row, Col, Button, Card, Badge, ToggleButton} from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { Link } from "react-router-dom";
import '../../styles/protected.css';

export const ProtectedPage = () => {
    const auth = useAuth();
    const [checkedCovid, setCheckedCovid] = useState(false);
    const [checkedColdWar, setCheckedColdWar] = useState(false);
    const [checkedYellow, setCheckedYellow] = useState(false);

    const JumbotronFluid = () => {
        return(
            <div className="bg-light p-5 rounded-lg">
                    <h1 className="display-4">Bienvenido {auth.user.email} !</h1>
                    <p className="lead">Soy un placeholder, no me molestaria que me cambien mas adelante :)</p>
                    <hr className="my-4"/>
                    <p>Ay no c</p>
                    <a className="btn btn-success" role="button">Sacar turno</a>
            </div>
        )
    }
    const Jumbotron = () => {
        return(
            <div className="bg-light p-5 rounded-lg imgJumbo">
                <div className="overlay" />
                <Container className="description">
                    <h1 className="">Bienvenido {auth.user.email} !</h1>
                    <p className="lead">No me preguntes, solo soy un placeholder</p>
                    <hr className="my-3"/>
                    <p>Ay no c</p>
                    <Link to={"/misTurnos"}><Button className="btn btn-primary">Mis turnos</Button></Link>
                </Container>
            </div>
        ) 
    }

    const CardVaccineCovid = ({name, zona}) => {
        return(
            <>
                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Badge pill bg="success mb-2">
                            Covid-19
                        </Badge>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Marzo 20, 2021 10:00 AM</Card.Subtitle>
                        <hr className="my-3"/>
                           Administrada en el centro de vacunacion <strong>{zona}</strong>
                           <ul className="list-unstyled mt-3">
                                <li className="text-muted"><strong>Item:</strong></li>
                                <ul>
                                    <li>(1) {name}</li>
                                    <li>Lote: XX-XX-XX</li>
                                </ul>
                           </ul>
                        <Card.Link href="#">Liily</Card.Link>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const CardVaccineYellow = ({name, zona}) => {
        return(
            <>
                <Card border="warning" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Badge pill bg="warning mb-2">
                            Fiebre Amarilla
                        </Badge>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Enero 5, 2020 14:00 PM</Card.Subtitle>
                        <hr className="my-3"/>
                           Administrada en el centro de vacunacion <strong>{zona}</strong>
                           <ul className="list-unstyled mt-3">
                                <li className="text-muted"><strong>Item:</strong></li>
                                <ul>
                                    <li>(1) {name}</li>
                                    <li>Lote: XX-XX-XX</li>
                                </ul>
                           </ul>
                        <Card.Link href="#">HS</Card.Link>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const CardVaccineColdWar = ({name, zona}) => {
        return(
            <>
                <Card border="primary" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Badge pill bg="primary mb-2">
                                Gripe
                        </Badge>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Junio 5, 2019 10:00 AM</Card.Subtitle>
                        <hr className="my-3"/>
                            Administrada en el centro de vacunacion <strong>{zona}</strong>
                            <ul className="list-unstyled mt-3">
                                <li className="text-muted"><strong>Item:</strong></li>
                                <ul>
                                    <li>(1) {name}</li>
                                    <li>Lote: XX-XX-XX</li>
                                </ul>
                            </ul>
                        <Card.Link href="#">Audioslave</Card.Link>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const Selector = () => {
        return(
            <div className="mt-3">
                <ToggleButton
                    className="mb-2"
                    id="toggle-check-covid"
                    type="checkbox"
                    variant="outline-success"
                    checked={checkedCovid}
                    value="1"
                    onChange={(e) => {setCheckedCovid(e.currentTarget.checked); setCheckedColdWar(false); setCheckedYellow(false)}}
                >
                Covid
                </ToggleButton>

                <ToggleButton
                    className="mb-2 ms-2"
                    id="toggle-check-coldwar"
                    type="checkbox"
                    variant="outline-primary"
                    checked={checkedColdWar}
                    value="2"
                    onChange={(e) => {setCheckedColdWar(e.currentTarget.checked); setCheckedYellow(false); setCheckedCovid(false)}}
                >
                Gripe
                </ToggleButton>

                <ToggleButton
                    className="mb-2 ms-2"
                    id="toggle-check-yellow"
                    type="checkbox"
                    variant="outline-warning"
                    checked={checkedYellow}
                    value="3"
                    onChange={(e) => {setCheckedYellow(e.currentTarget.checked); setCheckedCovid(false); setCheckedColdWar(false)}}
                >
                Amarilla
                </ToggleButton>
            </div>
        )
    }

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Mis vacunas (7)</h1>
                <Selector/>
                <hr/>
                <Row className="mt-3" xs={1} sm={2} md={2} lg={3} xl={4}>
                    <Col>
                        <CardVaccineCovid name={"Pfizer"} zona={"Zona Centro"}/>
                    </Col>
                    <Col>
                        <CardVaccineCovid name={"Sinopharm"} zona={"Cementerio"}/>
                    </Col>
                    <Col>
                        <CardVaccineCovid name={"Sinopharm"} zona={"Terminal"}/>
                    </Col>  
                    <Col>
                        <CardVaccineYellow name={"Amarilla"} zona={"Cementerio"}/>
                    </Col>
                    <Col>
                        <CardVaccineColdWar name={"Gripe Comun"} zona={"Zona Centro"}/>
                    </Col>
                    <Col>
                        <CardVaccineColdWar name={"Gripe Comun"} zona={"Zona Centro"}/>
                    </Col>
                    <Col>
                        <CardVaccineColdWar name={"Gripe Comun"} zona={"Zona Centro"}/>
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