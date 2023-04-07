import React from 'react'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import OrdersCard from '@/components/cards/ordersCard'



function index() {
  return (
    <div>
        <MerchantLayout title="Orders">
          <OrdersCard orders={[]}/>
          
        </MerchantLayout>
    </div>
  )
}

export default index