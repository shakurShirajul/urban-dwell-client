import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Coupons from "./Coupons/Coupons";
import Location from "./Location";
import OurApartments from "./OurApartments";

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
