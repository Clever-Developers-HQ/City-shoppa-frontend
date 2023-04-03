import React, {useEffect, useState} from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import { Animated } from 'react-animated-css'
import OrdersCard from "@/components/cards/ordersCard";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "@/components/loader/loadingScreen";
import Loader from "@/components/loader/Loader";
import { getOrdersAction } from "@/redux/Features/order/getOrdersSlice";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";

function UnCompletedOrders() {

  const dispatch = useDispatch()
  const [isUpdated, setIsUpdated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState("");

  const { loading, orders, message, error } = useSelector(
    (store) => store.getOrders
  );


  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setLoaded(true);
      dispatch(getOrdersAction(token));
    }
  }, [token]);

  const unCompletedOrders = orders?.filter(
    (order) => order.state === "Pending"
  );


  return (
    <div>
      <AdminLayout title="Uncompleted Orders">

        {
          loading ? <Loader/> : (
            <> 
      <OrdersCard orders={unCompletedOrders}/>

            </>
          )
        }
</AdminLayout>
    </div>
  )
}

export default UnCompletedOrders
