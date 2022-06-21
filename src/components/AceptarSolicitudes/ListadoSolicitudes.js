import {Table, Button, ButtonGroup} from "react-bootstrap";

//export const ListadoSolicitudes = ({solicitudes}) => {
export const ListadoSolicitudes = () => {
   /*const SolicitudesRender = () =>{
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
                                {
                                //<td key={`Vacunatorio${solicitud.id}`}>{solicitud.zona.vacunatorio.nombreVacunatorio}</td>
                                //}
                                //<td key={`Estado ${solicitud.id}`}>{solicitud.aprobado}</td>
                                }
                                <ButtonGroup role="group" aria-label="Basic mixed styles example">
                                    <Button type="button" class="btn btn-danger">Rechazar</Button>
                                    <Button type="button" class="btn btn-success">Aceptar</Button>
                                </ButtonGroup>
                            </tr>
                    )
                })}
            </>
        )
    }*/
    

    const TableSolicitudes = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
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
                    <tr>
                    <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <ButtonGroup role="group">
                            <Button type="button" class="btn btn-danger" id='boton-rechazar'>Rechazar</Button>
                            <Button type="button" class="btn btn-success" id='boton-aceptar'>Asignar turno</Button>
                        </ButtonGroup>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                        <td>Dos</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <ButtonGroup role="group">
                            <Button type="button" class="btn btn-danger" id='boton-rechazar'>Rechazar</Button>
                            <Button type="button" class="btn btn-success" id='boton-aceptar'>Asignar turno</Button>
                        </ButtonGroup>
                    </tr>
                    {/*<SolicitudesRender/>*/}
                </tbody>
            </Table>
        )
    }

    return(
        <>
            <TableSolicitudes/>
            {/*solicitudes.length !== 0 ? <TableSolicitudes/>  : <h3> No hay solicitudes para la vacuna de la Fiebre Amarilla </h3>*/}
        </> 
    )
}