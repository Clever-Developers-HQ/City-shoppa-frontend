import React, {use, useEffect, useState} from 'react'
import NavBar from '@/components/navigation/NavBar'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import {getProductsAction} from '../../redux/Features/product/getProductsSlice';
import { AppDispatch, RootState } from "@/redux/store";
import ProductCard from "@/components/products/productCard"
import Loader from "@/components/loader/Loader"

function AllProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


  const {loading, products} = useSelector((state: RootState) => state.getProducts)

    useEffect(() => {
        dispatch(getProductsAction(""));
    }, [dispatch])
  return (
    <div>
        
        <NavBar/>
        
        <p className="font-bold text-lg my-5 mx-10 md:mx-20" >
            ALL PRODUCTS
            </p>
        {
            loading && (<Loader/>)

        }
        <div className='grid m-5 md:m-20 justify-center items-center w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1'>

        {
            products?.map((product: any) => (
                <div key={product._id}>
                    <ProductCard 
                        id={product._id}
                        name={product.product_name}
                        price={product.product_price}
                        imageUrl={product.mainImage}
                        description={product.description}
                        brand={product.brand}
                        category_id={product.category}
                        merchant_id={product.merchant_id}
                        images={product.images}
                        discountPrice={product.discount}
                    />
                </div>
            ))
        }

</div>
        <Footer/>

    </div>
  )
}

export default AllProducts
