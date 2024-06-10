import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Coupons from "./Coupons/Coupons";
import Location from "./Location";

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutUs/>
            <Location/>
            <Coupons/>
        </div>
    );
};

export default Home;