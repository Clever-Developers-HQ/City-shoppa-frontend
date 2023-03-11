import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { home, responsive } from "../data";
import HomeProducts from "./HomeProducts";

export default function HomeAndDecor() {
  const product = home.map((item) => (
    <HomeProducts
      key={item.id}
      imageurl={item.imageurl}
      name={item.name}
    price={item.price}
      description={item.description}
    />
  ))

  return (
    <div style={{
      marginBottom: "2rem",
      maxWidth: '1350px',
      margin: '0px auto',
      padding: '0 1rem',
    }}>
     
      <Carousel
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}