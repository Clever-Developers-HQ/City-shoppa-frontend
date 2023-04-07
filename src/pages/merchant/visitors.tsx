import React, {useState } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {AiOutlineDelete}  from 'react-icons/ai'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import Image from 'next/image'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import AddNewProductModal from '@/components/modals/productsModal/addNewProduct'
import EditProductModal from '@/components/modals/productsModal/EditProductModal'
import {Charts} from '@/components/charts/chart'

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline'


interface ProductsDTO {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
}

const stats = [
    { id: 1, name: 'All Visitors', stat: '102+', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Today', stat: '56+', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
  ]

function Products() {

  const [addNewProduct, setAddNewProduct] = useState(false)
  const [editProduct, setEditProduct] = useState(false)

  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <div>

      {addNewProduct && <AddNewProductModal open={addNewProduct} setOpen={setAddNewProduct} />}
      {editProduct && <EditProductModal open={editProduct} setOpen={setEditProduct} />}


        <MerchantLayout title="Visitors">
        <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-orange rounded-full p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>

    <Charts/>
        </MerchantLayout>
      
    </div>
  )
}

export default Products