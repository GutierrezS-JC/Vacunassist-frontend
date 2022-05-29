import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';

export const ListadoVacunadores = () => {    
/*
https://stackoverflow.com/questions/34880980/bootstrap-table-how-to-load-data-from-mysql-database-with-ajax-post 


Filtros:
https://bootstrap-table.com/docs/extensions/filter-control/
https://github.com/wenzhixin/bootstrap-table/blob/develop/site/docs/extensions/filter-control.md

Ver sandbox de la respuesta:
https://stackoverflow.com/questions/67999607/how-to-add-columns-filter-using-react-bootstrap-table
*/

    const Tabla = () =>{
        return(
            <div class="table-responsive">
                <Table class="table table-striped-columns table-bordered caption-top data-filter-control-visible">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Zona</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Mail</th>
                            <th scope="col">DNI</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <th scope="row">1</th>
                            <td>Centro</td>
                            <td>Otto</td>
                            <td>Gomez</td>
                            <td>Mail@mail.com</td>
                            <td>33333333</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Cementerio</td>
                            <td>Martin</td>
                            <td>Gomez</td>
                            <td>Mail@mail.com</td>
                            <td>34343434</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Centro</td>
                            <td>Juan</td>
                            <td>Gomez</td>
                            <td>Mail@mail.com</td>
                            <td>22222222</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Terminal</td>
                            <td>Juana</td>
                            <td>Gomez</td>
                            <td>Mail@mail.com</td>
                            <td>34454545</td>
                        </tr>
                        <tr>
                            <th scope="row">n</th>
                            <td>Cementerio</td>
                            <td>Martina</td>
                            <td>Gomez</td>
                            <td>Mail@mail.com</td>
                            <td>34342132</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Listado de vacunadores</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Listado de vacunadores</h1>
                    <hr style={{}}/>
                </div>

                <Row>
                    <Col md={8}>
                        <Tabla/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}