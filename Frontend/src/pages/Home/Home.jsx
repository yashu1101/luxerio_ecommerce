import { motion } from "framer-motion";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProductCategory } from "../../components/ProductCategory/ProductCategory";
import { Slider } from "../../components/Slider/Slider";
import { Carousel } from "../../components/Carousel/Carousel";
import { Footer } from "../../components/Footer/Footer";

import image1 from "../../assets/carousel/image1.webp";
import image2 from "../../assets/carousel/image2.webp";
import image3 from "../../assets/carousel/image3.webp";
import image4 from "../../assets/carousel/image4.webp";
import image5 from "../../assets/carousel/image5.webp";
import image6 from "../../assets/carousel/image6.webp";

export const Home = () => {
  return (
    <>
     
       
        <HeroSection></HeroSection>
        <ProductCategory> </ProductCategory>
        <Carousel
          auto
          images={[image1, image2, image3, image4, image5, image6]}></Carousel>

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
