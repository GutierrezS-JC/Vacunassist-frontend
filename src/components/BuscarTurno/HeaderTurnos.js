import { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

export const HeaderTurnos = ({dni, handleChange, mounted, iSearchedButton, zonas, setClicked, handleZonaSubmit, handleDniSubmit }) => {
    const [ toggle, setToggle ] = useState(false);

    return (
        <>
                    <div className="d-none d-md-block mb-4" style={{width:"50%"}}>
                        <h1>Buscar turno</h1>
                            <Form className="mt-4" onSubmit={handleDniSubmit}>
                                <Row>
                                    <Col>
                                        {
                                            !iSearchedButton ?  <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                            :  <input key="test" disabled onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                        }
                                    </Col>
                                    <Col>
                                        <Button onClick={()=>setClicked()} variant="outline-success" type="submit">Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                    </div>
        </>
   )
}