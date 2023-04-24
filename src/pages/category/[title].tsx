import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import ProductCard from "@/components/products/productCard"
import {useEffect, useState} from 'react'
import {getProductsCategoryAction} from "@/redux/Features/product/getProductsCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader"

function ProductCategory() {
  const router = useRouter();
  const { title } = router.query;

  const dispatch = useDispatch<AppDispatch>()
  const {loading, products} = useSelector((state: RootState) => state.getProductsCategory)
  
  useEffect(() => {
    if (router.query && typeof router.query.category_id === "string" ) {
    dispatch(getProductsCategoryAction(router.query.category_id));
    }

  }, [dispatch, router.query])

  console.log(products, "THE PRODUCTS")

  return (
    <div>
      <>
        <NavBar />
        <div
        className="mr-5 md:mx-20"
          style={{
            marginBottom: "2rem",
            // margin: "0px auto",
            // padding: "0 1rem",
          }}>
          <div className="md:flex justify-between items-center my-10">
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
          {
              loading && <Loader/>
            }

          <div className='grid m-5 flex-wrap justify-center items-center w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-0'>
{
  products?.map((product: any) => (
        <div key={product._id} className="flex justify-center">
            <ProductCard 
                id={product._id}
                name={product.product_name}
                price={product.product_price}
                imageUrl={product.mainImage}
                description={product.description}
                brand={product.brand}
                category_id={product.category}
                merchant_id={product.merchant}
                images={product.images}
                discountPrice={product.discount}
            />
        </div>
        
    ))
}

</div>
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
