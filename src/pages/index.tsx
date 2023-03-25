import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import NavBar from '@/Components/navBar/NavBar'
// import Hero from '@/Components/HeroSections/Hero'
// import Categories from '@/Components/Categories/Categories'
// import ProductsCarousel from '@/Components/Products/ProductsCarousel'
// import HomeAndDecor from '@/Components/Products/Home/HomeAndDecor'
// import Mart from '@/Components/Products/Mart/Mart'
// import HealthAndFitness from '@/Components/Products/HealthAndFitness/HealthAndFitness'
// import Brands from '@/Components/BrandCaroousel/Brands'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>City Shoppa</title>
        <meta name="description" content="City Shoppa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      {/* <NavBar />
        <Hero />
        <Categories /> */}
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
        {/* <ProductsCarousel /> */}
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
        {/* <HomeAndDecor/> */}
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
        {/* <Mart/> */}
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
        {/* <HealthAndFitness />
        <Brands/> */}
      </main>
    </>
  )
}
