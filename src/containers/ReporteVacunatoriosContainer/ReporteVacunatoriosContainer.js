import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ReporteVacunatorios } from "../../components/ReporteVacunatorios/ReporteVacunatorios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

export const ReporteVacunatoriosContainer = () => {
    const [ vacunasvac, setVacunasVac ] = useState();
    const [ vacunatorios, setVacunatorios] = useState();
    const [ vacunasTipo, setVacunas] = useState();
    const [ mounted, setMounted] = useState();
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    

    useEffect(()=>{
        getAllVacunasVac(); 
        getVacunatorios();
        getVacunasTipo()
            setMounted(true);
        
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

    const getVacunasTipo = () =>{
        axios.get("http://localhost:8080/getVacunas")
        .then((res) => {
            console.log(res.data)
            const allVacunas = res.data;
            setVacunas(allVacunas);
        })
        .catch(error => console.log('Error: ' + error));
    }

    const getAllVacunasVac = () =>{
        axios.get(`http://localhost:8080/getAllVacunatoriosVacunas`)
        .then((res) => {
            console.log(res.data)
            console.log(res)
            const all = res.data;
            setVacunasVac(all);
            console.log(vacunasvac)
        })
        .catch(error => console.log('Error: ' + error));
    }

    const postStock = (vacunatorioId, vacunaId, stockCant) =>{
        axios.post(`http://localhost:8080/actualizarStockSaumando?vacunatorioId=${vacunatorioId}&vacunaId=${vacunaId}&stock=${stockCant}`)
        .then((res) => {
            console.log(res.data)
            console.log(res)
            const all = res.data;
            setVacunasVac(all);
            console.log(vacunasvac)
        })
        .catch(error => console.log('Error: ' + error));
    }
    
    const errorAlert = (error) => {
        MySwal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
        })
    }

    const successAlert = (todoGood) => {
        MySwal.fire({
            title: '¡Todo bien!',
            text: todoGood,
            icon: 'success',
        })
    }

    const validarForm = (target) =>{
        const newErrors = {}
        
        vacunasvac.map((vacunavac,index) =>{
            return(
                vacunavac.listaVacunas.map((e,index)=>{
                    if(target.optionsVacuna.value == e.vacunaId && target.optionsVacunatorio.value == vacunavac.idVacunatorio){
                        console.log(e.stock)
                        console.log(+target.cantidadAdd.value)
                        if(e.stock + (+target.cantidadAdd.value) < 0){
                            console.log("ojo es menor que 0");
                            newErrors.stockError="El stock ingresado es invalido, no debe quedarse sin stock"
                        }
                    }
                    return(
                        <></>
                    )
                })
            )
        })
        if(newErrors.stockError)return newErrors.stockError;

        if(+target.cantidadAdd.value == 0){
            return newErrors.esCero="Ingrese una cantidad"
        }

        return;
    }

    const handleSubmitStock = (event) =>{
        event.preventDefault()
        const newErros = validarForm(event.target)
        if (newErros){
            console.log(newErros)
            errorAlert(newErros)
        }
        else{
            console.log(+event.target.optionsVacunatorio.value)
            console.log(event.target.optionsVacunatorio.value)
            postStock(+event.target.optionsVacunatorio.value, +event.target.optionsVacuna.value, +event.target.cantidadAdd.value)
            navigate('/admin')
            successAlert("Se actualizo el stock correctamente")
        }
    }

    return(
        <>         
            {(vacunasvac && vacunatorios && vacunasTipo)  ? <ReporteVacunatorios vacunasvac={vacunasvac} vacunatorios={vacunatorios} vacunasTipo={vacunasTipo} handleSubmitStock={handleSubmitStock} /> : <><p>Loading</p></> }
        </>
    )
}