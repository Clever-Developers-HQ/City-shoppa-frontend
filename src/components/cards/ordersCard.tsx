import React, {useEffect, useState} from 'react'
import {getOrderAction} from "@/redux/Features/order/getOrderSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { userAuthenticateToken } from '@/components/Utils/TokenAuthentication';
// import { formatMoney, formatPhoneNumber } from "../Utils/utilFuncs";
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
    const [isUpdated, setIsUpdated] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    const fetchOrderDetails = async () => {
      const details = await Promise.all(
        orders?.map(async (order: any) => {
          const res = await dispatch(getOrderAction({ id: order._id, token: user?.token }));
          return res.payload?.order;
        })
      );
      setLoadingUpdate(false)
      setLoaded(true)
      setOrderDetails(details);
    };

    useEffect(() => {
        setUser(userAuthenticateToken());
        if (user) {
          fetchOrderDetails();
        }
      }, [orders]);

      if (isUpdated) {
        setLoaded(false)
        fetchOrderDetails()
        setIsUpdated(false)
      }



    return (

        <>
        {
          !loaded && <Loading/>
        }

            <div>
               {
                orderDetails?.map((orderDetail, index) => (
                    user?.role === 'admin' && ( 
                    <UserOrderCard
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
                      setIsUpdated= {setIsUpdated}
                  />
                    )
                ))
            }
               </div>

           
        </>

    )
}

export default OrdersCard
