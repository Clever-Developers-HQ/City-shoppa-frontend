import NavBar from "@/components/navigation/NavBar";
import DiscountedProducts from "@/components/ProductDetails/DiscountedProducts";
import ImageSlider from "@/components/ProductDetails/ImageSlider";
import SellerModal from "@/components/ProductDetails/SellerModal";
import Footer from "@/components/footer/Footer"
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantAction } from '../../redux/Features/merchant/getMerchantSlice';
import { getProductAction } from '../../redux/Features/product/getProductSlice';
import { RootState } from "@/redux/store";
import { formatMoney } from "@/components/Utils/utilFuncs";
import Quantity from './../../components/ProductDetails/Quantity';
import LoginModal from "@/components/modals/loginModal";



const ProductDetails = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [discounted_productId, setDiscounted_productId] = useState("")
  const [ischeckOut, setIsCheckout] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  console.log(quantity, "THE QUANTITY")

  const router = useRouter();
  // const {merchant, id} = router.query
  console.log(router.query, "THE ME  RCHANT AND PRODUCT ID")

  const { product, loading, rating, discounted } = useSelector(
    (store: RootState) => store.getProduct
  );

  const { merchant } = useSelector(
    (store: RootState) => store.getMerchant
  );

  console.log(product, loading, rating, discounted, "IN STATE PRODUCT STATE")

  useLayoutEffect(() => {
    window.scrollTo(0, 0); 

    if (router.query && typeof router.query.merchant === "string" && typeof router.query.id === "string") {
      dispatch(getMerchantAction(router.query.merchant) as any)
      dispatch(getProductAction(router.query.id) as any)
    }
  }, [dispatch, router.query])


  return (
    <>
      <NavBar />
      {showLoginModal && <LoginModal open={showLoginModal} setOpen={setShowLoginModal}/> }

      <div className="w-full md:py-20 sm: px-6 py-4">
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ImageSlider
              mainImage={product?.mainImage}
              image1={product?.imageSide}
              image2={product?.imageBack}
              image3={product?.imageTop}
            />
          </div>
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <h1 className="text-[20px] font-semibold">
                  {product?.product_name}
                </h1>
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-0.8rem" }}
                >
                  Supplier: {merchant?.business_name}
                </p>
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-0.6rem" }}
                >
                  Address:
                  <span className="text-[12px] text-[#e77600] ml-1">
                    {merchant?.address}
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
                    $ {formatMoney(product?.product_price)}
                  </span>
                </h1>
              </div>
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>


            <div onClick={() => setIsCheckout(true)} >
              <SellerModal
              merchant={merchant}
              quantity={quantity}
              discounted_productId={discounted_productId}
              isCheckout = {ischeckOut}
              setIsCheckout = {setIsCheckout}
              setShowLoginModal = { setShowLoginModal }
            />
        </div>

            <div className="flex flex-col gap-[10px] mt-4">
              <h1 className="text-1xl">Description:</h1>
              <p className="text-sm text-gray-500">
                {product?.description}
              </p>
            </div>

          </div>
        </div>
      </div>

      <div
      >
        <DiscountedProducts
          discounted={discounted}
          discounted_productId={discounted_productId}
          
        />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
