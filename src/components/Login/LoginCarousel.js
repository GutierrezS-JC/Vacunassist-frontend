import '../../styles/login.css';
import LoginUndraw2 from '../../img/LoginUndraw2.svg';
import { Carousel } from 'react-bootstrap';

export const LoginCarousel = () =>{
    return(
        <Carousel indicators={true} controls={false}>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <div>
                <Carousel.Caption>
                    <h3>Solicita un turno</h3>
                    <p>O no...</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <Carousel.Caption>
                    <h3>Administra tus vacunas</h3>
                    <p>Si queres...</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <Carousel.Caption>
                    <h3>Siempre disponibles</h3>
                    <p>Ponele...</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}