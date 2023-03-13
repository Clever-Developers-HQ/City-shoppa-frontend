
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HeartIcon, XIcon } from '@heroicons/react/outline'
import { PencilIcon, PlusSmIcon } from '@heroicons/react/solid'
import {FiEdit2} from 'react-icons/fi'
interface ModalProps {
  open: boolean,
  setOpen: any,
}
export default function Profile({ open, setOpen}: ModalProps) {

  const [isEdit, setIsEdit] = useState(false)
  const [isEditUserName, setIsEditUserName] = useState(false)
  const [isEditEmail, setIsEditEmail] = useState(false)
  const [isEditPhone, setIsEditPhone] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-96 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full bg-[#D9D9D9] overflow-y-auto bg-white p-8">
                  <div className="space-y-6 pb-16">
                    <div>
                      <div className="flex flex-col items-center justify-center w-full overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                          alt=""
                          className="object-cover rounded-full mb-5 h-20 w-20"
                        />

                        <div> 
                          <p> Kayode Jegede</p>
                          { isEdit === true ? (
                            <button 
                            onClick = {() => setIsEdit(false)}
                            className="py-2 text-sm font-bold mt-4 px-4 cursor-pointer text-white bg-orange rounded-xl"> 
                            Update
                          </button>) : (
                          <button 
                          onClick = {() => setIsEdit(true)}
                          className="py-2 text-sm font-bold mt-4 px-4 cursor-pointer text-white bg-orange rounded-xl"> 
                          Edit Profile
                          </button>
                          )}
                        </div>

                      </div>
                    </div>
                    <div>
                      <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                        <div className="flex flex-col justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Username</dt>
                          <div className= 'flex justify-between items-center'> 
                          {
                            isEditUserName=== true ? ( 
                               <input
                              type="text"
                              name="userName"
                              id="userName"
                              className="shadow-sm mt-2 mr-2 focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                            />) : (
                               <dd className="text-gray-900 mt-2">KayodeJegede75</dd> 
                            )
                          }

                          {isEdit && <FiEdit2 
                          onClick = {() => setIsEditUserName(!isEditUserName)}
                          className="cursor-pointer"/>}

                          </div>
                        </div>

                        <div className="flex flex-col justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Email</dt>
                          <div className= 'flex justify-between items-center'> 
                          {
                            isEditEmail=== true ? ( 
                               <input
                              type="text"
                              name="email"
                              id="email"
                              className="shadow-sm mt-2 mr-2 focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                            />) : (
                               <dd className="text-gray-900 mt-2">marco65@gmail.com</dd> 
                            )
                          }

                          {isEdit && <FiEdit2 
                          onClick = {() => setIsEditEmail(!isEditEmail)}
                          className="cursor-pointer"/>}

                          </div>
                        </div>

                        <div className="flex flex-col justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Phone</dt>
                          <div className= 'flex justify-between items-center'> 
                          {
                            isEditPhone=== true ? ( 
                               <input
                              type="text"
                              name="discount"
                              id="discount"
                              className="shadow-sm mt-2 mr-2 focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                            />) : (
                               <dd className="text-gray-900 mt-2">+1 (306) 115 - 4504 </dd> 
                            )
                          }

                          {isEdit && <FiEdit2 
                          onClick = {() => setIsEditPhone(!isEditPhone)}
                          className="cursor-pointer"/>}
                          </div>
                        </div>

                        
                        <div className="flex flex-col justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Password</dt>
                          <div className= 'flex justify-between items-center'> 
                          {
                            isEditPassword=== true ? ( 
                               <input
                              type="password"
                              name="discount"
                              id="discount"
                              className="shadow-sm mt-2 mr-2 focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                            />) : (
                               <dd className="text-gray-900 mt-2">************</dd> 
                            )
                          }

                          {isEdit && <FiEdit2 
                          onClick = {() => setIsEditPassword(!isEditPassword)}
                          className="cursor-pointer"/>}
                          </div>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
