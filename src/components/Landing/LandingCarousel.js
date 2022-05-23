import Landing_1 from '../../img/Landing_1.svg';
import Landing_2 from '../../img/Landing_2.svg';
import Landing_3 from '../../img/Landing_3.svg';
import '../../styles/landing.css';
import { Carousel } from 'react-bootstrap';

export const LandingCarousel = () =>{
    return(
        <Carousel indicators={false}>
            <Carousel.Item interval={4000}>
                <div className='text-center'>
                    <img alt="landingDecoration" className="img-fluid-max sizeImgLanding" src={Landing_1} />
                </div>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <div className='text-center'>
                    <img alt="landingDecoration" className="img-fluid-max sizeImgLanding" src={Landing_2} />
                </div>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <div className='text-center'>
                    <img alt="landingDecoration" className="img-fluid-max sizeImgLanding" src={Landing_3} />
                </div>
            </Carousel.Item>
        </Carousel>
    )
}