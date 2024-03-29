import { useRef, useState } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import Image from 'next/image'
import AdminLayout from '@/components/layouts/AdminLayout'
import AddNewBrandModal from '@/components/modals/brandsModal/AddnewBrand'
import EditBrandModal from '@/components/modals/brandsModal/EditBrand'
import { showConfirmation } from '@/components/Utils/AlertMsg'

interface brandDTO {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  logo: any;
  status: string;
}

function Brands() {
  const [addNewBrand, setAddNewBrand] = useState(false)
  const [editBrand, setEditBrand] = useState(false)

  const brands: brandDTO[] = [
    {
      id: '01',
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url: " https://cityshoppa.com/",
     name: "CityShoppa",
     createdAt: "Friday, Feb 2024",
      status: "Published",
    },
    {
        id: '02',
        logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        url: " https://cityshoppa.com/",
        name: "Micro",
        createdAt: "Friday, Feb 2024",
        status: "Published",
    },
  ]
  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <div>

      {addNewBrand && <AddNewBrandModal open={addNewBrand} setOpen={setAddNewBrand} />}
      {editBrand && <EditBrandModal open={editBrand} setOpen={setEditBrand}/> }
        <AdminLayout title="Brands">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick={() => setAddNewBrand(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            Add New  brand
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
                    <th scope="col" className="px-3 py-3.5 min-w-[8rem] text-left text-md font-semibold text-gray-500">
                     Logo
                    </th>
                    <th scope="col" className="px-3 py-3.5 min-w-[8rem] text-left text-md font-semibold text-gray-500">
                     Name
                    </th>
                    <th scope="col" className="px-3 min-w-[8rem] py-3.5 text-left text-md font-semibold text-gray-500">
                      URL
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="relative min-w-[6rem] py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit or Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white hover:">
                  {brands.map((brand) => (
                    <tr key={brand.id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
    
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        />
                      </td>
                      <td
                        className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
                      >
                        {brand.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <img src={brand.logo} 
                        alt="" 
                        width = '200'
                        height = '200'
                        className="w-20 h-20 rounded" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.url}</td>
                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.createdAt}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{brand.status}</td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div
                          className="flex justify-between items-center"
                          >
                        <span
                        onClick={() => setEditBrand(true)}
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                        >
                          <MdOutlineModeEdit
                          size="20"
                           />
                        </span>

                        <span

                        >
                          <RiDeleteBin6Line
                          // onClick = {showConfirmation}
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
        </AdminLayout>
      
    </div>
  )
}

export default Brands

