import { Row, Col, Form, Button, FormControl } from "react-bootstrap";

export const RegistroVacunador = ({ handleChange, handleSubmit, zonas, validoDni, dni, nombre, apellido, email, clave, password, zonaId, validarDni}) => {
    return(
        <>{zonas ?
            <Form onSubmit={handleSubmit}>
                <Form.Label>DNI</Form.Label>
                {!validoDni ?
                    <Form.Group className="d-flex mb-3" >
                        <FormControl
                            type="text"
                            placeholder="..."
                            className="me-2"
                            aria-label="Search"
                            name="dni"
                            value={dni}
                            onChange={handleChange}
                            id="dniForm"
                        />
                        <Button variant="outline-success" type="submit" onClick={(e)=>{ e.preventDefault(); validarDni() }}>Validar</Button>
                    </Form.Group>
                :   <Form.Group className="d-flex mb-3" >
                        <FormControl
                            type="text"
                            placeholder="..."
                            className="me-2"
                            aria-label="Search"
                            name="dni"
                            value={dni}
                            onChange={handleChange}
                            id="dniForm"
                            disabled
                        />
                        <Button disabled variant="outline-success" type="submit" onClick={(e)=>{ e.preventDefault(); validarDni() }}>Validar</Button>
                    </Form.Group>
                }
                <Row>
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={handleChange} value={nombre} name="nombre" type="text" placeholder="..."/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control onChange={handleChange} value={apellido} name="apellido" type="text" placeholder="..."/>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={handleChange} value={email} name="email" type="email" placeholder="..." />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 col-sm-6" style={{}} controlId="formUniqueCode">
                        <Form.Label>Codigo Unico</Form.Label>
                        <Form.Control onChange={handleChange} value={clave} name="clave" type="text" placeholder="..."/>
                    </Form.Group>
                   
                </Row>


            
                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control onChange={handleChange} value={password} name="password" type="password" placeholder="..." />
                </Form.Group>
                 
                 <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select onChange={handleChange} value={zonaId} name="zonaId">
                        {zonas.map((zona, index)=>{
                            return(
                                <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
             
                {!validoDni ? 
                    (<Button variant="success" disabled type='submit'>
                        Dar de alta
                    </Button>) :
                     (<Button variant="success" type='submit'>
                        Dar de alta
                    </Button>)}
            </Form>
        : <p>Loading</p>}
        </>
    )
}