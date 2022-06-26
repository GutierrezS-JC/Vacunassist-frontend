import { Table } from "react-bootstrap";
import { SpinnerLoading } from "../Spinner/SpinnerLoading";

export const ReporteVacunas = ({turnos}) => {

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
                                <td key={`FechaAplicacion${index}`}>{turno.fechaAplicacion}</td>
                                <td key={`Estado${index}`}>{turno.asistio == null ? "Pendiente" : (turno.asistio ? "Aplicada" : "No aplicada")}</td>
                            </tr>
                    )
                })}
            </>
        )
    }

    const TableTurnos = () => {
        return(
            <Table striped bordered hover responsive="lg" className="mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del paciente</th>
                        <th>DNI</th>
                        <th>Vacunatorio</th>
                        <th>Vacuna</th>
                        <th>Fecha de aplicacion</th>
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
            {turnos.lenght !==0 ? <TableTurnos/> : <SpinnerLoading/> }
        </>
    )
}