import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export const ReporteVacunatorios = () => {

    const CardAdmin = ({name}) => {
        return(
            <>
                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Lorem</Card.Subtitle>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Vacuna</th>
                                <th scope="col">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Gripe</td>
                                <td>20</td>
                                </tr>
                                <tr>
                                <td>Fiebre amarilla</td>
                                <td>20</td>
                                </tr>
                                <tr>
                                <td>Covid a</td>
                                <td>20</td>
                                </tr>
                                <tr>
                                <td>Covid b</td>
                                <td>20</td>
                                </tr>
                                <tr>
                                <td>Covid c</td>
                                <td>20</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </>
        )
    }

    /*const CardAdmin = ({name}) => {
        return(
            <>
                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                    <Card.Body>    
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Lorem</Card.Subtitle>
                        <hr className="my-3"/>
                        Vacuna Gripe : 100
                        Vacuna Fiebre amarilla : 100
                        Vacuna Covid x : 100
                        Vacuna Covid y : 100
                        Vacuna Covid d : 100
                        Vacuna Covid v : 100
                        {/* <Button className="mt-4" variant="success">Solicitar</Button> }
                    </Card.Body>
                </Card>
            </>
        )
    }*/

    const Main = () => {
        return(
            <Container className="my-4">
                <h1>Reporte de vacunas por vacunatorio</h1>
                <hr/>
                <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={3} >
                    <Col>
                        <CardAdmin name={"Vacunatorio Centro"} />
                    </Col>
                    <Col>
                        <CardAdmin name={"Vacunatorio Terminal"} />
                    </Col>
                    <Col>
                        <CardAdmin name={"Vacunatorio Cementerio"} />
                    </Col>  
                   
                </Row>
            </Container>
        )
    }

    const ActualizarStock = () => {
        return(
            <Container className="my-4">
                <h3>Actualizar stock</h3>
                <hr/>
                <Row className=" " >

                    <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
                        <Form.Label>Vacunatorio</Form.Label>
                        <Form.Select defaultValue="Vacunatorio...">
                            <option>Centro</option>
                            <option>Terminal</option>
                            <option>Cementerio</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
                        <Form.Label>Vacuna</Form.Label>
                        <Form.Select defaultValue="Vacuna...">
                            <option>Gripe</option>
                            <option>Fiebre Amarilla</option>
                            <option>Covid Pfizer</option>
                            <option>Covid Sinopharm</option>
                            <option>Covid Sputnik</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-3" controlId="formCant">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="text" placeholder="-100 / 100" />
                    </Form.Group>  

                    <Button variant="success" className="mb-3 col-12 col-sm-3">
                        Actualizar Stock
                    </Button>
                   
                </Row>
            </Container>
        )
    }

    return(
        <> 
            <Main/>
            <ActualizarStock/>
        </>
    )
}