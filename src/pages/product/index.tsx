import React, {use, useEffect, useState} from 'react'
import NavBar from '@/components/navigation/NavBar'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import {getProductsAction} from '../../redux/Features/product/getProductsSlice';
import { AppDispatch } from "@/redux/store";
import ProductsCarousel from "@/components/products/productCarousel"
import ProductCard from "@/components/products/productCard"
import Loader from "@/components/loader/Loader"

function AllProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [Products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const resultAction = await dispatch(getProductsAction(""));
            const result = resultAction.payload.product;
            setProducts(result);
          };
          getProducts();
    }, [dispatch])
  return (
    <div>
        <NavBar/>
        
        <p className="font-bold text-lg my-5 mx-10 md:mx-20" >
            ALL PRODUCTS
            </p>
        {
            !Products && (<Loader/>)

        }
        <div className='grid m-5 md:m-20 justify-center items-center w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1'>

        {
            Products?.map((product: any) => (
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
