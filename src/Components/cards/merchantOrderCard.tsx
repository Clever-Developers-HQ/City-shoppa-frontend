import React from 'react'
import { formatMoney, formatPhoneNumber } from '../Utils/utilFuncs'
import {updateUserAction} from '@/redux/Features/user/updateUserSlice';
import { showWarning, showError, showSuccess } from "../Utils/AlertMsg";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";

interface OrderProps {
    orderDetail: any
    orders: any
    index: any
}

function MerchantOrderCard({orderDetail, orders, index }: OrderProps) {

    const activateCouponHandler = () => {
        
    }

  return (
    <div>
                          <div   className="bg-white p-5 mb-5">
                        {/* ORDER AND PRICE CONTAINER  */}
                        <div className='flex justify-between flex-wrap items-center border-b-2 border-b-black'>
                            <div>
                                <p className="font-bold">Order #{orders[index]._id}</p>
                                <p className="text-[#282222]">Placed on {orders[index].createdAt.slice(0, 10)}</p>
                            </div>

                            <div>
                                <span className="text-[#282222]">Total: </span>
                                <span className="font-bold">${formatMoney(orders[index]?.subtotal)}</span>
                            </div>
                        </div>

                        <div className="my-5 md:flex justify-between ">
                            <div className="md:flex ">
                                <div>
                                    <img
                                        src={orderDetail?.products?.mainImage}
                                        width="220"
                                        height="220"
                                        className="rounded md:h-40 md:w-40 w-20 h-20"
                                    />
                                </div>

                                <div className="md:ml-3">
                                    <h3 className='text-xl font-bold'></h3>
                                    <p>Product Name : {orderDetail?.products?.product_name}</p>
                                    <p className="md:mt-20">Quantity: {orders[index].quantity}</p>
                                </div>
                            </div>

                            <div className="justify-between flex-wrap items-center">
                            
                            <div>
                                <p>
                                    <span> Customer Name: </span>
                                    <span className=""> {orderDetail?.userId?.name}</span>
                                </p>

                                <p>
                                    <span> Address: </span>
                                    <span className=""> {orderDetail?.userId?.address}</span>
                                </p>

                                <p>
                                    <span> Email: </span>
                                    <span className=""> {orderDetail?.userId?.email}</span>
                                </p>

                                <p>
                                    <span> Phone: </span>
                                    <span className=""> {formatPhoneNumber(orderDetail?.userId?.phone)}</span>
                                </p>

                                <p className="py-5 font-bold text-primary">
                                    <span>Coupon Code: </span>
                                    <span className=""> {formatPhoneNumber(orders[index].couponIds)}</span>
                                </p>
                            </div>

                        </div>

                        </div>

                         <div className="flex-end flex items-center justify-end"> 
                         {
                                orders[index].state == "Pending" ? (
                                    <button
                                        type="button"
                                        className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-[#838080] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-not-allowed"
                                    >
                                        Pending
                                    </button>
                                ) : (

                                    <button
                                        type="button"
                                        className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-[#F85606] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-not-allowed"
                                    >
                                        Completed
                                    </button>
                                )
                            }
                            </div>                           
                     

                    </div>
    </div>
  )
}

export default MerchantOrderCard
