import {Table, Button, ButtonGroup} from "react-bootstrap";
import MySwal from "sweetalert2";

export const ListadoSolicitudes = ({solicitudes, rechazar, aceptar}) => {
   const SolicitudesRender = () =>{
        return(
            <>
                {solicitudes.map((solicitud,index) => {
                    return(
                            <tr key={`tr${solicitud.id}`}>
                                <td key={`Id${solicitud.id}`}>{solicitud.pacienteId}</td>
                                <td key={`Nombre ${solicitud.id}`}>{solicitud.pacienteNombre}</td>
                                <td key={`Apellido ${solicitud.id}`}>{solicitud.pacienteApellido}</td>
                                <td key={`DNI ${solicitud.id}`}>{solicitud.pacienteDni}</td>
                                <td key={`Fecha solicitud ${solicitud.id}`}>{solicitud.fechaSolicitud}</td>
                                <td key={`Fecha actualizacion ${solicitud.id}`}>{solicitud.fechaActualizacion}</td>
                                {/*Revisar si lo de abajo esta bien */}
                                { solicitud.aprobado==null ?
                                <ButtonGroup role="group" aria-label="Basic mixed styles example">
                                    <Button type="button" className="btn btn-danger" onClick={() => rechazar(solicitud.id)}>Rechazar</Button>
                                    <Button type="button" className="btn btn-success" onClick={() => aceptar(solicitud.id)}>Aceptar</Button>
                                </ButtonGroup>
                                :<td key={`Estado ${solicitud.id}`}>{solicitud.aprobado}</td>
                                }
                            </tr>
                    )
                })}
            </>
        )
    }

    const TableSolicitudes = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>Id paciente</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Fecha solicitud</th>
                        <th>Fecha actualizacion</th>
                        <th>Estado solicitud</th>
                    </tr>
                </thead>
                <tbody>
                    <SolicitudesRender/>
                </tbody>
            </Table>
        )
    }

    return(
        <>
           {solicitudes.length !== 0 ? <TableSolicitudes/>  : <h3> No hay solicitudes para la vacuna de la Fiebre Amarilla </h3>}
        </>
    )
}