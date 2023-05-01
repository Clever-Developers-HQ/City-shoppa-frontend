import { useState, useEffect } from "react";
import AddNewMerchant from "@/components/modals/merchantModals/AddNewMerchant";
import EditMerchant from "@/components/modals/merchantModals/EditMerchant";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import {updateUserAction} from "../../redux/Features/user/updateUserSlice";
import {getUsersAction} from "../../redux/Features/user/getUsersSlice";
import EmptyScreen from "@/components/empty/empty";

function Pending_Merchants() {
  const dispatch = useDispatch<AppDispatch>();

  const [isUpdated, setIsUpdated] = useState(false);
  const [token, setToken] = useState<any>("");
  const [loaded, setIsloaded] = useState(false);

  const { loading, users } = useSelector(
    (store: RootState) => store.getUsers
  );

  console.log(users, "ALL USERS")

const filtered = (users : any) => {
    return users.filter((user : any) => user.merchant_application == 'pending')
}

  // console.log(merchants, "THE FILTERED")

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

  const approveHandler = async (id: string) => {
      confirm({
        title: "Are you sure you want to Approve this merchant?",
        description: "This action cannot be undone",
        message: "Merchant Approved Successfully",
        onConfirm: () => {
          dispatch(updateUserAction({  id, token, role: "merchant", merchant_application: 'approved' }));
          setIsUpdated(true);
        },
      });
  };

    //DELETE FUNCTION HANDLER
    const deleteHandler = (id: string) => {
      confirm({
        title: "Are you sure you want to decline this Merchant?",
        description: "",
        message: "Merchant deleted Successfully",
        onConfirm: () => {
          dispatch(updateUserAction({  id, token, merchant_application: 'declined' }));

          setIsUpdated(true);
        },
      })
    };

  return (
    <>

      {loaded === false ? (
        <LoadingScreen />
      ) : (
        <div>
          <AdminLayout title="Pending Merchants">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">

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
                              {/* <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                                Status
                              </th> */}
                              <th
                                scope="col"
                                className="relative min-w-[6rem] py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit or Delete</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white ">
                            {users && filtered(users)?.map((user: any) => (
                                <tr
                                  key={user._id}
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
                                    {user.business_name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {user.email}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {user.address}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {user.website}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex justify-between items-center">
                                                
                                        <span
                                        onClick = {() => approveHandler(user._id)}
                                        className="text-white font-bold bg-green-500 p-2 rounded-lg cursor-pointer"
                                        >
                                            Approve
                                        </span>

                                      <span
                                        onClick={() =>
                                          deleteHandler(user._id)
                                        }
                                        className="text-white font-bold bg-red-500 p-2 rounded-lg cursor-pointer">
                                        Decline
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>

                      </div>

                      
                      {
                                filtered(users).length <= 0 && (<EmptyScreen
                                text="No Current Pending Merchant Application"/>)
                              }
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

export default Pending_Merchants;
