import { Form, Row, Col, Button } from "react-bootstrap"

export const HeaderTurnos = ({fetchTurnosPaciente, handleEmpty, dni, handleChange, iSearchedButton, handleDniSubmit}) => {
    return(
        <Form className="mt-4" onSubmit={handleDniSubmit}>
            <Row>
                <Col>
                    {
                        !iSearchedButton ? <input onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                        :  <input disabled onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                    }
                </Col>
                <Col>
                    {
                        iSearchedButton ?
                        <Button variant="dark" type="submit" onClick={()=> handleEmpty()}>Volver</Button>
                        : <Button onClick={()=> fetchTurnosPaciente()} variant="outline-success" type="submit">Buscar</Button>
                    }
                </Col>
            </Row>
        </Form>
    )
}