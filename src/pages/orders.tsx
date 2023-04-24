import React, { useState, useEffect } from "react";
import NavBar from "@/components/navigation/NavBar";
import { MdMarkEmailUnread } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import OrdersCard from "@/components/cards/ordersCard";
import DisputeModal from "@/components/modals/disputeModal";
import SubmitBtn from "@/components/buttons/submitBtn";
import NextLink from 'next/link'
import { getUserAction } from '@/redux/Features/user/getUserSlice';
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Empty from '@/components/empty/empty'
import { useRouter } from "next/router";
// import {userTokenAuthentication}

function Orders() {
  const [createDispute, setCreateDispute] = useState(false);
  const [user, setUser] = useState<any>()
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const { loading, success, message, orders, error } = useSelector(
    (store: RootState) => store.getUser
  );

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user")!);
    setUser(userDetails);

    if (!userDetails?._id) {
      router.push("/login");
    }
    if (userDetails?.isDisabled === true){
      router.push("/disabled")
    }
    dispatch(getUserAction({id: userDetails._id, token: userDetails.token}))
  }, [dispatch]);


  //FILTER OUT ORDER THAT THE STATE IS STIL PENDING 

  const filteredorders = (status: any) => {
     return orders?.filter((order : any) => order.state === status);
  }



  return (
    <>
      {createDispute && (
        <DisputeModal open={createDispute} setOpen={setCreateDispute} />
      )}
      <NavBar />
      <div className="md:mx-10 mx-5">
        <div className="flex items-center justify-between my-5">
          <div className="flex">
            <GiShoppingCart size={24} className="mr-5" />
            <p>Dashboard</p>
          </div>

          <div>
            <NextLink
                href="/signup/merchant"
            >
            <SubmitBtn text="Become A Merchant" />
            </NextLink>
          </div>
        </div>

        <div className="flex justify-between items-center px-3 py-2 bg-primary text-white rounded">
          <div>
            <p className="text-sm md:text-md">Welcome Kayode Jegede</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="hidden md:flex"> +1 (306) 115-4504</p>
            <MdMarkEmailUnread className="mx-3 cursor-pointer" size={24} />

            <div
              onClick={() => setCreateDispute(true)}
              className="mx-3 px-2 cursor-pointer rounded-bl-2xl rounded-tr-2xl rounded bg-orange text-bold ">
              <p>DISPUTE</p>
            </div>

            <div className="rounded-bl-2xl rounded-tr-2xl cursor-pointer px-2 bg-orange text-bold flex flex-nowrap ">
              <p className="text-sm md:text-md">DISCOUNT CODE</p>
            </div>
          </div>
        </div>
      </div>

      <section className="md:mx-10 mx-5">
        <p className="text-xl font-bold my-10">My Orders</p>

        <div className=" p-4 bg-secondary rounded">
          <p className="mb-3 text-white">Completed Orders </p>
          {
            filteredorders("Completed")?.length > 0 ? (
                <>
                          <OrdersCard orders={filteredorders("Completed")} />
                </>
            ) : <Empty text= "There's currently no Completed orders." />
          }
        </div>

        <div className=" p-4 mt-3 bg-secondary rounded">
          <p className="mb-3 text-white">Pending Orders </p>
          {/* //Check if the order status is pending */}

                    {
            filteredorders("Pending")?.length > 0 ? (
                <>
                          <OrdersCard orders={filteredorders("Pending")} />
                </>
            ) : <Empty text= "There's currently no pending orders." />
          }
        </div>
      </section>
    </>
  );
}

export default Orders;
