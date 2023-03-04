import React from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import OrdersCard from '@/components/cards/ordersCard'



function CompletedOrders() {
  return (
    <div>
        <AdminLayout title="Completed Orders">
            <section className="bg-[#E9EBF2] p-5 rounded">
                <OrdersCard />
                <OrdersCard />
                <OrdersCard />
            </section>
        </AdminLayout>
    </div>
  )
}

export default CompletedOrders