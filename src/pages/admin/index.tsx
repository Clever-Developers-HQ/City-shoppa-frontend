import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import OrdersCard from "@/components/cards/ordersCard";
import StatsCard from "@/components/cards/statsCard";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdRemoveShoppingCart } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { GiShoppingCart } from "react-icons/gi";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "@/redux/Features/order/getOrdersSlice";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import Loader from "@/components/loader/Loader";

function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const stats = [
    {
      id: 1,
      name: "Users",
      stat: "102+",
      icon: ImUsers,
      change: "122",
      changeType: "",
    },
    {
      id: 2,
      name: "Merchants",
      stat: "400",
      icon: AiOutlineUsergroupAdd,
      change: "",
      changeType: "",
    },
    {
      id: 2,
      name: "Completed Orders",
      stat: "80",
      icon: GiShoppingCart,
      change: "",
      changeType: "",
    },
    {
      id: 2,
      name: "Uncompleted Orders",
      stat: "120",
      icon: MdRemoveShoppingCart,
      change: "",
      changeType: "",
    },
  ];

  const [isUpdated, setIsUpdated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<any>("");

  const { loading, orders, message, error } = useSelector(
    (store: RootState) => store.getOrders
  );

  console.log(orders, loading, "THE STATES");

  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setLoaded(true);
      dispatch(getOrdersAction(token));
    }
  }, [token]);

  return (
    <div>
      <AdminLayout title="Dashboard">
        {loading && <Loader />}

        {orders && (
          <>
            <StatsCard data={stats} />
            <p className="my-5 font-bold text-2xl">All Orders</p>
            <OrdersCard orders={orders} />
            <OrdersCard orders={orders} />
          </>
        )}
      </AdminLayout>
    </div>
  );
}

export default Index;
