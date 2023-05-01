
import Image from 'next/image'
import {useState} from 'react'
import { formatMoney, formatPhoneNumber } from "@/components/Utils/utilFuncs";


interface DiscountProductDTO {
  discounted: any
  discounted_productId: string
  setDiscounted_productId: any
  discountedmerchant_id : string
  setDiscountedmerchant_id : any
}

export default function DiscountedProducts({discounted, discountedmerchant_id, setDiscountedmerchant_id, setDiscounted_productId}: DiscountProductDTO) {

  const [iseSelected, setIsSelected] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<any>(null);

  const selctProductHandler = (id: string, merchant_id: string) => {
    setIsSelected(true)
    setDiscounted_productId(id)
    setDiscountedmerchant_id (merchant_id)

    setSelectedProductId(id);
    console.log("Selected Product")
    
  }


  return (
    <div className="bg-white">
      <div className="py-8 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <div
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-700"
            style={{
              textDecoration: "underline",
            }}
          >
            <h2 className="text-[20px] font-bold tracking-tight text-orange">
              Discounted Products And Services Coupon
            </h2>
          </div>
        </div>

        <div className="mt-8 relative">
          <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
            <div className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-6 lg:gap-x-8" >
              {discounted?.map((product : any) => (
                <div
                  key={product._id}
                  className={`w-64 cursor-pointer bg-black flex-col text-center lg:w-auto  border-2 ${
                    selectedProductId == product?._id ? 'border-orange' : ''
                  }`}
                  >
                  <div 
                  onClick={() => selctProductHandler(product?._id, product.merchant_id)}
                  className="group relative bg-[#d7d7d7]">
                    <div className="w-full  bg-gray-100 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                      <img
                        src={product.mainImage}
                        alt={product.product_name}
                        className="w-full h-[150px] object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.product_name}
                        </a>
                      </h3>
                      <p className="mt-1 text-gray-900">$ {formatMoney(product.product_price)}</p>
                    </div>
                    <div className="absolute top-0 left-0 z-10 p-1 bg-[#e77600] text-white text-[12px]">
                      {product.discount}% OFF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
