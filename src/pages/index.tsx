import Head from 'next/head'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/navigation/NavBar'
import Hero from '@/components/heroSections/Hero'
import Categories from '@/components/categories/Categories'
import ProductsCarousel from '@/components/products/productsCarousel'
import HomeAndDecor from '@/components/products/home/HomeAndDecor'
import Mart from '@/components/products/mart/Mart'
import HealthAndFitness from '@/components/products/healthAndFitness/HealthAndFitness'
import Brands from '@/components/brandCarousel/Brands'
import ProductsList from '@/components/products/productLists/ProductsList'
import AdsCards from '@/components/ads/AdsCards'
import Footer from '@/components/footer/Footer'
import LoadingScreen from '@/components/loader/loadingScreen';
import { getProductsAction } from '@/redux/Features/product/getProductsSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";


//IMPORTING API CALLS AND DATA NEEDED ON THE FRONTEND. 


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(true)
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState <any>([])
  const token= ""
  setTimeout(() => {
    setIsLoaded(false)
  }, 5000)


  useEffect(()=> {
    const getProducts = async () => {
      const resultAction = await dispatch(
        getProductsAction(token)
      );
      const result = resultAction.payload;
      setProducts(result)
    }
    getProducts()
  }, [])

  return (
    <>
      <Head>
        <title>City Shoppa</title>
        <meta name="description" content="City Shoppa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        isLoaded ? <LoadingScreen /> : (
          <div>
                  <main >
      <NavBar />
        <Hero />
        <Categories />
        <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "0rem 2rem",
            padding: "0 2rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Products
        </h1>
        <ProductsCarousel />
        <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "2rem 2rem",
            padding: "0 1rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Products
        </h1>
        <HomeAndDecor/>
        <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "1rem 2rem",
            padding: "0 2rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Services
        </h1>
        <Mart/>
        <h1
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#000",
          margin: "1rem 2rem",
            padding: "0 2rem",
            backgroundImage: "url(/assets/bckgrd.png)",
            backgroundRepeat: "no-repeat",
        }}
      >
      Services
        </h1>
        <HealthAndFitness />
        <Brands />
        <ProductsList />
        <AdsCards/>
        <Footer/>
      </main>
          </div>
        )
      }

    </>
  )
}
