import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { responsive } from "./data";
import ProductCard from './productCard'

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 6,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
