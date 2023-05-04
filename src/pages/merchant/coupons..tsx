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
import { updateOrderAction } from '@/redux/Features/order/updateOrderSlice';
import { showError, showSuccess, showWarning } from '@/components/Utils/AlertMsg';
import Swal from 'sweetalert2';
import { confirm } from '@/components/alert/confirm';
import { completeOrderAction } from '@/redux/Features/order/completeOrderSlice';


function  Coupons() {
    const [user, setUser] = useState<any>()
    const dispatch = useDispatch<AppDispatch>()
    const [loaded, setLoaded] = useState(false)
    const [orderDetails, setOrderDetails] = useState<any>()
    const [isUpdated, setIsUpdated] = useState(false)

    const router = useRouter();
    const token = user?.token;


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


      const activateCouponHandler = (id: any) => {
        confirm({
            title: "Are you sure you want to Activate this Coupon?",
            description: "This confirms that the Buyer had completed the purchase.",
            message: "Coupon Activated Successfully",
            onConfirm: () => {
                dispatch(completeOrderAction({ id, token, }))
                    .then((res: any) => {
                    }).then(() => {
                        dispatch(updateOrderAction({ id, token, state: "Activated" }))
                        router.reload();
                        setIsUpdated(true)
                    })
            },
        });
    }

    const declineCouponHandler = (id: any) => {
        Swal.fire({
            title: 'Proivde a reason for declining the Order.',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Decline',
            showLoaderOnConfirm: true,
            preConfirm: (reason: any) => {
                if (!reason) {
                    showWarning("Ensure you provide the reason for declining Coupon")
                    return
                }
                
                return dispatch(updateOrderAction({ id, token, state: "Decline", decline_reason: reason }))
                    .then(unwrapResult)
                    .then((res: any) => {
                        showSuccess("Coupon declined Successfully")
                        router.reload();
                    })
                    .catch(error => {
                        showError("Something Went Wrong. Please Try Again.")
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

  return (
    <div>
        <MerchantLayout title="Customers Coupon">

          {
            orderDetails?.length > 0 ? (
              <div>
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
                    src= {coupon?.products?.mainImage}
                    width = '100px'
                    height = "100px"
                    className="object-fit"
                    />

                    <div
                    className="md:ml-8 ml-3"
                    >
                        <h3
                        className= "md:text-2xl text-xl text-bold"
                        >{coupon?.products?.product_name}</h3>
                        <p
                        className="text-gray-500"
                        >Price: {coupon?.products?.product_price}</p>
                        <h3
                        className= "text-blue-500 md:text-xl font-bold "
                        >Coupon code: {coupon?.couponIds}</h3>
                    </div>

                </div>

                
                {
                    coupon?.state === "Activated" && (
                        <button
                        className="bg-primary p-2 text-white rounded cursor-none"
                       >
                          Activated
                       </button>
                    ) 
                }

{
                    coupon?.state === "Decline" && (
                        <button
                        className="bg-red-600 p-2 text-white rounded cursor-none"
                       >
                          Declined
                       </button>
                    ) 
                }

                {
                  coupon.state === "Pending" && (
                    <div
                    className="md:flex grid"
                    >
                        <button
                            onClick={() => declineCouponHandler(coupon._id)}
                            type="button"
                            className="p-2 mb-2 md:mb-0 w-full text-white rounded bg-red-500 mr-5"
                        >
                           Decline
                        </button>
    
                        <button
                            onClick={() => activateCouponHandler(coupon._id)}
                         className="bg-green-700 w-full p-2 text-white rounded "
                        >
                            Activate
                        </button>
    
                    </div>
                  )
                }
            </section>
            ))
           }
              </div>
            ) : (<Empty text="No Pending Coupon Waiting"/>)
          }
          
          
        </MerchantLayout>
    </div>
  )
}

export default Coupons