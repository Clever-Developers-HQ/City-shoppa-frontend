import {  useState, useEffect } from 'react'
import {RiDeleteBin6Line}  from 'react-icons/ri'
import AddNewUserModal from '@/components/modals/usersModal/addNewUser'
import EditUserModal from '@/components/modals/usersModal/EditUser'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import {FaUserEdit, FaUserCheck, FaUserAltSlash} from 'react-icons/fa'
import AdminLayout from '@/components/layouts/AdminLayout'
import { getUsersAction } from '@/redux/Features/user/getUsersSlice'
import {deleteUserAction} from '@/redux/Features/user/deleteUserSlice'
import { formatPhoneNumber } from '@/components/Utils/utilFuncs'
import {updateUserAction} from '@/redux/Features/user/updateUserSlice';


function Users() {
  const dispatch = useDispatch<AppDispatch>();

  const [addNewUser, setAddNewUser] = useState(false)
  const [editUser, setEditUser] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false);
  const [token, setToken] = useState<any>("");
  const [loaded, setIsloaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { loading, users } = useSelector(
    (store: RootState) => store.getUsers
  );

  useEffect (() => {
    const token = adminTokenAuthentication();
    if (token) {
      setToken(token);
      setIsloaded(true);
      dispatch(getUsersAction(token))
    }
  }, [token, dispatch])

  if (isUpdated){
    dispatch(getUsersAction(token))
    setIsUpdated(false)
  }


  //DELETE FUNCTION HANDLER
  const deleteHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this User?",
      description: "This action cannot be undone",
      message: "User deleted Successfully",
      onConfirm: () => {
        dispatch(deleteUserAction({ id, token,  }));
        setIsUpdated(true);
      },
    });
  };

  //DISABLE MERCHANT HANDLER 
  const disableHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to Disable this User?",
      description: "",
      message: "User Disabled Successfully",
      onConfirm: () => {
        dispatch(updateUserAction({ id, token, isDisabled: true }));
        setIsUpdated(true);
      },
    });
  }

  //REACTIVATE USER HANDLER 

  const reactivateHandler = (id : string) => {
    confirm({
      title: "Are you sure you want to Reactivate this User?",
      description: "",
      message: "User Disabled Successfully",
      onConfirm: () => {
        dispatch(updateUserAction({ id, token, isDisabled:false }));
        setIsUpdated(true);
      },
    });
  }



  //EDIT USER HANDLER 

  const editHandler = (user: any) => {
    setUser(user)
    setEditUser(true)
  }

  
  return (
    <>
    {addNewUser === true && <AddNewUserModal open={addNewUser} setOpen={setAddNewUser} setIsUpdated={setIsUpdated} token={token} />}
    {editUser === true && <EditUserModal user={user} setIsUpdated={setIsUpdated} open={editUser} setOpen={setEditUser} token={token} />}

    {
      loaded === false ? <LoadingScreen /> : (
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

      {
        loading ? <Loader /> : (
          <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      </th>
                      {/* <th scope="col" className="min-w-[4rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-500">
                        User ID
                      </th> */}
                      <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                       Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                        Phone
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                        Role
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
                    {users.map((user :any) => (
                      <tr key={user._id} className='bg-gray-50 hover:bg-[#F5F5F5]'>
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
      
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          />
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                       {user.name} 
      
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatPhoneNumber(user?.phone)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.role}</td>
                        {
                          user.isDisabled === false ? (
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">Active</td>
                          ) : (
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">Disabled</td>
                          )
                        }
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div
                            className="flex justify-between items-center"
                            >
                          <span
                          onClick = {() => editHandler(user)}
                            className="text-gray-500 hover:text-orange cursor-pointer"
                          >
                            <FaUserEdit
                            size="20"
                             />
                          </span>
                          {
                            user.isDisabled === false ? (
                              <span
                              onClick={() => disableHandler(user._id)}
                              >
                              <FaUserAltSlash
                              size="20"
                              className="text-gray-500 hover:text-orange cursor-pointer"
                               />
                            </span>
                            ) : (
                              <span
                              onClick={() => reactivateHandler(user._id)}
                              >
                              <FaUserCheck
                              size="20"
                              className="text-gray-500 hover:text-orange cursor-pointer"
                               />
                            </span>
                            )
                          }
  
                          <span 
                          // onClick={() => showConfirmation()} 
                          >
                            <RiDeleteBin6Line
                            onClick = {() => deleteHandler(user._id)}
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
        </div>
        )
      }

    </div>
        </AdminLayout>
      
    </div>
      )
    }
    </>
  )
}

export default Users
