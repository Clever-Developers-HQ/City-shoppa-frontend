import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Data";
import ProductCard from './productCard'

export default function ProductCarousel({products}: any ) {
 const theProducts = products?.map((item: any) => (
    <ProductCard
      key={item._id}
      imageUrl={item.mainImage}
      name={item.product_name}
      price={item.product_price}
      discountPrice={item.Discountprice}
      description={item.description}
      images= {item.images}
      id={item._id}
      category_id = {item.category_id}
      merchant_id =  {item.merchant_id}
      brand = {item.brand}
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
        {theProducts}
      </Carousel>
    </div>
  );
}
