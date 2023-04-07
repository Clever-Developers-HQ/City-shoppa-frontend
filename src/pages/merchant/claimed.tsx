import React from 'react'
import MerchantLayout from '@/components/layouts/MerchantLayout'



function  Claimed() {

    const coupons = [
        {
            id: 1,
            name: "Sai Tech",
            model: "x56",
            code: 5678,
            isActivated: false,
        },
        {
            id: 2,
            name: "Sai Tech",
            model: "x56",
            code: 5678,
            isActivated: true,
        },
        {
            id: 3,
            name: "Sai Tech",
            model: "x56",
            code: 5678,
            isActivated: false,
        },
    ]

  return (
    <div>
        <MerchantLayout title="Claimed Coupons">
           {
            coupons.map((coupon) => (
                <section
                key={coupon.id}
                className="py-12 mb-5 flex justify-between items-center h-[200px] w-fulln bg-[#E9EBF2] rounded md:p-5 p-2"
            >
                <div
                className= "flex justify-between items-center"
                >
                    <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    width = '100px'
                    height = "100px"
                    className="object-fit"
                    />

                    <div
                    className="md:ml-8 ml-3"
                    >
                        <h3
                        className= "md:text-2xl text-xl text-bold"
                        >Sai Tech</h3>
                        <p
                        className="text-gray-500"
                        >Model: x56</p>
                        <h3
                        className= "text-blue-500 md:text-xl font-bold "
                        >Coupon code: 5678</h3>
                    </div>

                </div>


                        <button
                        className="bg-[##454D4A] p-2 text-white rounded cursor-none"
                       >
                          Claimed
                       </button>
            </section>
            ))
           }
          
        </MerchantLayout>
    </div>
  )
}

export default Claimed