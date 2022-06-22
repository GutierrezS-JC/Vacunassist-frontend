import {Form, Row, Col, Button} from 'react-bootstrap';
import { useAuth } from '../../providers/useAuth';
import MySwal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const EditarVacunador = ({zonas, vacunadorForm, handleSubmit, handleChange}) => {

    const auth = useAuth();
    const navigate = useNavigate();

    const cancel = async () => {
        const response = await axios.get(`http://localhost:8080/getVacunador/${auth.user.id}`);
        MySwal.fire({
            title: '¿Está seguro que desea cancelar?',
            text: 'Si ha realizado cambios no se guardarán!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cancelar!',
            cancelButtonText: 'Atras'
        }).then( (result) => {
            if(result.isConfirmed){
                navigate('/vacunador');
                auth.login(response.data);
            }
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className="">
                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    {/* <Form.Control name="nombre" type="text" placeholder={auth.user.nombre} onKeyDown={handleKeyDown} /> */}
                    <Form.Control name="nombre" type="text" value={vacunadorForm.nombre} onChange={handleChange} placeholder={auth.user.nombre} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    {/* <Form.Control name="apellido" type="text" placeholder={auth.user.apellido} onKeyDown={handleKeyDown}/> */}
                    <Form.Control name="apellido" type="text" value={vacunadorForm.apellido} onChange={handleChange} placeholder={auth.user.apellido} />
                </Form.Group>
            </Row>

            <Row className="">
                <Form.Group as={Col} className="mb-3 col-12 col-sm-8" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    {/* <Form.Control name="password" type="password" placeholder="*******" onKeyDown={handleKeyDownPassword}/> */}
                    <Form.Control name="password" onChange={handleChange} type="password" placeholder="*******"/>
                </Form.Group>

                <Form.Group className="mb-3 col-12 col-sm-4" controlId="formUniqueCode">
                    <Form.Label>Codigo Unico</Form.Label>
                    {/*<Form.Control disabled name="codigoUnico" type="text" placeholder="*****" /> poner disable cuando este en la sesion del vacunador, lo saque para probar --> Okk despues lo reviso*/ }
                    <Form.Control disabled name="codigoUnico" type="text" placeholder="*****" />
                </Form.Group>
            </Row>

            <Row className="">
                <Form.Group className="mb-3 col-12 col-sm-12" controlId="formGridState">
                    <Form.Label>Zona de vacunacion</Form.Label>
                    <Form.Select name="zonaId" value={vacunadorForm.zonaId} onChange={handleChange}>
                        {zonas.map((zona, index)=>{
                            return(
                                <option key={`Zona${index}`} value={zona.id}>{zona.nombreZona}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="">
                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control disabled name="email" type="email" placeholder={auth.user.email} /> {/*/*poner disable cuando este en la sesion del vacunador, lo saque para probar */ }
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-12 col-sm-6" controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control name="dni" style={{}} disabled type="text" placeholder={vacunadorForm.dni} /> {/*/*poner disable cuando este en la sesion del vacunador, lo saque para probar */ }
                </Form.Group>
            </Row>
                {/* <Button variant="success" type='submit' onClick={successAlert}> */}
                <Button variant="danger" style={{margin: 5}} onClick={() => cancel()}>
                    Cancelar
                </Button>
                <Button variant="success" type='submit'>
                    Guardar cambios
                </Button>
        </Form>
    )
}