import React, {useState } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {AiOutlineDelete}  from 'react-icons/ai'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import Image from 'next/image'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import AddNewProductModal from '@/components/modals/productsModal/addNewProduct'
import EditProductModal from '@/components/modals/productsModal/EditProductModal'


interface ProductsDTO {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
}

function Products() {

  const [addNewProduct, setAddNewProduct] = useState(false)
  const [editProduct, setEditProduct] = useState(false)

  const products: ProductsDTO[] = [
    {
        id: '01',
        name: "Headphones",
        description: "Powerful sound headphones",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        status: "Published",
    },
    {
        id: '02',
        name: "Bluetooth Speaker",
        description: "Good easy to connect",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        status: "Unpublished",
    },
  ]
  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <div>

      {addNewProduct && <AddNewProductModal open={addNewProduct} setOpen={setAddNewProduct} />}
      {editProduct && <EditProductModal open={editProduct} setOpen={setEditProduct} />}


        <MerchantLayout title="Product List">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick={() => setAddNewProduct(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            Add New Product
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                    </th>
                    <th scope="col" className="min-w-[4rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-500">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Image
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                     Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                    Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit or Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {products.map((product) => (
                    <tr key={product.id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
    
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        />
                      </td>
                      <td
                        className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
                      >
                        {product.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <img
                        src={product.image}
                        alt={product.name}
                        width = '100px'
                        className="object-fit"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                      {
                        product.status === 'Published' ? (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{product.status}</td>
                        ) : (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">{product.status}</td>
                        )
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div
                          className="flex justify-between items-center"
                          >
                        <span
                        onClick = {() => setEditProduct(true)}
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                        >
                          <MdOutlineModeEdit
                          size="20"
                           />
                        </span>

                        <span

                        >
                          <RiDeleteBin6Line
                          size="20"
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                           />
                        </span>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        </MerchantLayout>
      
    </div>
  )
}

export default Products