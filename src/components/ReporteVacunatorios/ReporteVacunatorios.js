import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ReporteVacun } from "./ReporteVacun";
export const ReporteVacunatorios = () => {
    const [ vacunasvac, setVacunasVac ] = useState();
    const [ vacunatorios, setVacunatorios] = useState();
    const [ vacunasTipo, setVacunas] = useState();
    const [ mounted, setMounted] = useState();

    useEffect(()=>{
        getAllVacunasVac(); 
        getVacunatorios();
        getVacunasTipo()
            setMounted(true);
        
    }, []);

    // const getVacunatorios = () =>{
    //     axios.get("http://localhost:8080/getVacunatorios")
    //     .then((res) => {
    //         console.log(res.data)
    //         const allVacunatorios = res.data;
    //         setVacunatorios(allVacunatorios);
    //     })
    //     .catch(error => console.log('Error: ' + error));
    // }

    const getVacunatorios = () =>{
        axios.get("http://localhost:8080/getVacunatorios")
        .then((res) => {
            console.log(res.data)
            const allVacunatorios = res.data;
            setVacunatorios(allVacunatorios);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getVacunasTipo = () =>{
        axios.get("http://localhost:8080/getVacunas")
        .then((res) => {
            console.log(res.data)
            const allVacunas = res.data;
            setVacunas(allVacunas);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getAllVacunasVac = () =>{
        axios.get(`http://localhost:8080/getAllVacunatoriosVacunas`)
        .then((res) => {
            console.log(res.data)
            console.log(res)
            const all = res.data;
            setVacunasVac(all);
            console.log(vacunasvac)
        })
        .catch(error => console.log('Error: ' + error));
    }
    

    // const CardAdmin = ({name}) => {
    //     return(
    //         <>
    //             <Card border="success" style={{ width: '18rem' }} className="mt-4">
    //                 <Card.Body>    
    //                     <Card.Title>{name}</Card.Title>
    //                     <table class="table">
    //                         <thead>
    //                             <tr>
    //                             <th scope="col">Vacuna</th>
    //                             <th scope="col">Cantidad</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             {vacunasVac.map((vacunatorio, index)=>{
    //                                 console.log(vacunatorio)
    //                                 return(
    //                                     <tr key={`tr${vacunatorio.idVacunatorio}`}>
    //                                         <td>key={`Nombre${vacunatorio.nombreVacunatorio}`}</td>
    //                                         <td>20 </td>
                                            
    //                                     </tr>
    //                                 )
    //                             })}
    //                         </tbody>
    //                     </table>
    //                 </Card.Body>
    //             </Card>
    //         </>
    //     )
    // }

    // const CardAdmin = ({vacun}) => {
    //     return(
    //         <>
    //             <Card border="success" style={{ width: '18rem' }} className="mt-4">
    //                 <Card.Body>    
    //                     <Card.Title>hola</Card.Title>
    //                     <table class="table">
    //                         <thead>
    //                             <tr>
                                
    //                             </tr>
    //                         </thead>
    //                         <tbody>
                        
    //                         </tbody>
    //                     </table>
    //                 </Card.Body>
    //             </Card>
    //         </>
    //     )
    // }
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

    // const Main = () => {
    //     return(
    //         <Container className="my-4">
    //             <h1>Reporte de vacunas por vacunatorio</h1>
    //             <hr/>
    //             <Row className="g-4" xs={1} sm={2} md={2} lg={3} xl={3} >
    //                 {vacunasvac ?? vacunasvac.map((vacun, index) =>{
    //                     <Col>
    //                         <CardAdmin vacun={vacun} />
    //                     </Col>
    //                 })}
    //             </Row>
    //         </Container>
    //     )
    // }

    // const ActualizarStock = () => {
    //     return(
    //         <Container className="my-4">
    //             <h3>Actualizar stock</h3>
    //             <hr/>
    //             <Row className=" " >

    //                 <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
    //                     <Form.Label>Vacunatorio</Form.Label>
    //                     <Form.Select name="options">
    //                         {vacunatorios ?? vacunatorios.map((vacunatorio, index)=>{
    //                             return(
    //                                 <option key={`Vacunatorio${index}`} value={vacunatorio.id}>{vacunatorio.nombre}</option>
    //                             )
    //                         })}
    //                     </Form.Select>
    //                 </Form.Group>

    //                 <Form.Group className="mb-3 col-12 col-sm-3" controlId="formGridState">
    //                     <Form.Label>Vacuna</Form.Label>
    //                     <Form.Select defaultValue="Vacuna...">
    //                         <option>Gripe</option>
    //                         <option>Fiebre Amarilla</option>
    //                         <option>Covid Pfizer</option>
    //                         <option>Covid Sinopharm</option>
    //                         <option>Covid Sputnik</option>
    //                     </Form.Select>
    //                 </Form.Group>

    //                 <Form.Group as={Col} className="mb-3 col-12 col-sm-3" controlId="formCant">
    //                     <Form.Label>Cantidad</Form.Label>
    //                     <Form.Control type="text" placeholder="-100 / 100" />
    //                 </Form.Group>  

    //                 <Button variant="success" className="mb-3 col-12 col-sm-3">
    //                     Actualizar Stock
    //                 </Button>
                   
    //             </Row>
    //         </Container>
    //     )
    // }

    return(
        <>  

       
            {(vacunasvac && vacunatorios && vacunasTipo)  ? <ReporteVacun vacunasvac={vacunasvac} vacunatorios={vacunatorios} vacunasTipo={vacunasTipo} /> : <><p>Loading</p></> }
    
        </>
    )
}