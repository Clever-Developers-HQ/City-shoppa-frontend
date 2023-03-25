import React, {useState, useEffect } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {AiOutlineDelete}  from 'react-icons/ai'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import AddNewCategory from '@/components/modals/categoryModal/AddNewCategory'
import EditCategory from '@/components/modals/categoryModal/EditCategory'
import Image from 'next/image'
import { showConfirmation } from '@/components/Utils/AlertMsg'
import { adminTokenAuthentication } from '@/components/Utils/TokenAuthentication'

import AdminLayout from '@/components/layouts/AdminLayout'

interface CategoriesDTO {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

function Categories() {

  const [addNewCategory, setAddNewCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [token, setToken] = useState<any>("")
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setToken(adminTokenAuthentication())
    setIsLoading(false)
  }, [])


  const categories: CategoriesDTO[] = [
    {
        id: '01',
        name: "Art & Craft",
        createdAt: "8th Marth, 2022",
        updatedAt: "10th Marth, 2022",
        status: "Published",
    },
    {
        id: '02',
        name: "Bag Accessories",
        createdAt: "8th Marth, 2022",
        updatedAt: "10th Marth, 2022",
        status: "Unpublished",
    },
  ]
  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <>
    {addNewCategory === true && <AddNewCategory open={addNewCategory} setOpen={setAddNewCategory} setIsUpdated={setIsUpdated} />}
    {editCategory === true && <EditCategory open={editCategory} setOpen={setEditCategory} />}


    {
      isLoading ? ("PLEASE WAIT......") : (
        <div>
        <AdminLayout title="Categories">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick={() =>  setAddNewCategory(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
          >
            Add New category
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
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                     Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Updated At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="relative min-w-[6rem] py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit or Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {categories.map((category) => (
                    <tr key={category.id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
    
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        />
                      </td>

                      <td
                        className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
                      >
                        {category.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                     {category.name} 
    
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.createdAt}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.updatedAt}</td>
                      {
                        category.status === 'Published' ? (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{category.status}</td>
                        ) : (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">{category.status}</td>
                        )
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div
                          className="flex justify-between items-center"
                          >
                        <span
                        onClick = {() => setEditCategory(true)}
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                        >
                          <MdOutlineModeEdit
                          size="20"
                           />
                        </span>

                        <span>
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
        </AdminLayout>
      
    </div>
      )
    }
    </>
  )
}

export default Categories
