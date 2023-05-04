import React, {useEffect, useState} from 'react'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import { getUserAction } from '@/redux/Features/user/getUserSlice';
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Empty from '@/components/empty/empty'
import { useRouter } from "next/router";
import { userAuthenticateToken } from '@/components/Utils/TokenAuthentication';
import LoadingScreen from '@/components/loader/loadingScreen';
import PendingAccountScreen from '@/components/empty/pending_account'
import DeclinedAccount from '@/components/empty/declined_account';
import { unwrapResult } from '@reduxjs/toolkit';
import { getOrderAction } from '@/redux/Features/order/getOrderSlice';


function  Coupons() {
    const [user, setUser] = useState<any>()
    const dispatch = useDispatch<AppDispatch>()
    const [loaded, setLoaded] = useState(false)
    const [orderDetails, setOrderDetails] = useState<any>()

    const router = useRouter();


    const { loading, success, message, orders, merchantOrders } = useSelector(
        (store: RootState) => store.getUser
      );

      const fetchOrderDetails = async (orders: any) => {
        const details = await Promise.all(
          orders?.map(async (order: any) => {
            const res = await dispatch(getOrderAction({ id: order._id, token: user?.token }));
            return res.payload?.order;
          })
        );
        setLoaded(true)
        setOrderDetails(details);
      };

      useEffect(() => {
        const user = userAuthenticateToken()
        setUser(user)
        if (user) {
          if (user.role == "merchant") {
            dispatch(getUserAction({ id: user.id, token: user.token }))
              .then(unwrapResult)
              .then((res: any) => {
                if (res.user) {
                  let userObject = JSON.parse(localStorage.getItem("user") as any)
                  if (userObject) {
                    userObject.merchant_application = res.user.merchant_application
                    localStorage.setItem("user", JSON.stringify(userObject));
                    setLoaded(true)
                  }
                }

                if (res.merchantOrders) {
                    fetchOrderDetails(res.merchantOrders)
                }
                setLoaded(true)
              })
          }
          setLoaded(true)
        } else {
            router.push('/');


        }
    
      }, [dispatch, router])


      console.log(orderDetails, "THE ORDER DETAILS")
        

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
        <MerchantLayout title="Customers Coupon">
           {
            orderDetails?.map((coupon : any, index: any) => (
                <section
                key={coupon[index]?._id}
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
                        >Coupon code: {coupon[index]?.couponIds}</h3>
                    </div>

                </div>

                {
                    coupon.isActivated ? (
                        <button
                        className="bg-gray-400 p-2 text-white rounded cursor-none"
                       >
                          Activated
                       </button>
                    ): (                <div
                        className="md:flex grid"
                        >
                            <button
                                type="button"
                                className="p-2 mb-2 md:mb-0 w-full text-white rounded bg-red-500 mr-5"
                            >
                               Decline
                            </button>
        
                            <button
                             className="bg-green-700 w-full p-2 text-white rounded "
                            >
                                Approve
                            </button>
        
                        </div>)
                }
            </section>
            ))
           }
          
        </MerchantLayout>
    </div>
  )
}

export default Coupons