import {Table} from "react-bootstrap";

export const ListadoPacientes = ({pacientes}) => {

    const PacientesRender = () =>{
        return(
            <>
                {pacientes.map((paciente, index) => {
                    return(
                        
                            <tr key={`tr${paciente.id}`}>
                                <td key={`Id${paciente.id}`}>{paciente.id}</td>
                                <td key={`Nombre ${paciente.id}`}>{paciente.nombre}</td>
                                <td key={`Apellido ${paciente.id}`}>{paciente.apellido}</td>
                                <td key={`Email ${paciente.id}`}>{paciente.email}</td>
                                <td key={`DNI ${paciente.id}`}>{paciente.dni}</td>
                                <td key={`Fecha de Nacimiento ${paciente.id}`}>{paciente.fechaNacimiento}</td>
                                <td key={`De Riesgo ${paciente.id}`}>{paciente.esRiesgo == true ? "Si" : "No"}</td>
                                <td key={`Zona ${paciente.id}`}>{paciente.zona.nombreZona}</td>
                            </tr>
                    )
                })}
            </>
        )
    }

    const TablePacientes = () =>{
        return(
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>DNI</th>
                        <th>Fecha de Nacimiento</th>
                        <th>De Riesgo</th>
                        <th>Zona</th>
                    </tr>
                </thead>
                <tbody>
                    <PacientesRender/>
                </tbody>
            </Table>
        )
    }

    return(
        <>
            {pacientes.length !== 0 ? <TablePacientes/>  : <h3> No hay pacientes registrados en el sistema </h3>}
        </>
    )
}