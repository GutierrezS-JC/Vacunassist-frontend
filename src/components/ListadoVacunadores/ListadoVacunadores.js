import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Dummy_Vac from '../../img/Vacunador.svg';

export const ListadoVacunadores = ({ vacunadorDni, vacunadores}) => {

    const VacunadoresRender = () =>{
        return(
            <>
                {vacunadores.map((vacunador,index) => {
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
            </>
        )
    }

    const vacundorDni = () =>{

    }

    const TableVacunadores = () =>{
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
                    <VacunadoresRender/>
                </tbody>
            </Table>
        )
    }

    return(
        <>
            {vacunadores ? <TableVacunadores/>  : <h3> No hay vacunadores registrados en el sistema </h3>}
        </>
    )
}