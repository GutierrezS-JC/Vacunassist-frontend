import {Table, Button, ButtonGroup} from "react-bootstrap";

//export const ListadoSolicitudes = ({Solicitudes}) => {
    export const ListadoSolicitudes = () => {

    {/*const SolicitudesRender = () =>{
        return(
            <>
                {solicitudes.map((solicitud,index) => {
                    return(
                        
                            <tr key={`tr${solicitud.id}`}>
                                <td key={`Id${solicitud.id}`}>{solicitud.id}</td>
                                <td key={`Nombre ${solicitud.id}`}>{solicitud.nombre}</td>
                                <td key={`Apellido ${solicitud.id}`}>{solicitud.apellido}</td>
                                <td key={`DNI ${solicitud.id}`}>{solicitud.dni}</td>
                                <td key={`Vacunatorio${solicitud.id}`}>{solicitud.zona.vacunatorio.nombreVacunatorio}</td>
                                <td key={`Vacunatorio${solicitud.id}`}>{solicitud.zona.vacunatorio.nombreVacunatorio}</td>
                                {/*<td 
                                    <ButtonGroup role="group" aria-label="Basic mixed styles example">
                                        <Button type="button" class="btn btn-danger">Rechazar</Button>
                                        <Button type="button" class="btn btn-success">Aceptar</Button>
                                    </ButtonGroup>
                                </td>
                                /*</tr><td <Button >Aceptar</Button> <Button >Rechazar</Button> </td>*/
                            //</tr>
                    //)
               // })}
            //</>
        //)
    //}
    }

    const TableSolicitudes = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>De riesgo</th>
                        <th>DNI</th>
                        <th>Vacunatorio</th>
                        <th>Estado solicitud</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td> Juan </td>
                            <td> Martinez </td>
                            <td> No </td>
                            <td> 12345678 </td>
                            <td> Municipalidad </td>
                            <td> 
                                <ButtonGroup role="group" aria-label="Basic mixed styles example">
                                    {//<Button type="button" class="btn btn-danger">Rechazar</Button>
                                    //<Button type="button" class="btn btn-success">Asignar turno</Button>
                                    }
                                    <Button>Rechazar</Button>
                                    <Button>Asignar turno</Button>
                                </ButtonGroup>
                            </td>
                            {//</tbody></tr><td <Button >Aceptar</Button> <Button >Rechazar</Button> </td>
                            }
                        </tr>
                    {//<Solicitudes Render/>
                    }
                </tbody>
            </Table>
        )
    }

    return(<TableSolicitudes/>)
        {//<>
            {//{solicitudes.length !== 0 ? <TableSolicitudes/>  : <h3> No hay solicitudes para la vacuna de la Fiebre Amarilla </h3>}
            }
        //    <TableSolicitudes/>
        //</>
        
    //)
        }
}