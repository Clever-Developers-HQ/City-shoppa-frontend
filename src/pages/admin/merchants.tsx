import { useState, useEffect } from "react";
import { MdOutlineModeEdit, MdOutlineBlock } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import {FaUserCheck} from "react-icons/fa";
import AddNewMerchant from "@/components/modals/merchantModals/AddNewMerchant";
import EditMerchant from "@/components/modals/merchantModals/EditMerchant";
import { useDispatch, useSelector } from "react-redux";
import { deleteMerchantAction } from "../../redux/Features/merchant/deleteMerchantSlice";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import {ImUserMinus} from 'react-icons/im'
import {getUsersAction} from "../../redux/Features/user/getUsersSlice";
import {updateUserAction} from "../../redux/Features/user/updateUserSlice";
import { deleteUserAction } from "@/redux/Features/user/deleteUserSlice";


function Merchants() {
  const dispatch = useDispatch<AppDispatch>();

  const [addNewMerchant, setAddNewMerchant] = useState(false);
  const [editMerchant, setEditMerchant] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [token, setToken] = useState<any>("");
  const [loaded, setIsloaded] = useState(false);
  const [merchant, setMerchant] = useState<any>()

  const { merchants } = useSelector(
    (store: RootState) => store.getMerchants
  );

  const { loading, users } = useSelector(
    (store: RootState) => store.getUsers
  );

  const filtered = (users : any) => {
    return users.filter((user : any) => user.role == 'merchant')
}


  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setIsloaded(true);
      dispatch(getUsersAction(token));
    }
  }, [token, dispatch]);

  if (isUpdated) {
    dispatch(getUsersAction(token));
    setIsUpdated(false);
  }

  //DELETE FUNCTION HANDLER
  const deleteHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this Merchant?",
      description: "This action cannot be undone",
      message: "Merchant deleted Successfully",
      onConfirm: () => {
        dispatch(deleteUserAction({ id, token }));
        setIsUpdated(true);
      },
    });
  };

  //DISABLE FUNCION HANDLER 
  const approveHandler = async (id: string) => {
    confirm({
      title: "Are you sure you want to Reactivate this merchant Account?",
      description: "",
      message: "Merchant Activated Successfully",
      onConfirm: () => {
        dispatch(updateUserAction({  id, token, role: "merchant", merchant_application: 'approved' }));
        setIsUpdated(true);
      },
    });
};

  //DELETE FUNCTION HANDLER
  const declineHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to Disabled this Merchant?",
      description: "",
      message: "Merchant Account Disabled Successfully",
      onConfirm: () => {
        dispatch(updateUserAction({  id, token, merchant_application: 'declined' }));
        setIsUpdated(true);
      },
    })
  };

  //UPDATE FUNCTION HANDLER
  const updateHandler = async (merchant: any) => {
    setEditMerchant(true)
    setMerchant(merchant)
  };

  return (
    <>
      {addNewMerchant === true && (
        <AddNewMerchant
          open={addNewMerchant}
          setOpen={setAddNewMerchant}
          setIsUpdated={setIsUpdated}
          token={token}
        />
      )}

      {editMerchant === true && (
        <EditMerchant
          open={editMerchant}
          setOpen={setEditMerchant}
          setIsUpdated={setIsUpdated}
          token={token}
          merchant={merchant}
        />
      )}

      {loaded === false ? (
        <LoadingScreen />
      ) : (
        <div>
          <AdminLayout title="Merchants">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto"></div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    onClick={() => setAddNewMerchant(true)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto">
                    Add New Merchant
                  </button>
                </div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="relative w-12 px-6 sm:w-16 sm:px-8"></th>
                              {/* <th
                                scope="col"
                                className="min-w-[4rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-500">
                                ID
                              </th> */}
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Business Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Email
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Address
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Website
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Status
                              </th>
                              <th
                                scope="col"
                                className="relative min-w-[6rem] py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit or Delete</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white ">
                            {users &&
                              users.length > 0 && filtered(users)?.map((merchant: any) => (
                                <tr
                                  key={merchant._id}
                                  className="bg-gray-50 hover:bg-[#F5F5F5]">
                                  <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                    <input
                                      type="checkbox"
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                    />
                                  </td>
                                  {/* <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                                    {merchant._id}
                                  </td> */}
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {merchant.business_name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {merchant.email}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {merchant.address}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {merchant.website}
                                  </td>
                                  {merchant.merchant_application === "approved" ? (
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                      Approved
                                    </td>
                                  ) : (
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">
                                      Declined
                                    </td>
                                  )}
                                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex justify-between items-center">
                                      {
                                       merchant.merchant_application === "approved" ? (
                                          <span
                                          onClick = {() => declineHandler(merchant._id)}
                                          >
                                          <ImUserMinus 
                                            size="20"
                                            color={"#FF0000"}
                                            className="text-gray-500 hover:text-orange cursor-pointer"
                                          />
                                        </span>
                                        ) : (                                          
                                        <span
                                        onClick = {() => approveHandler(merchant._id)}
                                        >
                                          <FaUserCheck
                                            size="20"
                                            color={"#31AB5B"}
                                            className="text-gray-500 hover:text-orange cursor-pointer"
                                          />
                                        </span>)
                                      }


                                      <span
                                        onClick={() =>
                                          updateHandler(merchant)
                                        }
                                        className="text-gray-500 hover:text-orange cursor-pointer">
                                        <MdOutlineModeEdit size="20" />
                                      </span>

                                      <span
                                        onClick={() =>
                                          deleteHandler(merchant._id)
                                        }>
                                        <RiDeleteBin6Line
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
              )}
            </div>
          </AdminLayout>
        </div>
      )}
    </>
  );
}

export default Merchants;
