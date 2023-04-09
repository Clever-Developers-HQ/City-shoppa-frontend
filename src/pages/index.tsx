import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/navigation/NavBar";
import Hero from "@/components/heroSections/Hero";
import Categories from "@/components/categories/Categories";
import ProductsCarousel from "@/components/products/productsCarousel";
import HomeAndDecor from "@/components/products/home/HomeAndDecor";
import Mart from "@/components/products/mart/Mart";
import HealthAndFitness from "@/components/products/healthAndFitness/HealthAndFitness";
import Brands from "@/components/brandCarousel/Brands";
import ProductsList from "@/components/products/productLists/ProductsList";
import AdsCards from "@/components/ads/AdsCards";
import Footer from "@/components/footer/Footer";
import LoadingScreen from "@/components/loader/loadingScreen";
import { getProductsAction } from "@/redux/Features/product/getProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import HomeProductsCategory from "@/components/home/homeProducts";

//IMPORTING API CALLS AND DATA NEEDED ON THE FRONTEND.

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState<any>([]);

  const token = "";
  // setTimeout(() => {
  //   setIsLoaded(false)
  // }, 5000)

  useEffect(() => {
    const getProducts = async () => {
      const resultAction = await dispatch(getProductsAction(token));
      const result = resultAction.payload.product;
      setProducts(result);
      setIsLoaded(false);
    };
    getProducts();
  }, []);

  const filteredProducts = (id: string) => {
    const filteredProducts = products.filter(
      (product: any) => product.category_id === id
    );
    return filteredProducts;
  };

  console.log(products, "THE PRODUCT");

  return (
    <>
      <Head>
        <title>City Shoppa</title>
        <meta name="description" content="City Shoppa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoaded ? (
        <LoadingScreen />
      ) : (
        <div>
          <main>
            <NavBar />
            <Hero />
            <Categories />

            <HomeProductsCategory
            category = "Bags & Accessories"
            clickHandler = {() => console.log("clicked")}
            />

            <ProductsCarousel
              products={filteredProducts("641052477e87c1f95843282a")}
            />

<HomeProductsCategory
            category = "Home Decor"
            clickHandler = {() => console.log("clicked")}
            />
            <Mart />

            <HomeProductsCategory
            category = "All Services"
            clickHandler = {() => console.log("clicked")}
            />


            <HealthAndFitness />
            <Brands />
            <ProductsList />
            <AdsCards />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
