import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import NavBar from '@/Components/NavBar/NavBar'
// import Hero from '@/Components/HeroSections/Hero'
// import Categories from '@/Components/Categories/Categories'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="City Shoppa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        {/* <NavBar />
        <Hero />
        <Categories/> */}
      </main>
    </>
  )
}
