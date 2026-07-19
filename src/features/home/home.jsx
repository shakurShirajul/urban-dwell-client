import AboutUs from "./about-us";
import Banner from "./banner";
import Coupons from "./coupons";
import Location from "./location";
import OurApartments from "./our-apartments";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <OurApartments />
      <Coupons />
      <Location />
    </div>
  );
};

export default Home;
