import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { mart, responsive } from "../data";
import MartProducts from "./MartProducts";

export default function Mart() {
  const product = mart.map((item) => (
    <MartProducts
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