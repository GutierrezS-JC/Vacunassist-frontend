import {Button, Table} from "react-bootstrap";

export const ListadoVacunadores = ({vacunadores, eliminar, setClicked}) => {

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
                                <td key={`Zona${vacunador.id}`}>{vacunador.zona.nombreZona}</td>
                                <td key={`Vacunatorio${vacunador.id}`}>{vacunador.zona.vacunatorio.nombreVacunatorio}</td>
                                <td><Button variant="danger" style={{margin: 5}} onClick={() => eliminar(vacunador.id)}>Eliminar</Button></td>
                            </tr>
                    )
                })}
            </>
        )
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
            {vacunadores.length !== 0 ? <TableVacunadores/>  : <h3> No hay vacunadores </h3>}
        </>
    )
}