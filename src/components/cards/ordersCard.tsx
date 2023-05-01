import React, {useEffect, useState} from 'react'
import {getOrderAction} from "@/redux/Features/order/getOrderSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { userAuthenticateToken } from '@/components/Utils/TokenAuthentication';
import { formatMoney, formatPhoneNumber } from "@/components/Utils/utilFuncs";
import { unwrapResult } from '@reduxjs/toolkit';
import MerchantOrderCard from './merchantOrderCard';
import UserOrderCard from './userOrderCard'
import Loading from '../loader/Loader';


interface OrderProps {
    orders: any
}

function OrdersCard({ orders }: OrderProps) {
    const [orderDetails, setOrderDetails] = useState<any[]>([]);
    const [user, setUser] = useState<any>()
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(userAuthenticateToken());
      
        if (user) {
          const fetchOrderDetails = async () => {
            const details = await Promise.all(
              orders?.map(async (order: any) => {
                const res = await dispatch(getOrderAction({ id: order._id, token: user?.token }));
                return res.payload?.order;
              })
            );
            console.log(details, "THE DETAILS")
            setLoaded(true)
            setOrderDetails(details);
          };
      
          fetchOrderDetails();
        }
      }, [orders]);

    return (

        <>
        {
          !loaded && <Loading/>
        }

            <div>
               {
                orderDetails?.map((orderDetail, index) => (
                    user?.role === 'admin' && ( 
                    <MerchantOrderCard
                        key={orders[index]._id}
                        orderDetail={orderDetail}
                        orders={orders}
                        index={index}
                    />
                    )
                    ||
                    user?.role === 'user' && (
                      <UserOrderCard
                      key={orders[index]._id}
                      orderDetail={orderDetail}
                      orders={orders}
                      index={index}
                  />
                    )

                    ||

                    user?.role === 'merchant' && (
                      <MerchantOrderCard
                      key={orders[index]._id}
                      orderDetail={orderDetail}
                      orders={orders}
                      index={index}
                  />
                    )
                ))
            }
               </div>

           
        </>

    )
}

export default OrdersCard
