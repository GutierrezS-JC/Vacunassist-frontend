import axios from 'axios';
import Dummy_Edit_Vac from '../../img/EditarPerfilVacunador.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { EditarVacunador } from '../../components/EditarVacunador/EditarVacunador';
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import { useAuth } from "../../providers/useAuth"

export const EditarVacunadorContainer = () => {
    const auth = useAuth();
    const MySwal = withReactContent(Swal);
    const [ mounted, setMounted ] = useState(false)
    const [ hasClicked, setHasClicked ] = useState(0)
    const [ spinner, setSpinner ] = useState(false);
    const [ vacunador, setVacunador ] = useState();
    const [ passwordActual, setPasswordActual ] = useState(); 
    const [ zonas, setZonas ] = useState(); 
    
    const [vacunadorForm, setVacunadorForm] = useState({
        nombre: '',
        apellido: '',
        password: '',
        zonaId:'',
        dni:'',
    })

    const alpha = /[a-zA-Z ]/; 
    const numbers = /[0-9]/; 

    const successAlert = () => {
        MySwal.fire({
            title: 'Los cambios se guardaron correctamente!',
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

        const getPassword = async() => {
            try{
                const response = await axios.get(`http://localhost:8080/getPassword?dni=${auth.user.dni}`)
                console.log(response.data)
                setPasswordActual(response.data)
            }
            catch(err){
                console.log(err)
            }
        }

        const fetchVacunador = async() => {
            console.log("En fetchVacunador")
            console.log(auth.user.dni)
            try{
                const response = await axios.get(`http://localhost:8080/getVacunadorByDni/${auth.user.dni}`);
                setVacunador(response.data[0])
                vacunadorForm.nombre = response.data[0].nombre;
                vacunadorForm.apellido = response.data[0].apellido
                vacunadorForm.zonaId = response.data[0].zonas[0].id;
                vacunadorForm.dni = response.data[0].dni
            }
            catch(err){
                console.log(err)
            }
        }
        
        fetchZonas();
        fetchVacunador();
        getPassword();
        setMounted(true)
    },[])

    useEffect(()=>{
        console.log('En segundo useEffect')
        const fetchVacunador = async() => {
            console.log("En fetchVacunador 2")
            try{
                const response = await axios.get(`http://localhost:8080/getVacunadorByDni/${auth.user.dni}`);
                setVacunador(response.data)
            }
            catch(err){
                console.log(err.stack)
            }
        }
        const editarVacunador = async() => {
            console.log("En editar vacunador 2")
            try{
                const response = await axios.put(`http://localhost:8080/editarVacunador?nombre=${vacunadorForm.nombre}&apellido=${vacunadorForm.apellido}&password=${vacunadorForm.password}&idZona=${vacunadorForm.zonaId}&dni=${vacunadorForm.dni}`);
                if(response.data == true && response!= null){
                    fetchVacunador();
                    successAlert("Su perfil se ha actualizado con exito")
                }
            }
            catch(err){
                console.log(err.stack)
            }
        }
        if(hasClicked == 1){
            editarVacunador();
            setHasClicked(0)
        }

    },[hasClicked])

    // useEffect(() => {
    //     console.log("UseEffect 3")

    //     const validarPassword = async() =>{
    //         try{
    //             const response = await axios.get(`http://localhost:8080/getVacunadorByDni?password=${vacunadorForm.password}&dni=${vacunadorForm.dni}`)
    //             if(response.data == true && response!=null){

    //             }
    //         }
    //         catch(err){

    //         }
    //     }

    // }, [validarPassword])

    const handleKeyDown = (event) => {
        if (!event.key.match(alpha)) {
            event.preventDefault();
          }
    }

    const handleKeyDownPassword = (event) => {
        if (!(event.key= " ")) {
            event.preventDefault();
          }
    }
    
    const handleKeyDownNumbers = (event) => {
        if (!event.key.match(numbers)) {
            event.preventDefault();
          }
    }

    const verificarZona = () =>{
        return (auth.user.zonas[0].id == vacunadorForm.zonaId);
    }

    const verificarPassword = () => {
        return (vacunadorForm.password == passwordActual)
    }

    const verificarFormularioVacunador = () => {
        const newErrors = {}
        if(!vacunadorForm.nombre || vacunadorForm.nombre == ""){
            newErrors.nombre="Debe ingresar un nombre"
            return newErrors.nombre;
        }
        
        if(vacunadorForm.password.length == 0){
            console.log(vacunadorForm.password)
            newErrors.password="Debe ingresar una contraseña"
            return newErrors.password;
        }

        if(vacunadorForm.password.length >= 1 && vacunadorForm.password.length < 6 ){
            newErrors.password="La contraseña debe ser mayor a 6 caracteres"
            return newErrors.password;
        }

        if(verificarPassword()){
            newErrors.password="Debe ingresar una contraseña distinta a la actual";
            return newErrors.password;
        }

        if(verificarZona()){
            newErrors.zona="Esta asignando la misma zona de vacunacion";
            return newErrors.zona;
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(vacunador)
        const newErrors = verificarFormularioVacunador();
        if(newErrors){
            errorAlert(newErrors);
        }
        else{
            setHasClicked(1)
        }
        return;
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setVacunadorForm({ ...vacunadorForm, [event.target.name]: event.target.value });
    }

    return(
        <>
            <Container className="mt-4">
                <div className="d-none d-md-block" style={{width:"50%"}}>
                    <h1>Editar perfil</h1>
                    <hr style={{}}/>
                </div>
                <div className="d-sm-block d-md-none" style={{width:"100%"}}>
                    <h1>Editar perfil</h1>
                    <hr style={{}}/>
                </div>
                <Row>
                    <Col md={6}>
                            {zonas ? (<EditarVacunador zonas={zonas} vacunadorForm={vacunadorForm} handleSubmit={handleSubmit} handleChange={handleChange} />) : (<><p>No hay nada</p></>)}
                    </Col>
                    <Col className='smSize'>
                        <img alt="registerFancyBackground" className="img-fluid-max" style={{ maxWidth: "100%", height: "90%" }} src={Dummy_Edit_Vac} />
                    </Col>
                </Row>
            </Container>  
        </>
    )
}