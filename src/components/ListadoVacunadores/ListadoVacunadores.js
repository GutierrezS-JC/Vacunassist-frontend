import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';

export const ListadoVacunadores = () => {   
    const [ vacunadores, setVacunadores ] = useState(); 
    const [ vacunadoresDni, setVacunadoresDni ] = useState(); 
    const [ iSearchedButton, setISearchedButton ] = useState(false);
    const [ clicked, setClicked ] = useState();

    useEffect(()=>{
       getVacunadores();
    }, []);

    const getVacunadores = () =>{
        axios.get("http://localhost:8080/getVacunadores")
        .then((res) => {
            console.log(res.data)
            const allVacunadores = res.data;
            setVacunadores(allVacunadores);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getVacunadoresEnRango = (dniMin, dniMax) =>{
        axios.get(`http://localhost:8080/getVacunadoresEnRango?inferiorDni=${dniMin}&superiorDni=${dniMax}`)
        .then((res) => {
            console.log(res.data)
            const searchedVacunadores = res.data;
            setVacunadores(searchedVacunadores);
            setISearchedButton(true);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const Table2 = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>DNI</th>
                        <th>Zona</th>
                        <th>Vacunatorio</th>
                    </tr>
                </thead>
                <tbody>
                {vacunadores.map((vacunador,index) => {
                    console.log(vacunador.zonas)
                    console.log(vacunador.zonas[0].nombreZona)
                    return(
                        
                            <tr key={`tr${vacunador.id}`}>
                                <td key={`Id${vacunador.id}`}>{vacunador.id}</td>
                                <td key={`Nombre ${vacunador.id}`}>{vacunador.nombre}</td>
                                <td key={`Apellido ${vacunador.id}`}>{vacunador.apellido}</td>
                                <td key={`Email ${vacunador.id}`}>{vacunador.email}</td>
                                <td key={`DNI ${vacunador.id}`}>{vacunador.dni}</td>
                                <td key={`Zona${vacunador.id}`}>{vacunador.zonas[0].nombreZona}</td>
                                <td key={`Vacunatorio${vacunador.id}`}>{vacunador.zonas[0].vacunatorio.nombreVacunatorio}</td>
                            </tr>
                    )
                })}
                </tbody>
            </Table>
        )
    }

    const handleDniSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.dniMin.value);
        if(clicked == 1){
            getVacunadores();
            setISearchedButton(false);
        }
        else{
            getVacunadoresEnRango(event.target.dniMin.value, event.target.dniMax.value);
        }
        //const form = e.currentTarget;
    }

    const handleVacunadoresRango = (event) => {
        console.log(event.value)
        getVacunadoresEnRango(event.target.dniMin.value, event.target.dniMax.value);
    }

    const handleVacunadores = () => {
        getVacunadores();
    }

    // const handleChange = (event) => {
    //     console.log(event.target.value)
    //     setRange({ ...range, [event.target.name]: event.target.value });
    // };

    const InputDNI = () => {
        return(
            <Form className="mt-4" onSubmit={handleDniSubmit}>
                <Row>
                    <Col>
                        <input className="form-control" type="text" placeholder="DNI Min" name="dniMin" aria-label="default input example"></input>
                        {/* <Form.Control value={range.dniMin} onChange={handleChange} type="text" placeholder="DNI Min" name="dniMin" /> */}
                    </Col>
                    <Col>
                        <input className="form-control" type="text" placeholder="DNI Max" name="dniMax" aria-label="default input example"></input>
                        {/* <Form.Control value={range.dniMax} onChange={handleChange} type="text" placeholder="DNI Max" name="dniMax" /> */}
                    </Col>
                    <Col>
                        {iSearchedButton ? <Button className="" variant="dark" type="submit" onClick={setClicked(1)}>Ver todo</Button> : <Button onClick={setClicked(2)}className="" variant="dark" type="submit">Siguiente</Button>}
                    </Col>
                </Row>
            </Form>
        )
    }

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block mb-4" style={{width:"50%"}}>
                    <h1>Listado de vacunadores</h1>
                    <InputDNI/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Listado de vacunadores</h1>
                    <InputDNI/>
                </div>

                <Row>
                    <Col md={8}>
                        {vacunadores ? <Table2/> : <><h3>No hay vacunadores registrados en el sistema</h3></>}
                        {/* <Tabla/> */}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}