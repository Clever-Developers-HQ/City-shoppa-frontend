import NavBar from "@/Components/NavBar/NavBar";
import DiscountedProducts from "@/Components/ProductDetails/DiscountedProducts";
import ImageSlider from "@/Components/ProductDetails/ImageSlider";
import Quantity from "@/Components/ProductDetails/Quantity";
import SellerModal from "@/Components/ProductDetails/SellerModal";
import React, { useState } from "react";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

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
    </>
  );
};

export default ProductDetails;
