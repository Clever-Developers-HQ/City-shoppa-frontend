import { useState, useEffect } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {AiOutlineDelete}  from 'react-icons/ai'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import AddNewMerchant from '@/components/modals/merchantModals/AddNewMerchant'
import EditMerchant from '@/components/modals/merchantModals/EditMerchant'
// import Image from 'next/image'
import { showConfirmation, showError } from '@/components/Utils/AlertMsg'
import {useDispatch, useSelector} from 'react-redux';
import {getMerchantsAction}  from "../../redux/Features/merchant/getMerchantsSlice"
import {getMerchantAction}  from "../../redux/Features/merchant/getMerchantSlice"
import{deleteMerchantAction}  from "../../redux/Features/merchant/deleteMerchantSlice"
import AdminLayout from '@/components/layouts/AdminLayout'
import { AppDispatch, RootState } from '@/redux/store'
import Loader from '@/components/loader/Loader'


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3OTE2OTEzNywiZXhwIjoxNjgwMDMzMTM3fQ.4anwcwLFJQ2Ri36a3M2PFq5_J6D0BqOqgUdm6-dfeQY"

console.log(getMerchantsAction, "THE MERCHANTS ")

function Merchants() {
  const dispatch = useDispatch<AppDispatch>()

  const [addNewMerchant, setAddNewMerchant] = useState(false)
  const [editMerchant, setEditMerchant] = useState(false)

  const {loading, success, message, merchants} = useSelector((store : RootState) => store.getMerchants)

  console.log( loading, "THE STATES")

  useEffect(() => {
  
    const userToken : string = JSON.parse(window.localStorage.getItem('token') as string)
    
    // if (!userToken) {
    //   showError("Unauthorized Access")
    //   window.location.href = '/'
    // }

    dispatch (getMerchantsAction(token))

  }, [])

  //DELETE FUNCTION HANDLER
  const deleteHandler = async (id: string) => {
    await dispatch (deleteMerchantAction({id, token}))
     await dispatch (getMerchantsAction(token))
  }

  //UPDATE FUNCTION HANDLER 
  const updateHandler = async (id: string) => {
    setEditMerchant(true)
    await dispatch(getMerchantAction({id, token}))
  }
  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <>
    {
      addNewMerchant === true && <AddNewMerchant open={addNewMerchant} setOpen={setAddNewMerchant} />
    }
 
 {editMerchant === true && <EditMerchant open={editMerchant} setOpen ={setEditMerchant} />}

    
    <div>
        <AdminLayout title="Merchants">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick = {() => setAddNewMerchant(true) }
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
          >
            Add New Merchant
          </button>
        </div>
      </div>
      
      {loading ? <Loader /> : (

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
             Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
              Website
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
          {merchants && merchants.length > 0 && merchants.map((merchant: any) => (
            <tr key={merchant._id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
              <td className="relative w-12 px-6 sm:w-16 sm:px-8">

                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                />
              </td>
              <td
                className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
              >
                {merchant._id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
             {merchant.name} 

              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{merchant.address}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{merchant.website}</td>
              {
                merchant.state === 'Active' ? (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{merchant.state}</td>
                ) : (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">{merchant.state}</td>
                )
              }
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div
                  className="flex justify-between items-center"
                  >
                <span
                onClick={() => updateHandler(merchant._id)}
                  className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                >

                  <MdOutlineModeEdit
                  size="20"
                   />
                </span>

                <span onClick={() => showConfirmation("Merchant", deleteHandler(merchant._id))}>
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
      ) }

    </div>
        </AdminLayout>
      
    </div>
    </>
  )
}

export default Merchants