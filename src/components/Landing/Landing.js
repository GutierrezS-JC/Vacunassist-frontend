import {Container, Row, Col} from 'react-bootstrap';
import { LandingCarousel } from './LandingCarousel'
import '../../styles/landing.css';

export const Landing = () => {
    return(
        <Container fluid>
            <Row className='backgroundCarousel'>
                <Col className='col-12'>
                    <LandingCarousel />
                </Col>
                <Col className='col-12 text-center'>
                    <div className='d-flex justify-content-center'>
                        <h1 style={{width:"70%", color:"white"}} className="ps-5 pe-5 pb-5 belowGreen">La aplicacion web que te permite ordenar, controlar y agilizar el procesamiento de turnos</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}