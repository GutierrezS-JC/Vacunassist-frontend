import { SpinnerLoading } from "../Spinner/SpinnerLoading";
import { Form, Button } from "react-bootstrap"
import { useAuth } from '../../providers/useAuth';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MySwal from "sweetalert2";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const RegistrarAplicacionVacuna = ({AplicacionForm, vacunas}) => {

    const auth = useAuth();
    const navigate = useNavigate();

    const registrar = async () => {
        //const response = await axios.get(`http://localhost:8080/getPacienteByDni/${auth.user.dni}`);
        MySwal.fire({
            title: '¿Está seguro que desea registrar esta aplicacion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
            cancelButtonText: 'No',
        }).then( (result) => {
            if(result.isConfirmed){
                navigate('/paciente');          //cambiar a endpoint registrar aplicacion vacuna
                //auth.login(response.data[0]);
            }
        })
    }

    return(
        <>
        <div className="formBox">
            <Form className="formSize mt-5 ms-3" noValidate  >
                <h2>Registrar aplicacion de vacuna</h2>

                <Form.Group controlId="formBasicDni" className="mb-2">
                    <Form.Label><b>Dni</b></Form.Label>
                    <Form.Control /*name="dni"*/ value={AplicacionForm.dni} /*onChange={handler q evalua dni solo nros?}*/ type="dni" placeholder="Ingrese el dni del paciente"/> 
                </Form.Group>

                <Form.Group controlId="formBasicVacuna" className="mb-2">
                    <Form.Label><b>Vacuna</b></Form.Label>
                    <Form.Select name="tipoVacuna" value={AplicacionForm.tipoVacuna} /*onChange={handleChange}?*/>
                        {vacunas.map((vacuna, index)=>{
                            return(
                                <option key={`Vacuna${index}`} value={vacuna.id}>{vacuna.nombreVacuna}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>

                <Button className="mt-2" variant="dark" type="submit" >Registrar</Button> {/*onClick={() => registrar()}*/}
                
            </Form>
        </div>
        </>
    )
}