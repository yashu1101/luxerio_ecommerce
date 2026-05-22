import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProductCategory } from "../../components/ProductCategory/ProductCategory";
import { Navbar } from "../../components/Navbar/Navbar";
import { Slider } from "../../components/Slider/Slider";
import { Carousel } from "../../components/Carousel/Carousel";
import { Loader } from "../../components/Loader/Loader";
import { Filter } from "../../components/Filter/Filter";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>

      <ProductCategory> </ProductCategory>

      <Slider
        title={"Try new fashion"}
        category="fashion"
        to="/category/fashion"></Slider>
      <Slider
        title={"Top deals on smartphones"}
        category="smartphone"
        to="/category/smartphone"></Slider>
      <Slider
        title={"Gaming laptops"}
        category="laptop"
        to="/category/laptop"></Slider>

        <Footer></Footer>
    </>
  );
};
