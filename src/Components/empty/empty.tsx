import React from 'react'
import Image from 'next/image'
import EmptyImage from "@/assets/images/no_data.png"

function Empty({text}: any) {
  return (
    <div className="flex justify-center items-center mt-10">
    <div className="flex flex-col items-center">
      <Image
      className="w-[300px]"
       src={EmptyImage} alt="No Data Available CityShoppa" />
      <p className="text-orange font-bold text-2xl mt-4">
       {text}
      </p>
    </div>
  </div>
  )
}

export default Empty
