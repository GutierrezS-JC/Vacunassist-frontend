import { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

export const HeaderVacunadores = ({dni, handleChange, handleChangeSubmit, mounted, iSearchedButton, zonas, setClicked, handleZonaSubmit, handleDniSubmit }) => {
    const [ toggle, setToggle ] = useState(false);

    return (
        <>
            {mounted ? 
                <>
                    <div className="d-none d-md-block mb-4" style={{width:"50%"}}>
                        <h1>Listado de vacunadores</h1>
                        { !iSearchedButton ?
                        <Button variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>
                        :<Button disabled variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>}
                        {!toggle ?
                        <>
                            <Form className="mt-4" onSubmit={handleDniSubmit}>
                                <Row>
                                    <Col>
                                        {
                                            !iSearchedButton ?  <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                            :  <input key="test" disabled onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                        }
                                        {/* <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input> */}
                                    </Col>
                                    <Col>
                                        {iSearchedButton ?
                                        <Button variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(1)} variant="outline-success" type="submit">Buscar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        </> 
                        :
                            <Form className="mt-4 mb-5" onSubmit={handleZonaSubmit}>
                                <Row>
                                    <Col>
                                        {
                                            !iSearchedButton ? 
                                                <Form.Select name="zonaId" onChange={handleChangeSubmit}>
                                                    {zonas.map((zona,index)=>{
                                                        return(
                                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            :
                                                <Form.Select name="zonaId" onChange={handleChangeSubmit} disabled>
                                                    {zonas.map((zona,index)=>{
                                                        return(
                                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                        }
                                    </Col>
                                    <Col>
                                        {iSearchedButton ?
                                        <Button variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(2)} variant="outline-success" type="submit">Buscar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </div>
                    <div className="d-sm-block d-md-none mb-4" style={{width:"100%"}}>
                        <h1>Listado de vacunadores</h1>
                        {<Button variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>}
                        {!toggle ?
                            <Form className="mt-4" onSubmit={handleDniSubmit}>
                                <Row>
                                    <Col>
                                        <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                    </Col>
                                    <Col>
                                        {iSearchedButton ?
                                        <Button variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(1)} variant="outline-success" type="submit">Buscar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        :
                            <Form className="mt-4 mb-5" onSubmit={handleZonaSubmit}>
                                <Row>
                                    <Col>
                                        {
                                            !iSearchedButton ? 
                                                <Form.Select name="zonaId" onChange={handleChangeSubmit}>
                                                    {zonas.map((zona,index)=>{
                                                        return(
                                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            :
                                                <Form.Select name="zonaId" onChange={handleChangeSubmit} disabled>
                                                    {zonas.map((zona,index)=>{
                                                        return(
                                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                        }
                                    </Col>
                                    <Col>
                                        {<Button variant="outline-success" type="submit" onClick={()=> setClicked(2)}>Buscar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </div>
                </> 
            : <> </> }
        </>
    )
}