import '../../styles/register.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/Registro/RegisterForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../../components/Spinner/SpinnerLoading';

export const RegistroContainer = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const [ mounted, setMounted ] = useState(false);
    const [ zonas, setZonas ] = useState();
    const [ dnisPacientes, setDnisPacientes ] = useState();
    const [ emailsPacientes, setEmailsPacientes ] = useState();
    const [ validoDni, setValidoDni ] = useState(false)
    const [ vacunas, setVacunas] = useState();
    const [ willAddVacunas, setWillAddVacunas ] = useState(false);
    const [ hasClicked, setHasClicked ] = useState(0)
    const [ usuarioForm, setUsuarioForm] = useState({
        dni:'',
        nombre: '',
        apellido: '',
        fechaNacimiento: new Date(),
        email: '',
        password: '',
        riesgo: false,
        zonaId: '1'
    })
    //Json en funcion mas abajo
    const [vacunasForm, setVacunasForm] = useState([]);
    
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

    const registradoAlert = (codigoUnico) => {
        MySwal.fire({
            title: 'Usuario creado exitosamente',
            text: `Su codigo unico es ${codigoUnico}. Con el podra ingresar en el sistema, no se lo olvide`,
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
                console.log(response.data)
                setDnisPacientes(response.data);
            }
            catch(err){
                console.log(err.stack)
            }
        }

        const fetchEmailsPacientes = async () => {
            try{
                const response = await axios.get("http://localhost:8080/getEmailsPacientes");
                console.log(response.data)
                setEmailsPacientes(response.data);
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
        fetchEmailsPacientes();
        fetchVacunas();
        setMounted(true)
    },[])

    //HasClicked == 1
    useEffect(()=>{
        const postPaciente = async() => {
            console.log("En postPaciente")
            try{
                const response = await axios.post(`http://localhost:8080/cargarPaciente`,{
                    dni: +usuarioForm.dni,
                    nombre: usuarioForm.nombre,
                    apellido: usuarioForm.apellido,
                    fechaNacimiento: usuarioForm.fechaNacimiento,
                    email: usuarioForm.email,
                    password: usuarioForm.password,
                    esRiesgo: usuarioForm.riesgo,
                    zonaId: +usuarioForm.zonaId,
                    listaVacunasAnteriores: vacunasForm
                });
                console.log(response);
                if(response.data !=null && response.data!= ""){
                    registradoAlert(response.data)
                    navigate('/login')
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if(hasClicked == 1){
            postPaciente();
            setHasClicked(0)
        }

    },[hasClicked])

    const handleVacunaAdd = () => {
        setVacunasForm([...vacunasForm,
            {
                vacunaId:'1',
                fechaAplicacion: new Date(),
                zonaId:'1'
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

    const handleFechaNacimiento = (event) => {
        setUsuarioForm({...usuarioForm, ["fechaNacimiento"] : event})
    }

    // ============= VALIDACION ============= //
    const alpha = /[a-zA-Z ]/; 

    const verificarMail = () => {
        console.log(`Verificar Email ${emailsPacientes.includes(usuarioForm.email)}`)
        return emailsPacientes.includes(usuarioForm.email)
    }

    const validateEmail = (email) => {
        const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
        return emailRegex.test(email);
    };

    // Validad DNI --> Ver abajo
    const verificarDni = () => {
        console.log(`Verificar Dni ${dnisPacientes.includes(+usuarioForm.dni)}`)
        return dnisPacientes.includes(+usuarioForm.dni)
    }

    const verificarDniValido = async (dni) =>{
        try{
            const response = await axios.get(`http://localhost:8080/getDniIngresadoEsValido?dni=${dni}`);
            console.log(response.data)
            return response.data == true ? true : false; 
        }
        catch(err){
            console.log(err.stack)
        }
    }

    //HU VALIDAR DNI
    const numbers2 = /^[0-9]+$/;
    const validarDni = async () =>{
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

        //Verificacion DNI valido (registrado en tabla DNIValidos)
        if(await verificarDniValido(+usuarioForm.dni) == false){
            errorAlert("El DNI ingresado es invalido")
            setValidoDni(false);
            return
        }

        if(verificarDni() == true){
            errorAlert("El DNI ingresado ya se encuentra registrado en el sistema");
            setValidoDni(false);
            return;
        }
        successAlert2()
        setValidoDni(true);
    }

    const verificarFormularioUsuario = () => {
        const newErrors = {}
        
        if (!usuarioForm.nombre || usuarioForm.nombre.length <= 0 || usuarioForm.nombre == ""){
            newErrors.nombre="Ingrese un nombre"
            return newErrors.nombre
        }

        //Chequear caracteres numericos en nombre
        if(/\d/.test(usuarioForm.nombre) || !usuarioForm.nombre.match(alpha)){
            newErrors.nombre="El nombre solo puede contener letras"
            return newErrors.nombre
        }

        if (!usuarioForm.apellido || usuarioForm.apellido.length <= 0 || usuarioForm.apellido == ""){
            newErrors.apellido="Ingrese un apellido"
            return newErrors.apellido
        }

        //Chequear caracteres numericos apellido
        if(/\d/.test(usuarioForm.apellido)){
            newErrors.apellido="El apellido no puede contener numeros"
            return newErrors.apellido
        }

        //Agregamos REGEX para verificar que sea un mail en el formato correcto
        if(!usuarioForm.email|| usuarioForm.email.length < 5 || usuarioForm.email == "" || !validateEmail(usuarioForm.email)){
            newErrors.email="El email ingresado no es valido";
            return newErrors.email;

        //Verificar mail con datos
        }else if(verificarMail() == true){
            newErrors.email="El mail ingresado ya esta dado de alta en el sistema";
            return newErrors.email;
        }

        if (!usuarioForm.password || usuarioForm.password.length <= 0 || usuarioForm.password == "") {
            newErrors.password="La contraseña ingresada es invalida";
            return newErrors.password;
        } else if(usuarioForm.password.length >= 1 && usuarioForm.password.length < 6) {
            newErrors.password="La contraseña ingresada es demasiado corta debe tener al menos 6 caracteres";
            return newErrors.password;
        }
    }

    // ============= END VALIDACION ============= //

    const handleSubmit = (event) =>{
        event.preventDefault();
        const newErrors = verificarFormularioUsuario();
        if(newErrors){
            errorAlert(newErrors);
        }
        else{
            setHasClicked(1)
        }
        return;
    }
    
    return(
        <Container>
            <Row>
                <Col>
                    {zonas ? <RegisterForm setWillAddVacunas={setWillAddVacunas} willAddVacunas={willAddVacunas} handleVacunaAdd={handleVacunaAdd} handleFechaNacimiento={handleFechaNacimiento} handleChecked={handleChecked} handleNormalChange={handleNormalChange} handleDateChange={handleDateChange} handleVacunaChange={handleVacunaChange} handleSubmit={handleSubmit} vacunas={vacunas} vacunasForm={vacunasForm} zonas={zonas} usuarioForm={usuarioForm} validarDni={validarDni} validoDni={validoDni} />
                    : <><SpinnerLoading/> </>}
                </Col>
            </Row>
       </Container>
    )
}