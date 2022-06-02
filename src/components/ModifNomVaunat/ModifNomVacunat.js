import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Dummy_Register_Vac from '../../img/Dummy_Register_Vac.svg';
import {useState} from 'react';

{/*document.addEventListener("DOMContentLoaded", function() {
    console.log('asd');
    let formulario = document.getElementById("formNameVacun");
    console.log('asd');
    formulario.addEventListener("submit", validarFormulario2); 
    console.log('asd');
});
*/}
  
{/*function validarFormulario(evento) {
    evento.preventDefault();
    console.log(evento.name);
    console.log(evento.value);
    var i = document.formNameSelect.options.length;
    var indice = document.getElementById('options').selectedIndex;
    if(indice == null || indice === 0) {
        alert('Debe seleccionar un vacunatorio');
        return;
    }
    var formNameChange = document.getElementById('formNameChange').value;
    if(formNameChange.length === 0) {
        alert('Debe ingresar un nuevo nombre');
        return;
    }
    for(var j=1; j!==i; j++){
        if(document.formNameChange.options[j].text === document.formNameSelect.options.value)
        {
            alert('Ya existe un vacunatorio con el nombre indicado, ingrese uno distinto');
        }
        return;
    }
    this.submit();
}
*/}


export const ModifNomVacunat = () => {
    const [ errors, setErrors ] = useState({})
    const [ options, setOptions ] = useState('')
    const [ nameVacun, setNameVacun ] = useState('')

    const [vacunatorioForm, setVacunatorioForm] = useState({
        options: '',
        nameVacun: ''
    })

    {/*const handleChange = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        setVacunatorioForm({ ...vacunatorioForm, [event.target.name]: event.target.value });
        
        //new
        if(!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };
*/}


    function validarFormulario2(evento) {
        evento.preventDefault();
        console.log(evento.name);
        console.log(evento.value);
        var indice = document.getElementById('options').selectedIndex;
        if(indice == null || indice === 0) {
            alert('Debe seleccionar un vacunatorio');
            return;
        }
        var formNameChange = document.getElementById('formNameChange').value;
        if(formNameChange.length === 0) {
            alert('Debe ingresar un nuevo nombre');
            return;
        }
        
        this.submit();
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
                    <Form.Select name="options" value={options} onChange={(e) => setOptions(e.target.value)}>
                        <option vuale="">- Seleccione un vacunatorio -</option>
                        <option value="1">Centro</option>
                        <option value="2">Terminal</option>
                        <option value="3">Cementerio</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nuevo nombre</Form.Label>
                    <Form.Control type="text" name="nameVacun" placeholder="Ingresa un nuevo nombre" value={nameVacun} onChange={validar}/>
                </Form.Group>       

                <Button className="mt-2" variant="success" id="submit">
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
                            <Opciones/>
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Register_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}