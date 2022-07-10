import {Button, Table} from "react-bootstrap";

export const BuscarTurno = ({turnos}) => {

    const TurnosRender = () =>{
        return(
            <>
                {turnos.map((turno,index) => {
                    return(
                            <tr key={`tr${turno.id}`}>
                                <td key={`Id${turno.id}`}>{turno.id}</td>
                                <td key={`Fecha Asignacion ${turno.id}`}>{turno.fechaAsignacion}</td>
                                <td key={`Fecha Aplicacion ${turno.id}`}>{turno.fechaAplicacion}</td>
                                <td key={`DNI ${turno.id}`}>{turno.paciente_id.dni}</td>
                                <td key={`Nombre ${turno.id}`}>{turno.paciente.nombre}</td>
                                <td key={`Apellido ${turno.id}`}>{turno.paciente.apellido}</td>
                                <td key={`Zona ${turno.id}`}>{turno.zona.nombreZona}</td>
                                <td key={`Vacunatorio ${turno.id}`}>{turno.zona.vacunatorio.nombreVacunatorio}</td>
                                <td key={`Estado ${turno.id}`}>{turno.asistio}</td>
                            </tr>
                    )
                })}
            </>
        )
    }

    const TableTurnos = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha Asignación</th>
                        <th>Fecha Aplicación</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Vacuna</th>
                        <th>Zona</th>
                        <th>Vacunatorio</th>
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
            {turnos.length !== 0 ? <TurnosRender/>  : <h3> No hay turnos </h3>}
        </>
    )
}