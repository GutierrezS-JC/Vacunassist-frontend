import { Table, Button} from "react-bootstrap";
import React, { useState } from "react";
import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import {BsArrowDownSquareFill, BsArrowUpSquareFill} from 'react-icons/bs';

import Notify  from '../../img/Notify.svg';
import '../../styles/reporteVacunas.css'

export const ReporteVacunas = ({turnos, hasClicked, ordenarMayorMenor, ordenarMenorMayor}) => {
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
            <Table bordered hover responsive="lg" className="mt-2">
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
        )
    }
    
    return(
        <>
            {turnos.length !==0 ? <TableTurnos/> 
            :
            <>
                <img alt="notFound" className="notFound" src={Notify} /> 
                <p className="text-center fs-4 fw-light">Aun no se han asignado turnos para la vacuna de {hasClicked == 1 ? "Covid" : (hasClicked == 2 ? "Gripe" : "Fiebre Amarilla")}</p> 
            </>
            }
        </>
    )
}