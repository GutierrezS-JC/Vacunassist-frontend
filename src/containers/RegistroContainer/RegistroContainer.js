import '../../styles/register.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Container, Row, Col} from 'react-bootstrap';
import { RegisterForm } from '../../components/Registro/RegisterForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';

export const RegistroContainer = () => {
    const MySwal = withReactContent(Swal)
    const [ mounted, setMounted ] = useState(false);
    const [ zonas, setZonas ] = useState();
    const [ dnisPacientes, setDnisPacientes ] = useState();
    const [ validoDni, setValidoDni ] = useState(false)
    const [vacunas, setVacunas] = useState();
    const [usuarioForm, setUsuarioForm] = useState({
        dni:'',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        riesgo: false,
        zonaId: ''
    })
    const [vacunasForm, setVacunasForm] = useState([{
        vacunaId:'',
        fechaAplicacion: new Date(),
    }]);
    
    console.log(vacunasForm)
    console.log(usuarioForm)
    //DNI NO REGISTRADO
    const successAlert2 = () => {
        MySwal.fire({
            title:'Bien',
            text: 'El DNI no se encuentra registrado',
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

        const fetchZonas = async () =>{
            console.log("En fetchZonas")
            try{
                const response = await axios.get("http://localhost:8080/getZonas");
                console.log(response.data)
                setZonas(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchDnisPacientes = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getDnisPacientes");
                setDnisPacientes(response.data);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchVacunas = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/getVacunas");
                console.log(response.data)
                setVacunas(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        
        fetchZonas();
        fetchDnisPacientes();
        fetchVacunas();
        setMounted(true)
    },[])

    // Validad DNI --> Ver abajo
    const verificarDni = () => {
        console.log(`Verificar Dni ${dnisPacientes.includes(+usuarioForm.dni)}`)
        return dnisPacientes.includes(+usuarioForm.dni)
    }

    //HU VALIDAR DNI
    const numbers2 = /^[0-9]+$/;
    const validarDni = () =>{
        if(usuarioForm.dni.length <= 0 || usuarioForm.dni == ""){
            errorAlert("El DNI no puede estar vacio")
            setValidoDni(false);
            return;
        }
        if (!usuarioForm.dni.match(numbers2)) {
            errorAlert("Solo esta permitido ingresar caracteres numericos")
            setValidoDni(false);
            return;
        }
        if (usuarioForm.dni.length >=1 && usuarioForm.dni.length < 6) {
            errorAlert("Ingrese un DNI valido")
            setValidoDni(false);
            return;
        }

        //Aca usamos el cerificar DNI de arriba O.o
        if(verificarDni() == true){
            errorAlert("El DNI ingresado ya se encuentra registrado en el sistema");
            setValidoDni(false);
            return;
        }
        successAlert2()
        setValidoDni(true);
    }

    const handleVacunaAdd = () => {
        setVacunasForm([...vacunasForm,
            {
                vacunaId:'',
                fechaAplicacion: new Date(),
            }
        ])
    }

    const handleNormalChange = (event) => {
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        setUsuarioForm({...usuarioForm, [event.target.name] : event.target.value});
    }

    const handleChecked = (event) => {
        console.log(event.target.name);
        console.log(event.target.value)
        setUsuarioForm({...usuarioForm, [event.target.name]: event.target.checked})
    }

    const handleVacunaChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...vacunasForm];
        list[index][name] = value;
        console.log(list)
        console.log(e.target)
        setVacunasForm(list)
    }

    const handleDateChange = (e, index, namex) => {
        const list = [...vacunasForm];
        list[index][namex] = e;
        setVacunasForm(list)
    }
    
    return(
        <Container>
            <Row>
                <Col>
                    {zonas ? <RegisterForm handleVacunaAdd={handleVacunaAdd} handleChecked={handleChecked} handleNormalChange={handleNormalChange} handleDateChange={handleDateChange} handleVacunaChange={handleVacunaChange} vacunas={vacunas} vacunasForm={vacunasForm} zonas={zonas} usuarioForm={usuarioForm} validarDni={validarDni} />
                    : <><SpinnerLoading/> </>}
                </Col>
            </Row>
       </Container>
    )
}