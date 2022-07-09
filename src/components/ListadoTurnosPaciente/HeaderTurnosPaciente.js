import { Col, Row, Form } from 'react-bootstrap';

export const HeaderTurnosPaciente = ({dni, handleChange, iSearchedButton, handleDniSubmit, handleEmpty, fetchTurnosPaciente}) => {
    return(
        <Form className="mt-4" onSubmit={handleDniSubmit}>
        <Row>
            <Col>
                {
                    !iSearchedButton ?  <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                    :  <input key="test" disabled onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                }
            </Col>
            <Col>
                {iSearchedButton ?
                <Button variant="dark" type="submit" onClick={()=> handleEmpty()}>Ver todo</Button>
                : <Button onClick={()=> fetchTurnosPaciente()} variant="outline-success" type="submit">Buscar</Button>}
            </Col>
        </Row>
    </Form>
    )
}