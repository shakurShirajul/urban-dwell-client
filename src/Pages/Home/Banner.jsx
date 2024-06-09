import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


const Banner = () => {
    return (
        <Carousel autoPlay interval={2000} infiniteLoop>
            <div>
                <img src="https://i.ibb.co/bX1FfYS/8802751-ai.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/b6tz3YN/9226083-ai.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/vzRn4PJ/7340259-ai.png" />
            </div>
            {/* <div>
                <img src="https://i.ibb.co/Fx4KFP6/checkout.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/Fx4KFP6/checkout.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/Fx4KFP6/checkout.png" />
            </div> */}
        </Carousel>
    );
    
    
    
};

export default Banner;

