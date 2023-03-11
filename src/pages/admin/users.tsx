import { useRef, useState } from 'react'
import {MdOutlineModeEdit} from 'react-icons/md'
import {AiOutlineDelete}  from 'react-icons/ai'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import AddNewUserModal from '@/components/modals/usersModal/addNewUser'
import EditUserModal from '@/components/modals/usersModal/EditUser'
import { showConfirmation } from '@/components/Utils/AlertMsg'
import Image from 'next/image'

import AdminLayout from '@/components/layouts/AdminLayout'

interface UsersDTO {
  id: string;
  username: string;
  email: string;
  phone: string;
  status: string;
}

function Users() {

  const [addNewUser, setAddNewUser] = useState(false)
  const [editUser, setEditUser] = useState(false)

  const users: UsersDTO[] = [
    {
        id: '01',
        username: "Kayode Jegede",
        email: "user001@gmail.com",
        phone: "1- 888-452-1505",
        status: "Active",
    },
    {
        id: '02',
        username: "Kayode Jegede",
        email: "user001@gmail.com",
        phone: "1- 888-452-1505",
        status: "Disabled",
    },
  ]
  
  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  
  return (
    <>
    {addNewUser === true && <AddNewUserModal open={addNewUser} setOpen={setAddNewUser} />}
    {editUser === true && <EditUserModal open={editUser} setOpen={setEditUser} />}
    <div>
        <AdminLayout title="Users">
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick = {() => setAddNewUser(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
          >
            Add New User
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
                      Username
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                     Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                      Phone
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
                  {users.map((user) => (
                    <tr key={user.id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
    
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        />
                      </td>
                      <td
                        className= 'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500'
                      >
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                     {user.username} 
    
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.status}</td>
                      {
                        user.status === 'Active' ? (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">{user.status}</td>
                        ) : (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">{user.status}</td>
                        )
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div
                          className="flex justify-between items-center"
                          >
                        <span
                        onClick = {() => setEditUser(true)}
                          className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                        >
                          <MdOutlineModeEdit
                          size="20"
                           />
                        </span>

                        <span onClick={() => showConfirmation()} >
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
    </>
  )
}

export default Users
