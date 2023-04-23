import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { beauty, responsive } from "./Data";

export default function App({products}: any ) {

 const theProducts = products?.map((item: any) => (
    <Product
      key={item._id}
      imageurl={item.mainImage}
      name={item.product_name}
      price={item.product_price}
      Discountprice={item.Discountprice}
      description={item.description}
      images= {item.images}
      id={item._id}
      categoryId = {item.category_id}
      merchantId =  {item.merchant_id}
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