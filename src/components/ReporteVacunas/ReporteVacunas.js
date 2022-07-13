import { Table, Button, Card, Row, Col, Container} from "react-bootstrap";
import React, { useState } from "react";
import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import { ChartInside } from '../../components/ReporteVacunas/ChartInside';
import {BsArrowDownSquareFill, BsArrowUpSquareFill} from 'react-icons/bs';

import Notify  from '../../img/Notify.svg';
import '../../styles/reporteVacunas.css'

export const ReporteVacunas = ({reporteTotal, reporteTotalVacunatorios, reporteTotalEnRango, reporteTotalVacunatoriosEnRango, reporteCovidChart, reporteGripeChart, 
    reporteYellowChart, reporteCovidChartEnRango, reporteGripeChartEnRango, reporteYellowChartEnRango, turnos, hasClicked, ordenarMayorMenor, ordenarMenorMayor, searchForm}) => {
    const { format } = require("date-fns");
    const [ toggle, setToggle ] = useState(false);

    const TurnosRender = () =>{
        return(
            <>
                {turnos.map((turno,index) => {
                    return(
                            <tr key={`tr${index}`}>
                                <td key={`TurnoId_${index}`}>{turno.id}</td>
                                <td key={`NombreCompleto${index}`}>{turno.nombrePaciente} {turno.apellidoPaciente}</td>
                                <td key={`DNI${index}`}>{turno.dni}</td>
                                <td key={`Vacunatorio${index}`}>{turno.nombreVacunatorio}</td>
                                <td key={`Vacuna${index}`}>{turno.nombreVacuna}</td>
                                <td key={`FechaAplicacion${index}`}>{format(new Date(turno.fechaAplicacion),"dd/MM/yyyy")}</td>
                                <td key={`HoraAplicacion${index}`}>{format(new Date(turno.fechaAplicacion),"HH:mm")}</td>
                                <td key={`Estado${index}`}>{turno.asistio == null ? "Pendiente" : (turno.asistio ? "Aplicada" : "No aplicada")}</td>
                            </tr>
                    )
                })}
            </>
        )
    }

    const TableTurnos = () => {
        return(
            <>
                <hr className="mt-5"/>
                <h1 className="display-5">Reporte</h1>
                <Table bordered hover responsive="lg" className="mb-5 mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre del paciente</th>
                            <th>DNI</th>
                            <th>Vacunatorio</th>
                            <th>Vacuna</th>
                            <React.Fragment>
                                {toggle ?
                                    <th>Fecha programada (DESC) <BsArrowDownSquareFill
                                        onClick={() => {ordenarMayorMenor(turnos); setToggle(false)}} />
                                    </th>
                                :
                                    <th>Fecha programada (ASC) <BsArrowUpSquareFill
                                        onClick={() => {ordenarMenorMayor(turnos); setToggle(true)}} />
                                    </th>
                                }
                            </React.Fragment>
                            <th>Hora</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TurnosRender/>
                    </tbody>
                </Table>
            </>
        )
    }
    
    // const CardResumen = ({title, data, dataTotal, dateOne, dateTwo}) => {
    //     return(
    //         <Card border="secondary" style={{ width: '18rem' }} className="mt-4 shadow p-3 mb-5 bg-body rounded">
    //             <Card.Body>    
    //                 <Card.Title>{title}</Card.Title>
    //                 <Card.Subtitle className="mb-2 text-muted">{dateTwo == null ? `${dateOne}` : `${format(new Date(dateOne),"dd/MM/yyyy")} - ${format(new Date(dateTwo),"dd/MM/yyyy")}`}</Card.Subtitle>
    //                 <hr className="my-3"/>
    //                 <ul className="list-unstyled mt-3">
    //                         <li className="text-muted"><strong>Turnos (Total): {dataTotal.cantidadTotal}</strong></li>
    //                         <ul>
    //                             <li>Asistidos: {dataTotal.cantidadTurnosAsistidos}</li>
    //                             <li>No asistidos: {dataTotal.cantidadTurnosNoAsistidos}</li>
    //                             <li>Pendientes: {dataTotal.cantidadPendientes}</li>
    //                         </ul>
    //                 </ul>
    //                 <hr className="my-3"/>
    //                     {data.map((reporteVac, index) => {
    //                         return(
    //                             <ul className="list-unstyled mt-3" key={index}>
    //                                 <li className="text-muted"><strong>{reporteVac.nombreVacunatorio}</strong></li>
    //                                 <ul>
    //                                     <li>Asistidos: {reporteVac.cantidadTurnosAsistidos}</li>
    //                                     <li>No asistidos: {reporteVac.cantidadTurnosNoAsistidos}</li>
    //                                     <li>Pendientes: {reporteVac.cantidadPendientes}</li>
    //                                 </ul>
    //                             </ul>
    //                         )
    //                     })}
    //             </Card.Body>
    //         </Card>
    //     )
    // }

    // const ResumenTotal = () => {
    //     return(
    //         <>
    //             <Container>
    //                 <h1 className="display-5">Metricas</h1>
    //                 {/* <h4>Total</h4> */}
    //                 <Row>
    //                     <Col md={3}>
    //                         <CardResumen title={"Total"} data={reporteTotalVacunatorios} dataTotal={reporteTotal} dateOne={"Historico"} dateTwo={null}/>
    //                     </Col>
    //                     <Col md={9}>
    //                         <Row>
    //                             <Col>
    //                                 <h4 className="text-center">Covid-19</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteCovidChart.cantidadTotal} </p>
    //                                 <ChartInside reporteChart={reporteCovidChart} />
    //                             </Col>
    //                             <Col>
    //                                 <h4 className="text-center">Gripe</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteGripeChart.cantidadTotal}</p>
    //                                 <ChartInside reporteChart={reporteGripeChart} />
    //                             </Col>
    //                             <Col>
    //                                 <h4 className="text-center">Fiebre Amarilla</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteYellowChart.cantidadTotal} </p>
    //                                 <ChartInside reporteChart={reporteYellowChart} />
    //                             </Col>
    //                         </Row>
    //                     </Col>
    //                 </Row>
    //                 <hr/>
    //                 <Row>
    //                     <Col md={3}>
    //                         <CardResumen title={"En rango"} data={reporteTotalVacunatoriosEnRango} dataTotal={reporteTotalEnRango} dateOne={searchForm.fechaInicio} dateTwo={searchForm.fechaFin}/>
    //                     </Col>
    //                     <Col md={9}>
    //                         <Row>
    //                             <Col>
    //                                 <h4 className="text-center">Covid-19</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteCovidChartEnRango.cantidadTotal} </p>
    //                                 <ChartInside reporteChart={reporteCovidChartEnRango} />
    //                             </Col>
    //                             <Col>
    //                                 <h4 className="text-center">Gripe</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteGripeChartEnRango.cantidadTotal}</p>
    //                                 <ChartInside reporteChart={reporteGripeChartEnRango} />
    //                             </Col>
    //                             <Col>
    //                                 <h4 className="text-center">Fiebre Amarilla</h4>
    //                                 <p className="text-center">Cantidad de turnos (total): {reporteYellowChartEnRango.cantidadTotal} </p>
    //                                 <ChartInside reporteChart={reporteYellowChartEnRango} />
    //                             </Col>
    //                         </Row>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </>
    //     )
    // }

    return(
        <>
            {turnos.length !==0 ? 
            <>
                <TableTurnos/> 
                {/* <hr/> */}
                {/* <ResumenTotal/> */}
            </>
            :
            <>
                <img alt="notFound" className="notFound" src={Notify} /> 
                <p className="text-center fs-4 fw-light">Aun no se han asignado turnos para la vacuna de {hasClicked == 1 ? "Covid" : (hasClicked == 2 ? "Gripe" : "Fiebre Amarilla")}</p> 
            </>
            }
        </>
    )
}