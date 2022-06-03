import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { eventWrapper } from "@testing-library/user-event/dist/utils";

export const ModifNomVacun = () => {
    const [ errors, setErrors ] = useState({})
    const [ nameVacun, setNameVacun ] = useState()
    const [ vacunatorios, setVacunatorios] = useState();
    const MySwal = withReactContent(Swal)

    const successAlert = (todoGood) => {
        MySwal.fire({
            title: '¡Nombre modificado!',
            text: todoGood,
            icon: 'success',
        })
    }

    const errorAlert = (error) => {
        MySwal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
        })
    }

    useEffect(()=>{
        getVacunatorios();
     }, []);

     const getVacunatorios = () =>{
        axios.get("http://localhost:8080/getVacunatorios")
        .then((res) => {
            console.log(res.data)
            const allVacunatorios = res.data;
            setVacunatorios(allVacunatorios);
        })
        .catch(error => console.log('Error: ' + error));
    }

    //RequestParm
    const editarNombreVacunatorio = (nameVacunParam, optionValue) =>{
        axios.put(`http://localhost:8080/editarNombreVacunatorio?nombre=${nameVacunParam}&id=${optionValue}`)
        .then((res) => {
            console.log(res.data)
            const resultado = res.data;
            if(resultado == false){
                // if(nameVacunParam == "" nameVacunParam.length === 0){
                //     errorAlert("Ingrese un nombre")
                // }
                errorAlert("Ingrese un nombre valido")
            }
            else{
                successAlert("El nombre del vacunatorio ha sido modificado de forma exitosa")
            }
            getVacunatorios();
        })
        .catch(error => console.log('Error: ' + error));
    }

    const validarFormulario2 = (evento) => {
        evento.preventDefault();
        console.log(evento.name);
        console.log(evento.target.nuevoNombre.value);
        console.log(evento.target.options.value);
        editarNombreVacunatorio(evento.target.nuevoNombre.value, evento.target.options.value);
    }

    const validar = (e) => {
        e.preventDefault();
        setNameVacun(e.target.value);
    }

    const Opciones = () => {
        return(
            <Form noValidate onSubmit={validarFormulario2}>
                <Form.Group className="mb-3" controlId="formNameSelect">
                    <Form.Label>Vacunatorio</Form.Label>
                    <Form.Select name="options">
                        {vacunatorios.map((vacunatorio, index)=>{
                            return(
                                <option key={`Vacunatorio${index}`} value={vacunatorio.id}>{vacunatorio.nombre}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
                <Row>
                    <Col>
                        <input className="form-control" type="text" placeholder="Nuevo nombre de vacunatorio" name="nuevoNombre" aria-label="default input example"></input>
                    </Col>
                </Row>   

                <Button className="mt-2" variant="success" type="submit" id="submit">
                    Aceptar
                </Button>

            </Form>
        )
    } 

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Modificar nombre de un vacunatorio</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Modificar nombre de un vacunatorio</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                            {vacunatorios ? <Opciones/> : <></>}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}