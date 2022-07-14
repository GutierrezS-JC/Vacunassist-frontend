import { Table, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Notify  from '../../img/Notify.svg';
import '../../styles/reporteVacunas.css'

export const ListadoTurnosDia = ({turnosDia, registrarAsistenciaTurno, registrarInasistenciaTurno}) => {
    const { format } = require("date-fns");
    const navigate = useNavigate();

    const TurnosRender = () =>{
        return(
            <>
                {turnosDia.map((turno,index) => {
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
                                <td>
                                    <span className="d-flex justify-content-center">
                                        {
                                            turno.asistio == null ? 
                                            <>
                                                <Button size="sm" variant="success" className="me-2" onClick={()=> registrarAsistenciaTurno(turno.id)}>Asistio</Button>
                                                <Button size="sm" variant="danger" onClick={()=> registrarInasistenciaTurno(turno.id)}>No asistio</Button>
                                            </>
                                            : "-"
                                        }
                                    </span>
                                    {/* <Col>
                                        <a href="http://localhost:8080/pdf/generate" target="_self" download style={{textDecoration:"none"}}> <Button>PDF</Button> </a>
                                    </Col> */}
                                </td>
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
                        <th>Fecha programada</th>
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
            {turnosDia.length !==0 ? <TableTurnos/> 
            :
            <>
                <img alt="notFound" className="notFound" src={Notify} /> 
                <p className="text-center fs-4 fw-light">No hay turnos previstos para hoy</p> 
                <Button className="mx-auto" style={{display:"block"}} variant={"success"} onClick={() => navigate('/vacunador')} >Volver al menu</Button>
            </>
            }
        </>
    )
}