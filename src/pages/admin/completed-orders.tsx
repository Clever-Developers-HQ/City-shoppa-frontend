import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import OrdersCard from "@/components/cards/ordersCard";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "@/redux/Features/order/getOrdersSlice";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import Empty from "@/components/empty/empty";
import Loader from "@/components/loader/Loader";

function CompletedOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdated, setIsUpdated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<any>("");

  const { loading, orders, message, error } = useSelector(
    (store: RootState) => store.getOrders
  );

  useEffect(() => {
    setToken(adminTokenAuthentication);

    if (token) {
      setLoaded(true);
      dispatch(getOrdersAction(token));
    }
  }, []);

  //From the order, Filter Out Thoses Whose State is completed
  const completedOrders = orders?.filter(
    (order: any) => order.state === "completed"
  );

  return (
    <div>
      <AdminLayout title="Completed Orders">
        {loading && <Loader />}

        {/* IF Completed Orders length is greater than 0 and not empty */}
        {completedOrders?.length > 0 ? (
          <section className="bg-[#E9EBF2] p-5 rounded">
            <OrdersCard orders={completedOrders} />
          </section>
        ) : (
          <Empty text="No Completed Orders Yet" />
        )}
      </AdminLayout>
    </div>
  );
}

export default CompletedOrders;
