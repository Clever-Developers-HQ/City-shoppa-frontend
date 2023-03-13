import React from 'react'
import NavBar from '@/components/navBar/NavBar'
import {MdMarkEmailUnread} from 'react-icons/md'
import {GiShoppingCart}  from 'react-icons/gi'
import OrdersCard from '@/components/cards/ordersCard'
import DisputeModal from '@/components/modals/disputeModal'
import {useState} from 'react'



function Orders() {

    const [createDispute, setCreateDispute] = useState(false)

  return (
    <>

    {createDispute && <DisputeModal open={createDispute} setOpen={setCreateDispute      } />}
    <NavBar />
    <div className="md:mx-10 mx-5">
        

        <div className="flex items-center my-5">
            <GiShoppingCart 
            size={24}
            className="mr-5"/>
            <p>Dashboard</p> 
        </div>
       
        <div className='flex justify-between items-center px-3 py-2 bg-primary text-white rounded'>
            <div>
                <p className="text-sm md:text-md">Welcome Kayode Jegede</p>
            </div>

            <div className='flex justify-between items-center'>
                <p className="hidden md:flex"> +1 (306) 115-4504</p>
                <MdMarkEmailUnread
                className="mx-3 cursor-pointer"
                size={24}
                 />

                <div 
                onClick = {() =>setCreateDispute(true)}
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

    <p className='text-xl font-bold my-3'>My Orders</p>

    <div className=" p-4 bg-secondary rounded">
        <p className="mb-3">Completed Orders </p>
    <OrdersCard />
    </div>
 
    <div className=" p-4 mt-3 bg-secondary rounded">
        <p className="mb-3">Pending Orders </p>
    <OrdersCard />
    </div>

    </section>
    </>
  )
}

export default Orders
