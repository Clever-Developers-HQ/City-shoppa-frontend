import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import { mart, responsive } from "@/components/products/Data";
import EachProducts from "@/components/eachProductCategories/EachProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import NextLink from 'next/link';




function ProductCategory() {
  const router = useRouter();
  const { title } = router.query;

  console.log(router.query, "THE ROUTER QUERY")


  const product = mart.map((item) => (
    <EachProducts
      key={item.id}
      imageurl={item.imageurl}
      name={item.name}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div>
      <>
        <NavBar />
        <div
          style={{
            marginBottom: "2rem",
            maxWidth: "1350px",
            margin: "0px auto",
            padding: "0 1rem",
          }}>
          <div className="md:flex justify-between items-center my-10" style={{}}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 500,
                color: "#000",
              }}>
              {title}
            </h1>
            <NextLink href="/categories">
            <Button
              variant="outlined"
              size="small"
              style={{
                color: "#fff",
                borderColor: "#f85606",
                margin: "0.5rem 0",
                fontSize: "1rem",
                fontWeight: 900,
                fontFamily: "Poppins",
                textTransform: "capitalize",
                backgroundColor: "#000"
              }}>
              Back To Categories
            </Button>
            </NextLink>
          </div>

          <Carousel
            showDots={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            responsive={responsive}>
            {product}
          </Carousel>

          <Carousel
            showDots={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            responsive={responsive}>
            {product}
          </Carousel>


          <Carousel
            showDots={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            responsive={responsive}>
            {product}
          </Carousel>
          <Stack
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              margin: "2rem 0",
            }}>
            <Pagination count={10} color="standard" />
          </Stack>
        </div>
        <Footer />
      </>
    </div>
  );
}

export default ProductCategory;
