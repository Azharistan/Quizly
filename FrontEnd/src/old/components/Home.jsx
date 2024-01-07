import './style/Home.css'; 
import Home2 from './HomeSubComponents/Home2';
import ImageSlider from './HomeSubComponents/Slider';
import Footer from './HomeSubComponents/Footer';

const Home = () => {
  return (
    <div>
    <ImageSlider/>
    <Home2/>
    <Footer/>
    </div>
  )
}
export default Home;

