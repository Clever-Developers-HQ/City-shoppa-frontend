import Head from "next/head";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/navigation/NavBar";
import Hero from "@/components/heroSections/Hero";
import Categories from "@/components/categories/Categories";
import ProductsCarousel from "@/components/products/productsCarousel";
import AllProductsCarousel from "@/components/products/productCarousel";
import ProductsList from "@/components/products/productLists/ProductsList";
import AdsCards from "@/components/ads/AdsCards";
import Footer from "@/components/footer/Footer";
import LoadingScreen from "@/components/loader/loadingScreen";
import { getProductsAction } from "@/redux/Features/product/getProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import HomeProductsCategory from "@/components/home/homeProducts";
import { getCategoriesAction } from "@/redux/Features/category/getCategoriesSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import router, { useRouter } from 'next/router'


//IMPORTING API CALLS AND DATA NEEDED ON THE FRONTEND.

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState<any>([]);
  const {loading, categories} = useSelector((state: RootState) => state.getCategories)

  const token = "";

  useEffect(() => {
    const getProducts = async () => {
      const resultAction = await dispatch(getProductsAction(token));
      await dispatch(getCategoriesAction("token"));
      const result = resultAction.payload?.product;
      setProducts(result);
      setIsLoaded(false);
    };
    getProducts();
  }, [dispatch]);

  const filteredProducts = (id: string) => {
    const filteredProducts = products?.filter(
      (product: any) => product.category_id === id
    );
    return filteredProducts;
  }

  const clickHandlerProductCategory = (category_name: string, category_id: string) => {
    router.push({
      pathname: `/category/${category_name}`,
      query: { category_id: category_id }
    })
  }

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
              category="Trending Products"
              clickHandler={() => console.log("clicked")}
            />
            
            <ProductsCarousel
              products={filteredProducts("641052477e87c1f95843282a")}
            />

            {
              categories?.map((category: any) => (
                <>
                <HomeProductsCategory
              category={category.name}
              clickHandler={() => clickHandlerProductCategory(category.name, category._id)}
            />
            <AllProductsCarousel
            products={filteredProducts(category._id)}
            />
                </>
              ))
            }
            
            <ProductsList products={products} />

            <AdsCards />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
