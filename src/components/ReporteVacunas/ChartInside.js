import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export const ChartInside = ({reporteChart}) => {
    console.log(reporteChart)
    const reporte = [+reporteChart.cantidadPendientes, +reporteChart.cantidadTurnosAsistidos, +reporteChart.cantidadTurnosNoAsistidos]
    console.log(reporte)
    
    const data = {
        labels: ['Pendientes', 'Asistidos', 'No asistidos'],
        datasets: [
        {
            label: '# of Votes',
            data: reporte,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
        },
        ],
    };
    
    return (
        <Doughnut data={data} className="mx-auto" style={{display:"block"}} />           
    )
}