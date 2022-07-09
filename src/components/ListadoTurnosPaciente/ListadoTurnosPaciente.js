export const ListadoTurnosPaciente = ({turnos}) => {
    return(
        <>
            {turnos.length !== 0 ? <TableTurnosPaciente />  :
                <>
                    <img alt="notFound" className="notFound" src={Notify} /> 
                    <p className="text-center fs-4 fw-light">No hay turnos pendientes para el paciente </p> 
                    <Button className="mx-auto" style={{display:"block"}} variant={"success"} onClick={() => navigate('/admin')} >Volver al menu </Button>
                </>
            }
        </>
    )
}