import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { beauty, responsive } from "./data";

export default function App() {
  const product = beauty.map((item) => (
    <Product
      key={item.id}
      imageurl={item.imageurl}
      name={item.name}
      price={item.price}
      Discountprice={item.Discountprice}
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
        responsive={responsive}
      >
        {product}
      </Carousel>
    </div>
  );
}