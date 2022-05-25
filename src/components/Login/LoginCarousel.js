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
                    <h3>Visualiza tus turnos...</h3>
                    <p>...al instante</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <Carousel.Caption>
                    <h3>Obetené información...</h3>
                    <p>...de tus vacunas</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div>
                    <img alt="loginDecoration" className="img-fluid-max ms-4 ms-lg-4 ms-xl-5 sizeImg" src={LoginUndraw2} />
                </div>
                <Carousel.Caption>
                    <h3>Ponele el brazo...</h3>
                    <p>...a la vacuna</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}