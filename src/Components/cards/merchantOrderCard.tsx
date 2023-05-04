import React, { useState, useEffect } from 'react'
import { formatMoney, formatPhoneNumber } from '../Utils/utilFuncs'
import { updateUserAction } from '@/redux/Features/user/updateUserSlice';
import { showWarning, showError, showSuccess } from "../Utils/AlertMsg";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { completeOrderAction } from '../../redux/Features/order/completeOrderSlice';
import { updateOrderAction } from '../../redux/Features/order/updateOrderSlice';
import { confirm } from './../alert/confirm';
import { getOrdersAction } from '../../redux/Features/order/getOrdersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


interface OrderProps {
    orderDetail: any
    orders: any
    index: any
    setIsUpdated: any
}

function MerchantOrderCard({ orderDetail, orders, index, setIsUpdated }: OrderProps) {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const token = localStorage.getItem('token') || null

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
            <div className="bg-white p-5 mb-5">
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

                            {/* <p>
                                    <span> Address: </span>
                                    <span className=""> {orderDetail?.userId?.address}</span>
                                </p> */}

                            <p
                                className="text-orange"
                            >
                                <span> Email: </span>
                                <a
                                    href={`mailto:${orderDetail?.userId?.email}`}
                                >
                                    <span className=""> {orderDetail?.userId?.email}</span>
                                </a>

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
                        orders[index].state == "Pending" && (
                            <a
                                href={`tel:${orderDetail?.userId?.phone}`}
                            >
                                <button
                                    type="button"
                                    className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-primary"
                                >
                                    Contact Buyer
                                </button>
                            </a>
                        )
                    }

                    {
                        orders[index].state == "Activated" && (
                            <button
                                type="button"
                                className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-primary"
                            >
                                Completed
                            </button>
                        )
                    }

                    {
                        orders[index].state == "Decline" && (
                            <button
                                type="button"
                                className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-primary"
                            >
                                Declined
                            </button>
                        )
                    }



                    {
                        orders[index].state == "Pending" &&
                        (
                            <button
                                onClick={() => activateCouponHandler(orders[index]._id)}
                                type="button"
                                className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-pointer"
                            >
                                Activate Coupon
                            </button>
                        )
                    }

                    {
                        orders[index].state == "Pending" &&
                        (
                            <button
                                onClick={() => declineCouponHandler(orders[index]._id)}
                                type="button"
                                className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-pointer"
                            >
                                Decline Order
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MerchantOrderCard
