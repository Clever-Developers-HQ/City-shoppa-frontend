import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { mart, responsive } from "@/components/products/Data";
import EachProducts from "@/components/eachProductCategories/EachProducts";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";

export default function index() {
  const product = mart.map((item) => (
    <EachProducts
      key={item.id}
      imageurl={item.imageurl}
      name={item.name}
    price={item.price}
      description={item.description}
    />
  ))
    
    const color = {
        color: '#f85606',
    }

  return (
      <>
          <NavBar/>
           <div style={{
      marginBottom: "2rem",
      maxWidth: '1350px',
      margin: '0px auto',
      padding: '0 1rem',
      }}>
            <div style={{ }}>
    <h1
      style={{
        fontSize: "2rem",
        fontWeight: 500,
                          color: "#000",
                            marginTop: "2rem",
      }}
    >
     Food
              </h1>
              <Button variant="outlined" size="small" onClick={() => window.location.href = "/categories"} style={{
                  color: '#f85606',
                  borderColor: '#f85606',
                  margin: '0.5rem 0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: 'Poppins',
                  textTransform: 'capitalize',
                    
              }}>
      Back To Categories
    </Button>
  </div>
      {/* <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "2rem 1rem",
            padding: "0 1rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Products
        </h1> */}
      <Carousel
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        responsive={responsive}>
        {product}
          </Carousel>
          {/* <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "2rem 1rem",
            padding: "0 1rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Products
        </h1> */}
          <Carousel
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        responsive={responsive}>
        {product}
          </Carousel>
          {/* <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "2rem 1rem",
            padding: "0 1rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Products
        </h1> */}
          <Carousel
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        responsive={responsive}>
        {product}
          </Carousel>
          <Stack spacing={2} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: '2rem 0',
          }}>
      <Pagination count={10} color="standard" />
    </Stack>
          </div>
          <Footer/>
      </>
  );
}