import React from 'react'
import { formatMoney, formatPhoneNumber } from '../Utils/utilFuncs'

interface OrderProps {
    orderDetail: any
    orders: any
    index: any
}

function UserOrderCard({orderDetail, orders, index }: OrderProps) {
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

                        <div className="my-5 flex justify-between ">
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
                                    <h3 className='text-xl font-bold'>{}</h3>
                                    <p>Model : {orders.model}</p>
                                    <p className="md:mt-20">Quantity: {orders[index].quantity}</p>
                                </div>
                            </div>

                            <div>
                                <p className="md:ml-10 font-bold">Discounted Offer</p>
                                <p className="md:ml-10 mb-3">Product/Service</p>
                                <p className="font-bold text-[#5582F6]">Discount: $ {orders[index].discount}</p>

                                <div className='md:flex justify-center items-center mt-3'>
                                    <img
                                        src={orderDetail?.discounted_productId?.mainImage}
                                        width="50"
                                        height="50"
                                        className="rounded h-10 w-10"
                                    />

                                    {
                                        orders[index].state == "Pending" ? (
                                            <a
                                            href={`tel:${orderDetail?.merchant_id?.phone}`}
                                            >
                                            <div 
                                            className="px-2 cursor-pointer py-1 bg-orange hover:bg-primary rounded text-white font-bold"> 
                                                Complete order to activate offer coupon
                                            </div>
                                            </a>
                                        ) : (
                                            <div className="md:pl-3">
                                            <p>Supplier: KAYODE INC</p>
                                            <span>Address:</span> <span className='text-[#FC8347]'>{orderDetail?.merchant_id?.address}</span>
                                        </div>
                                        )
                                    }


                                </div>

                                <div className="my-5">
                                    <p className="font-bold md:text-xl text-[#5582F6]">Coupon: {orders[index].couponIds}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:flex justify-between items-center">
                            
                            <div>
                                <p>
                                    <span> Merchant: </span>
                                    <span className=""> {orderDetail?.merchant_id?.business_name}</span>
                                </p>

                                <p>
                                    <span> Address: </span>
                                    <span className=""> {orderDetail?.merchant_id?.address}</span>
                                </p>

                                <p>
                                    <span> Email: </span>
                                    <span className=""> {orderDetail?.merchant_id?.email}</span>
                                </p>

                                <p>
                                    <span> Phone: </span>
                                    <span className=""> {formatPhoneNumber(orderDetail?.merchant_id?.phone)}</span>
                                </p>
                                <p>
                                    <span> Website: </span>
                                    <a
                                        href={`https://${orderDetail?.merchant_id?.website}`} target="_blank"
                                    >
                                        <span className="text-[#5582F6]">{orderDetail?.merchant_id?.website}</span>
                                    </a>
                                </p>
                            </div>
                            
                            {
                                orders[index].state == "Pending" ? (
                                    <a
                                    href={`https://${orderDetail?.merchant_id?.website}`} target="_blank"
                                    >
                                    <button
                                        type="button"
                                        className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-pointer"
                                    >
                                        Contact Merchant
                                    </button>
                                    </a>
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

export default UserOrderCard
