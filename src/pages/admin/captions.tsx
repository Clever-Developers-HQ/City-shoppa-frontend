import { useRef, useState, useEffect } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import ShopperImg from '../../assets/images/shopperImg.png'
import Image from 'next/image'
import {confirm} from '../../components/alert/confirm';
import AdminLayout from '@/components/layouts/AdminLayout';
import AddNewCaption from '@/components/modals/captionsModal/AddNewCaption'
import { getCaptionsAction } from './../../redux/Features/caption/getCaptionsSlice';
import { deleteCaptionAction } from '@/redux/Features/caption/deleteCaptionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import Loader from '@/components/loader/Loader'
import API_BASEURL from 'constants'


interface CaptionDTO {
  id: string;
  images: any;
  heading: string;
  subHeading: string;
  status: string;
}

function Captions() {
  const dispatch = useDispatch<AppDispatch>()
  const [addNewCaption, setAddNewCaption] = useState(false)
  const [editCaption, setEditCaption] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3OTE2OTEzNywiZXhwIjoxNjgwMDMzMTM3fQ.4anwcwLFJQ2Ri36a3M2PFq5_J6D0BqOqgUdm6-dfeQY"

  const {captions, error, loading, message} = useSelector((store : RootState) => store.getCaptions)

console.log(captions)
  useEffect(() => {

    dispatch (getCaptionsAction(token))
  }, [])

  //Refresh the List once a New Data Is Added
  if (isUpdated){
    dispatch (getCaptionsAction(token))
    setIsUpdated(false)
  }


  const deleteHandler = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this caption?',
      description: 'This action cannot be undone',
      onConfirm: () => {
        
        dispatch(deleteCaptionAction({id, token}))
        setIsUpdated(true)
        alert(id)
        console.log('confirmed')
      },
    })
  }


  return (
    <div>

      {addNewCaption && <AddNewCaption setIsUpdated={setIsUpdated} open={addNewCaption} setOpen={setAddNewCaption} /> }

        <AdminLayout title="Captions">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick={() => setAddNewCaption(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            Add Caption
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
                    <th scope="col" className="px-3 py-3.5 min-w-[12rem] text-center text-md font-semibold text-gray-500">
                      Images
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Heading
                    </th>
                    <th scope="col" className="px-3 py-3.5 min-w-[12rem] text-left text-md font-semibold text-gray-500">
                      Sub Heading
                    </th>
                    <th scope="col" className="px-3 py-3.5   text-left text-md font-semibold text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3  min-w-[6rem] pr-4 sm:pr-6">
                      <span className="sr-only">Edit or Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white hover:">
                  {captions?.map((caption : any) => (
                    <tr key={caption._id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
    
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        />
                      </td>
                      <td
                        className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
                      >
                        {caption.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <img src={`https://cityshoppa.onrender.com/api/v1/uploads/${caption.image}`}
                        alt="" 
                        width = '200'
                        height = '200'
                        className="w-20 h-20 rounded" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{caption.heading}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{caption.sub_heading}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{caption.state}</td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div
                          className="flex justify-between items-center"
                          >
                        <span
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                        >
                          <MdOutlineModeEdit
                          size="20"
                           />
                        </span>

                        <span>
                          <RiDeleteBin6Line
                          onClick={() => deleteHandler(caption._id)}
                          size="20"
                          className="text-gray-500 hover:text-orange cursor-pointer"
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
      </div>)}

    </div>
        </AdminLayout>
      
    </div>
  )
}

export default Captions
