import { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

export const HeaderVacunadores = ({dni, handleChange, handleChangeSubmit, mounted, iSearchedButton, zonas, setClicked, handleDniSubmit, handleZonaSubmit }) => {
    const [clickedHeader, setClickedHeader] = useState();
    const [ toggle, setToggle ] = useState(false);

    const InputZona = () => {
        return(
            <Form className="mt-4 mb-5" onSubmit={handleZonaSubmit}>
                <Row>
                    <Col>
                        {
                            !iSearchedButton ? 
                                <Form.Select>
                                    {zonas.map((zona,index)=>{
                                        return(
                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                        )
                                    })}
                                </Form.Select>
                            :
                                <Form.Select disabled>
                                    {zonas.map((zona,index)=>{
                                        return(
                                            <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                        )
                                    })}
                                </Form.Select>
                        }
                        {/* <Form.Select>
                            {zonas.map((zona,index)=>{
                                return(
                                    <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                                )
                            })}
                        </Form.Select> */}
                    </Col>
                    <Col>
                        {<Button className="" variant="outline-success" type="submit" onClick={()=> setClicked(3)}>Buscar</Button>}
                    </Col>
                </Row>
            </Form>
        )
    }

    return (
        <>
            {mounted ? 
                <>
                    <div className="d-none d-md-block mb-4" style={{width:"50%"}}>
                        <h1>Listado de vacunadores</h1>
                        { !iSearchedButton ?
                        <Button className="" variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>
                        :<Button disabled className="" variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>}
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
                                        <Button className="" variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(1)} className="" variant="outline-success" type="submit">Buscar</Button>}
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
                                        <Button className="" variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(2)} className="" variant="outline-success" type="submit">Buscar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </div>
                    <div className="d-sm-block d-md-none mb-4" style={{width:"100%"}}>
                        <h1>Listado de vacunadores</h1>
                        {<Button className="" variant="dark" onClick={(e)=> { e.preventDefault(); setToggle(!toggle)}}>{toggle ? "Buscar por DNI" : "Buscar por Zona"}</Button>}
                        {!toggle ?
                            <Form className="mt-4" onSubmit={handleDniSubmit}>
                                <Row>
                                    <Col>
                                        <input key="test" onChange={handleChange} value={dni} className="form-control" type="text" placeholder="DNI" name="dniInput"></input>
                                    </Col>
                                    <Col>
                                        {iSearchedButton ?
                                        <Button className="" variant="dark" type="submit" onClick={()=> setClicked(0)}>Ver todo</Button>
                                        : <Button onClick={()=>setClicked(1)} className="" variant="outline-success" type="submit">Buscar</Button>}
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
                                        {<Button className="" variant="outline-success" type="submit" onClick={()=> setClicked(2)}>Buscar</Button>}
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