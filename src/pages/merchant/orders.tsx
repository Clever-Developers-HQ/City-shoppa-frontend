import React, {useEffect, useState} from 'react'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import OrdersCard from '@/components/cards/ordersCard'
import NextLink from 'next/link'
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

function MerchantOrders() {
  const [user, setUser] = useState<any>()
  const dispatch = useDispatch<AppDispatch>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const user = userAuthenticateToken()
    setUser(user)
    if (user) {
      if(user.role == "merchant"){
        dispatch(getUserAction({id:user.id, token: user.token}))
        .then(unwrapResult)
        .then((res:any) => {
          if(res.user){
            let userObject = JSON.parse(localStorage.getItem("user") as any)
            if (userObject) {
              userObject.merchant_application = res.user.merchant_application
              localStorage.setItem("user", JSON.stringify(userObject));
            setLoaded(true)
            }
          }
        })
      }
      setLoaded(true)
    }

  },[dispatch])


  const { loading, success, message, orders, merchantOrders } = useSelector(
    (store: RootState) => store.getUser
  );

  return (
    <div>
      {
      !loaded && ( <LoadingScreen />) 
      }


     <MerchantLayout title="Orders">
          {
        user?.merchant_application == "pending" && (<PendingAccountScreen/>)
      }

      {
        user?.merchant_application == "declined" && (<DeclinedAccount/>)
      }
            {
        user?.merchant_application == "approved" && (<OrdersCard orders={merchantOrders}/>)
      }
        </MerchantLayout>
    </div>
  )
}

export default MerchantOrders