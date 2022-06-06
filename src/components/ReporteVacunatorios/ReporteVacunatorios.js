import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export const ReporteVacunatorios = ({vacunasvac, vacunatorios, vacunasTipo, handleSubmitStock}) => {

    const ActualizarStock = () => {
        return(
            <Container className="my-4">
                <h3>Actualizar stock</h3>
                <hr/>
                <Form onSubmit={handleSubmitStock}>
                <Row>
                    <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
                        <Form.Label>Vacunatorio</Form.Label>
                        <Form.Select name="optionsVacunatorio">
                            {vacunatorios.map((vacunatorio, index)=>{
                                return(
                                    <option key={`Vacunatorio${index}`} value={vacunatorio.id}>{vacunatorio.nombre}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
                        <Form.Label>Vacuna</Form.Label>
                        <Form.Select name="optionsVacuna">
                            {vacunasTipo.map((vacuna, index)=>{
                                return(
                                    <option key={`Vacunatorio${index}`} value={vacuna.id}>{vacuna.nombre}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-3" controlId="formCant">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control name="cantidadAdd" type="text" placeholder="-100 / 100" />
                    </Form.Group>  

                    <Button variant="success" type="submit" className="mb-3 col-12 col-sm-3">
                        Actualizar Stock
                    </Button>
                   
                </Row>
                </Form>
            </Container>
        )
    }

    return(
        <>  

       
            <><Container className="my-4">
            <h1>Reporte de vacunas por vacunatorio</h1>
            <hr/>
            {vacunasvac
                ?
                    <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={3} >
                        {vacunasvac.map((vacun, index) =>{
                            return(
                            <Col>
                                <Card border="success" style={{ width: '18rem' }} className="mt-4">
                                    <Card.Body>    
                                        <Card.Title>{vacun.nombreVacunatorio}</Card.Title>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Vacuna</th>
                                                <th scope="col">Cantidad</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {vacun.listaVacunas.map((va,index)=>{
                                                    return(
                                                        <tr key={`VacunaId${va.vacunaId}`}>
                                                            <td key={`${va.nombreVacuna}${index}`}>{va.nombreVacuna}</td>
                                                            <td key={`Stock${index}`}>{va.stock} </td>                                        
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})} 
                    </Row>
                :   <></>
            }
            </Container>
            <ActualizarStock/> </>
    
        </>
    )
}