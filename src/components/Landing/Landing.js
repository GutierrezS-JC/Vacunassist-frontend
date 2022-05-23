import {Container, Row, Col} from 'react-bootstrap';
import { LandingCarousel } from './LandingCarousel';
import { useTransition, animated } from 'react-spring';

import '../../styles/landing.css';

export const Landing = () => {
    
    const About = () => {
        return(
            <Container>
            <Row className='mt-2 p-5'>
                <Col className="col-12 col-md-6">
                    <div>
                        <h1> Acerca de </h1>
                        <p>Vacunassist es la aplicación web que te permite ordenar y agilizar el procesamiento de turnos,
                            dejando atrás las grandes planillas de Excel, calendarios compartidos o múltiples cuadernos que
                            usás actualmente por cada servicio o profesional. Te permite utilizarla en cualquier dispositivo,
                            desde cualquier lugar, entre múltiples usuarios al mismo tiempo. Cada uno de ellos con diferentes permisos.
                        </p>
                    </div>
                </Col>
                <Col className="col-12 col-md-6">
                    <div>
                        <h2>Responsive</h2>
                        <p>Accede desde cualquier dispositivo</p>
                    </div>
                    <div>
                        <h2>Simple</h2>
                        <p>Interfaz simple e intuitiva, para que nuestros usuarios puedan usarla facilmente</p>
                    </div>
                    <div>
                        <h2>Placeholder</h2>
                        <p>Hola soy un placeholder porque me quede sin ideas... no me molestaria que me cambies en un futuro :)</p>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }

    return(
        <Container fluid>
            <Row className='backgroundCarousel'>
                <Col className='col-12'>
                    <LandingCarousel />
                </Col>
                <Col className='col-12 text-center'>
                    <div className='d-flex justify-content-center'>
                        <h1 className="pb-5 belowGreen textBelow">La aplicacion web que te permite ordenar, controlar y agilizar el procesamiento de turnos</h1>
                    </div>
                </Col>
            </Row>
           <About/>
        </Container>
    )
}