import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from '../../providers/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

export const LoginCode = ({userForm, errorAlert, handleChange, errors}) => {
    const [hasClickedCode, setHasClickedCode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [validarInput, setValidarInput] = useState();
    const MySwal = withReactContent(Swal)
    const auth = useAuth();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if ((event.key === " ")) {
            event.preventDefault();
        } 
    }

    const successAlert = (response) => {
        MySwal.fire({
            title: '¡Bienvenido!',
            text: ` Hola ${response.nombre}`,
            icon: 'success',
        })
    }

    useEffect(()=>{
        setMounted(true)
    },[])

    useEffect(()=>{
        if(mounted){
            const fetchUser = async () =>{
            try{
                setSpinner(true)
                const response = await axios.post("http://localhost:8080/validarAdminEsPost",{
                    email: userForm.email,
                    password: userForm.password,
                    codigo: userForm.verificationCode
                })
                console.log(response.data)
                setValidarInput(response.data)
                setHasClickedCode(false)
                if(response.data !== null && response.data !=""){
                    console.log(response.data)
                    setTimeout(() => {
                        setSpinner(false);
                        auth.login(response.data);
                        successAlert(response.data);
                        navigate('/protected');
                    }, 1500);
                }
                else{
                    throw "Verifique sus datos";
                }
            } catch(err){
                if(err){
                    errorAlert(err);
                }
                else{
                    console.log(`Error: ${err.message}`)
                }
            }
            }   
            fetchUser();
        }
  
      },[hasClickedCode])

    return(
        <>
            <Form.Group controlId="formVerificationCode" className="mb-2">
                <Form.Label><b>Código único de acceso</b></Form.Label>
                        <Form.Control onKeyDown={handleKeyDown} type="password" placeholder="Ingresa tu código" onChange={handleChange} isInvalid={errors.codeVerification} name='verificationCode' /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.codeVerification}
                        </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={()=>setHasClickedCode(true)}className="mt-2" variant="dark" type="submit">Login</Button>
        </>
    )
}