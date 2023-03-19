import React from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import OrdersCard from '@/components/cards/ordersCard'
import StatsCard from '@/components/cards/statsCard'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {MdRemoveShoppingCart} from 'react-icons/md'
import {ImUsers} from 'react-icons/im'
import {GiShoppingCart} from 'react-icons/gi'

function index() {
  const stats = [
    { id: 1, name: 'Users', stat: '102+', icon: ImUsers, change: '122', changeType: '' },
    { id: 2, name: 'Merchants', stat: '400', icon: AiOutlineUsergroupAdd, change: '', changeType: '' },
    { id: 2, name: 'Completed Orders', stat: '80', icon: GiShoppingCart, change: '', changeType: '' },
    { id: 2, name: 'Uncompleted Orders', stat: '120', icon: MdRemoveShoppingCart, change: '', changeType: '' },
  ]

  return (
    <div>
        <AdminLayout title="Dashboard">
          <StatsCard data={stats} />

          <p className='my-5 font-bold text-2xl'>All Orders</p>
          <OrdersCard />
          <OrdersCard />
        </AdminLayout>
    </div>
  )
}

export default index
