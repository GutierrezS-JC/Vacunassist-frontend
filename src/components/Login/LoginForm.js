import '../../styles/login.css';
import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { LoginCode } from "./LoginCode";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const LoginForm = ({userForm, errors, errorAlert, sucessAlert, handleSubmit, handleChange}) => {
    const [hasClicked, setHasClicked] = useState();
    const [validarInput, setValidarInput] = useState();
    const [spinner, setSpinner] = useState(false);
    const [ hasValidated, setHasValidated] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true)
    },[])

    useEffect(()=>{
        if(mounted){

            const fetchAdmin = async () =>{
                try{
                    setSpinner(true)
                    const response = await axios.post("http://localhost:8080/validarAdminBooleanPost",{
                        email: userForm.email,
                        password: userForm.password
                    })
                    console.log("Hola:" + response.data)
                    setValidarInput(response.data)
                    setHasClicked(0)
                    if(response.data == true){
                        setHasValidated(true)
                        setTimeout(() => {
                            setSpinner(false)
                        }, 1500)
                    }else if(response.data == false){
                        throw "Verifique sus datos";
                    }
                }catch(err){
                    if(err){
                        errorAlert(err);
                    }
                    else{
                        console.log(`Error: ${err.message}`)
                    }
                }
            }

            const fetchUser = async () => {
                try{
                    setSpinner(true)
                    const response = await axios.post("http://localhost:8080/validarAdminBooleanPost",{
                        email: userForm.email,
                        password: userForm.password
                    })
                    console.log("Hola:" + response.data)
                    setValidarInput(response.data)
                    setHasClicked(0)
                    if(response.data == true){
                        setHasValidated(true)
                        setTimeout(() => {
                            setSpinner(false)
                        }, 1500)
                    }else if(response.data == false){
                        const response = await axios.post("http://localhost:8080/validarVacunadorBooleanPost",{
                            email: userForm.email,
                            password: userForm.password
                        })
                        console.log("Hola:" + response.data)
                        setValidarInput(response.data)
                        setHasClicked(0)
                        if(response.data == true){
                            setHasValidated(true)
                            setTimeout(() => {
                                setSpinner(false)
                            }, 1500)
                        }else if(response.data == false){
                            throw "Verifique sus datos";
                        }
                    }
                }catch(err){
                    if(err){
                        errorAlert(err);
                    }
                    else{
                        console.log(`Error: ${err.message}`)
                    }
                }
            }

            const fetchVacunador = async () =>{
                try{
                    setSpinner(true)
                    const response = await axios.post("http://localhost:8080/validarVacunadorBooleanPost",{
                        email: userForm.email,
                        password: userForm.password
                    })
                    console.log("Hola:" + response.data)
                    setValidarInput(response.data)
                    setHasClicked(0)
                    if(response.data == true){
                        setHasValidated(true)
                        setTimeout(() => {
                            setSpinner(false)
                        }, 1500)
                    }else if(response.data == false){
                        throw "Verifique sus datos";
                    }
                }catch(err){
                    if(err){
                        errorAlert(err);
                    }
                    else{
                        console.log(`Error: ${err.message}`)
                    }
                }
            }

           fetchUser()
        }
  
      },[hasClicked])
    
    
    return(
        <>
        <div className="formBox">
            <Form className="formSize mt-5 ms-3" noValidate onSubmit={handleSubmit} >
                <h2>Iniciar Sesion</h2>

                <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label><b>Email</b></Form.Label>
                    {hasValidated 
                    ? <Form.Control disabled type="email" placeholder="Ingresa tu email" onChange={handleChange} required isInvalid={errors.email} name='email'/> 
                    : <Form.Control type="email" placeholder="Ingresa tu email" onChange={handleChange} required isInvalid={errors.email} name='email' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-2">
                    <Form.Label><b>Contraseña</b></Form.Label>
                    {hasValidated
                    ? <Form.Control disabled type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required isInvalid={errors.password} name='password' />
                    : <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required isInvalid={errors.password} name='password' />}
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                {!hasValidated ? (userForm.password.length > 5 ?
                (<Button className="mt-2" variant="dark" type="submit" onClick={()=>setHasClicked(1)}>Siguiente</Button>) : (<Button className="mt-2" variant="secondary" disabled> Siguiente </Button>))
                : ( spinner ? <SpinnerLoading/> : <LoginCode userForm={userForm} handleChange={handleChange} errorAlert={errorAlert} errors={errors} />) 
                }

            </Form>
            <div className="text-muted mt-2 ms-3">
                <p>¿Sos un usuario nuevo? <Link to="/">Registrarse</Link></p>
            </div>
        </div>
        </>
    )
}