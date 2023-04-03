import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navigation/NavBar'
import {getCategoriesAction} from "@/redux/Features/category/getCategoriesSlice";
import {getProductsAction} from "@/redux/Features/product/getProductsSlice";
import { StarIcon } from '@heroicons/react/solid'
import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";

export default function Categories() {

  const dispatch = useDispatch<AppDispatch>();

  const {categories} = useSelector(
    (store: RootState) => store.getCategories
  );

  const {products, loading} = useSelector(
    (store: RootState) => store.getProducts
  );
  const token = "EMPTY"

  useEffect(() => {
    dispatch(getCategoriesAction())
    dispatch(getProductsAction(token))
  }, [])

  function countProductsByCategoryId(categoryId: string): number {
    let count = 0;
    for (const product of products) {
      if (product.category_id === categoryId) {
        count++;
      }
    }
    return count;
  }

  return (
    <>
      <NavBar/>
      <div className="bg-white">
  <div className="max-w-7xl mx-auto overflow-hidden mb-20 mt-20 sm:px-6 lg:px-8">
    <h2 className="sr-only">Products</h2>

        <div className="md:flex px-5 justify-between items-center py-4 border-b border-gray-200 mb-4">
          <div
            className=""
          >
            <h2 className="text-4xl font-bold text-gray-900">Categories</h2>
            <h6
              className=" mt-1 text-lg font-medium text-gray-500"
            >
             Click on a category to see more specific results
            </h6>
          </div>
      <button
        className="px-3 py-2 my-5 font-extrabold  hover:bg-black rounded-md text-white focus:outline-none bg-orange"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>

    {
      loading ? "LOADING..." : (
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((product:any) => (
          <div key={product._id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
            <div
              className="relative rounded-lg overflow-hidden bg-black aspect-w-1 aspect-h-1 cursor-pointer">
  
              <div className="">
                <div className="bg-white bg-opacity-75 px-5 py-2 rounded-lg hover:bg-orange hover:text-white ">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{countProductsByCategoryId(product._id)} Products</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )
    }

  </div>
      </div>
      <Footer/>
    </>
  )
}