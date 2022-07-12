import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export const ChartInside = ({reporteChart}) => {
    const reporte = [+reporteChart.cantidadPendientes, +reporteChart.cantidadTurnosAsistidos, +reporteChart.cantidadTurnosNoAsistidos]
    
    const data = {
        labels: ['Pendientes', 'Asistidos', 'No asistidos'],
        datasets: [
        {
            label: '# of Votes',
            data: reporte,
            backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(150, 205, 122, 0.2)',
            'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(150, 205, 122, 1)',
            'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
        },
        ],
    };
    
    return (
        <Doughnut data={data} className="mx-auto" style={{display:"block", height:"290px", width:"290px"}} />           
    )
}