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
                { image: (Landing_Banner_1), speed: -20 },
                {
                    speed: -15,
                    children: (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-8xl text-white font-thin">Hello World!</h1>
                      </div>
                    ),
                },
                { image: '/static/banner-foreground.png', speed: -10 },
              ]}
              className="aspect-[2/1] imgTest"
            >
            <div className="absolute inset-0 d-flex items-center justify-center">
                <h1 className="text-8xl text-white font-thin">Hello World!</h1>
            </div>
            </ParallaxBanner>
        );
    };
    

    const About = () => {
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
                            <p>Podes acceder desde cualquier dispositivo con acceso a Internet.</p>
                        </div>
                        <div>
                            <h2>Simple</h2>
                            <p>Interfaz simple e intuitiva, para que nuestros usuarios puedan utilizarla fácilmente.</p>
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

    const InfoVacunas = () => {
        return(
            <Container>
                <Row className='mt-2 p-5'>
                    <Col className="col-12 col-md-6">
                        <div>
                        <Fade top>
                            <h1> Información sobre vacunas </h1>
                            <p> A continuación se brindan algunos detalles sobre los distintos tipos de vacunas que aplicamos en nuestros vacunatorios.
                            </p>
                        </Fade>
                        </div>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Fade top>
                        <div>
                            <h2> Covid-19 </h2>
                            <p>La vacuna contra el Covid-19 NO puede ser aplicada a menores de 18 años. </p>
                            <p>Si presenta algún síntoma, no debe aplicarse la vacuna.</p>
                            <p>Personas de riesgo tienen total prioridad para el otorgamiento de turnos.</p>
                        </div>
                        <div>
                            <h2> Gripe </h2>
                            <p>La vacuna contra la gripe es de una única dosis, y puede aplicarse únicamente pasado un año.</p>
                        </div>
                        <div>
                            <h2> Fiebre Amarilla</h2>
                            <p>La vacuna contra la fiebre amarilla NO puede ser aplicada a personas mayores de 60 años.</p>
                            <p>Dicha vacuna puede ser aplicada una única vez.</p>
                        </div>
                        <div>
                            <h2> Más informacióm</h2>
                            <p>Para más información sobre dichas vacunas se recomienda consultar con un médico.</p>
                        </div>
                        </Fade>
                    </Col>
                </Row>
        </Container>
        )
    }

    const Info = () => {
        return(
            <Container>
                <Row className='mt-2 p-5'>
                    <Col className="col-12 col-md-6">
                        <div>
                        <Fade top>
                            <h1> Horarios de Atención </h1>
                            <p> De lunes a viernes de 9:00am a 17:00pm
                            </p>
                        </Fade>
                        </div>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Fade top>
                        <div>
                            <h2> Vacunatorio Centro </h2>
                            <p>TEl: 221-382-2134</p> 
                            <p>DIRECCIÓN: Av. 7 y Av.51 (Plaza San Martín)</p>
                        </div>
                        <div>
                            <h2> Vacunatorio Cementerio</h2>
                            <p>TEl: 221-456-2134</p>
                            <p>DIRECCIÓN: Av. 31 y Calle 72 (Plaza Balbin)</p>
                        </div>
                        <div>
                            <h2> Vacunatorio Terminal de Omnibus</h2>
                            <p>TEl: 221-334-2345</p>
                            <p>DIRECCIÓN: Calle 4 y Calle 41 (Terminal de Omnibus)</p>
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
        <About/>
        <InfoVacunas/> 
        <section style={{height:"100vh"}}>
            <ParallaxLanding/>
        </section>
        <Info/>
        </>
        }

    </>
    )
}