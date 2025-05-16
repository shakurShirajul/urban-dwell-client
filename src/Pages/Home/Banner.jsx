import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.jpg";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="pt-20">
      <Carousel autoPlay interval={2000} infiniteLoop>
        <div className="aspect-[16/6]">
          <img
            src="https://i.ibb.co/bX1FfYS/8802751-ai.png"
            className="w-full h-full object-bottom"
          />
        </div>
        <div className="aspect-[16/6]">
          <img
            src="https://i.ibb.co/b6tz3YN/9226083-ai.png"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="aspect-[16/6]">
          <img
            src="https://i.ibb.co/vzRn4PJ/7340259-ai.png"
            className="w-full h-full object-bottom"
          />
        </div>
        <div className="aspect-[16/6]">
          <img src={banner1} className="w-full h-full object-bottom" />
        </div>
        <div className="aspect-[16/6]">
          <img src={banner2} className="w-full h-full object-bottom" />
        </div> */}
      </Carousel>
    </div>
  );
};

export default Banner;
