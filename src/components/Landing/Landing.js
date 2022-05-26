import '../../styles/landing.css';
import Landing_Banner_1 from '../../img/Landing_Banner_1.svg';
import {Container, Row, Col} from 'react-bootstrap';
import { LandingCarousel } from './LandingCarousel';
import { Fade } from '@albertlo/react-reveal';
import { ParallaxBanner } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';

export const Landing = () => {
    const [mounted, didMount] = useState(false);
    const [delay, setDelayBoolean] = useState(false);
    
    useEffect(()=>{
        setTimeout(() => {
            setDelayBoolean(true)
        }, 200)
    }, [mounted])

    const ParallaxLanding = () => {
        return (
            <ParallaxBanner
              layers={[
                { image: (Landing_Banner_1), speed: -20 }
              ]}
              className="aspect-[2/1] imgTest"
            >
            <div className="position-absolute top-50 start-50 translate-middle">
                <Col className='col-10 text-center'>
                    <div>
                        <Fade top>
                            <h1> Agenda tu visita al vacunatorio que mas cerca te quede desde nuestra web y vacunate! </h1>
                        </Fade>
                    </div>
                </Col>
            </div>
            </ParallaxBanner>
          );
        };
    

    const AboutUs = () => {
        return(
            <Container>
                <Row className='mt-2 p-5'>
                    <Col className="col-12 col-md-6">
                        <div>
                        <Fade top>
                            <h1> Acerca de </h1>
                            <p>Vacunassist es la aplicación web que te permite ordenar y agilizar el procesamiento de turnos,
                                dejando atrás las grandes planillas de Excel, calendarios compartidos o múltiples cuadernos que
                                usás actualmente por cada servicio o profesional. Te permite utilizarla en cualquier dispositivo,
                                desde cualquier lugar, entre múltiples usuarios al mismo tiempo. Cada uno de ellos con diferentes permisos.
                            </p>
                        </Fade>
                        </div>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Fade top>
                        <div>
                            <h2>Sobre nosotros</h2>
                            <p>Contamos con una trayectoria de mas de 10 años en la aplicación de vacunas en la Ciudad de La Plata.
                                Nuestro personal esta altamente capacitado para brindarte una experiencia optima desde el momento en el que
                                ingresas a uno de nuestros vacunatorios hasta en la aplicación de tu vacuna. </p>
                        </div>
                        <div>
                            <h2>Nos renovamos</h2>
                            <p>Para seguir mejorando desarrollamos Vacunassist, una aplicacion web que te va a permitir autogestionar tus turnos
                                de forma rapida y sencilla. Ademas te enviara un recordatorio antes de tu turno para que no lo olvides!
                            </p>
                        </div>
                        </Fade>
                    </Col>
                </Row>
        </Container>
        )
    }

    const AboutDolo = () => {
        return(
            <Container>
                <Row className='mt-2 p-5'>
                    <Col className="col-12 col-md-6">
                        <div>
                        <Fade top>
                            <h1> Acerca de </h1>
                            <p>Vacunassist es la aplicación web que te permite ordenar y agilizar el procesamiento de turnos,
                                dejando atrás las grandes planillas de Excel, calendarios compartidos o múltiples cuadernos que
                                usás actualmente por cada servicio o profesional. Te permite utilizarla en cualquier dispositivo,
                                desde cualquier lugar, entre múltiples usuarios al mismo tiempo. Cada uno de ellos con diferentes permisos.
                            </p>
                        </Fade>
                        </div>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Fade top>
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
                        </Fade>
                    </Col>
                </Row>
        </Container>
        )
    }

    return(
        <>
        <Container fluid>
            <Row className='backgroundCarousel'>
                <Col className='col-12'>
                    <LandingCarousel didMount={didMount} />
                </Col>
                <Col className='col-12 text-center'>
                    <div className='d-flex justify-content-center'>
                        <h1 className="pb-5 belowGreen textBelow">La aplicacion web que te permite ordenar, controlar y agilizar el procesamiento de turnos</h1>
                    </div>
                </Col>
            </Row>
        </Container>
        {delay &&
        <>
        <AboutUs/>
        <AboutDolo/> 
        <section style={{height:"100vh"}}>
            <ParallaxLanding/>
        </section>
        <AboutDolo/>
        </>
        }

    </>
    )
}