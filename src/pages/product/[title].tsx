import NavBar from "@/components/navigation/NavBar";
import DiscountedProducts from "@/components/ProductDetails/DiscountedProducts";
import ImageSlider from "@/components/ProductDetails/ImageSlider";
import Quantity from "@/components/ProductDetails/Quantity";
import SellerModal from "@/components/ProductDetails/SellerModal";
import Footer from "@/components/footer/Footer"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantAction } from '../../redux/Features/merchant/getMerchantSlice';
import {getProductAction} from '../../redux/Features/product/getProductSlice';
import { RootState } from "@/redux/store";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);


  //GET THE ID FROM ROUTER QUERY 
  const token = "NO TOKEN"

  const router = useRouter();

  const {merchant, id}:any = router.query




  const {product } = useSelector(
    (store: RootState) => store.getProduct
  );
  console.log(product, "IN STATE")

  useEffect(() => {

    // const {merchant, id} = router.query

    if (id && merchant) {
      // dispatch(getMerchantAction({id : merchant, token}))
      // dispatch(getProductAction(id))
    }
  

  }, [id, merchant, dispatch])


  return (
    <>
      <NavBar />
      <div className="w-full md:py-20 sm: px-6 py-4">
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ImageSlider />
          </div>
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <h1 className="text-[20px] font-semibold">
                  LG 79 Inch 4K UHD Smart LED TV <br />
                  (79UH953),
                </h1>
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-0.8rem" }}
                >
                  Supplier: KAYODE INC{" "}
                </p>
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-0.6rem" }}
                >
                  Address:
                  <span className="text-[12px] text-[#e77600] ml-1">
                    14 Brent street, Ontario Canada.
                  </span>
                </p>
                <div className="border-b-2 border-gray-400 w-[420px] mt-2"></div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-[10px] mt-4">
                <h1 className="text-1xl">
                  Price:
                  <span className="text-[#e77600] font-semibold ml-1">
                    $1,000.00
                  </span>
                </h1>
              </div>
              <Quantity initialValue={1} />
            </div>
            <SellerModal />
           
          </div>
        </div>
      </div>
      <div>
              <DiscountedProducts/>
            </div>

            <Footer/>
    </>
  );
};

export default ProductDetails;
