import '../../styles/login.css';
import LoginUndraw2 from '../../img/LoginUndraw2.svg';
import LoginUndraw1 from '../../img/LoginUndraw1.svg';
import LoginUndraw3 from '../../img/LoginUndraw3.svg';
import { Carousel } from 'react-bootstrap';
/*Ro, cambie imagenes del carousel y texto de abajo */
export const LoginCarousel = () =>{
    return(
        <Carousel indicators={true} controls={false}>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <div>
                <Carousel.Caption>
                    <h3>Registrate</h3>
                    <p>O inicia sesion</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw1} />
                </div>
                <Carousel.Caption>
                    <h3>Obetené información o pedi turnos para tus vacunas</h3>
                    <p>Desde la comodidad de tu casa!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw3} />
                </div>
                <Carousel.Caption>
                    <h3>Ponele el brazo a la vacuna!</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}