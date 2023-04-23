import { useState, useEffect } from "react";
import { MdOutlineModeEdit, MdOutlineBlock } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import {FaUserCheck} from "react-icons/fa";
import AddNewMerchant from "@/components/modals/merchantModals/AddNewMerchant";
import EditMerchant from "@/components/modals/merchantModals/EditMerchant";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantsAction } from "../../redux/Features/merchant/getMerchantsSlice";
import { getMerchantAction } from "../../redux/Features/merchant/getMerchantSlice";
import { deleteMerchantAction } from "../../redux/Features/merchant/deleteMerchantSlice";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import {ImUserMinus} from 'react-icons/im'
import { disableMerchantAction } from "../../redux/Features/merchant/disableMerchantSlice";
import { reactivateMerchantAction } from "../../redux/Features/merchant/reactivateMerchantSlice";


function Merchants() {
  const dispatch = useDispatch<AppDispatch>();

  const [addNewMerchant, setAddNewMerchant] = useState(false);
  const [editMerchant, setEditMerchant] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [token, setToken] = useState<any>("");
  const [loaded, setIsloaded] = useState(false);

  const { loading, merchants } = useSelector(
    (store: RootState) => store.getMerchants
  );

  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setIsloaded(true);
      dispatch(getMerchantsAction(token));
    }
  }, [token]);

  if (isUpdated) {
    dispatch(getMerchantsAction(token));
    setIsUpdated(false);
  }

  //DELETE FUNCTION HANDLER
  const deleteHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this Merchant?",
      description: "This action cannot be undone",
      message: "Merchant deleted Successfully",
      onConfirm: () => {
        dispatch(deleteMerchantAction({ id, token }));
        setIsUpdated(true);
      },
    });
  };

  //DISABLE FUNCION HANDLER 
  const disableHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to DEACTIVATE this Merchant?",
      description: "This action cannot be undone",
      message: "Merchant Disabled Successfully",
      onConfirm: () => {
        dispatch(disableMerchantAction({ id, token }));
        setIsUpdated(true);
      },
    });
  };

  // REACIVATE ACCOUNT HANDLER 

  const reactivateHandler = (id: string) => {
  
    confirm({
      title: "Are you sure you want to reactivate this Merchant?",
      description: "This action cannot be undone",
      message: "Merchant Reactivated Successfully",
      onConfirm: () => {
        dispatch(reactivateMerchantAction({ id, token }));
        setIsUpdated(true);
      },
    });
  };

  //UPDATE FUNCTION HANDLER
  const updateHandler = async (id: string) => {
    setEditMerchant(true);
    await dispatch(getMerchantAction({ id, token }));
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
                              <th
                                scope="col"
                                className="min-w-[4rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-500">
                                ID
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Name
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
                            {merchants &&
                              merchants.length > 0 &&
                              merchants.map((merchant: any) => (
                                <tr
                                  key={merchant._id}
                                  className="bg-gray-50 hover:bg-[#F5F5F5]">
                                  <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                    <input
                                      type="checkbox"
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                    />
                                  </td>
                                  <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                                    {merchant._id}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {merchant.name}
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
                                  {merchant.isDisabled !== true ? (
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                      Active
                                    </td>
                                  ) : (
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">
                                      Disabled
                                    </td>
                                  )}
                                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex justify-between items-center">
                                      {
                                        merchant?.isDisabled ? (
                                          <span
                                          onClick = {() => reactivateHandler(merchant._id)}
                                          >
                                          <ImUserMinus
                                            size="20"
                                            color={"#FF0000"}
                                            className="text-gray-500 hover:text-orange cursor-pointer"
                                          />
                                        </span>
                                        ) : (                                          
                                        <span
                                        onClick = {() => disableHandler(merchant._id)}
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
                                          updateHandler(merchant._id)
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
