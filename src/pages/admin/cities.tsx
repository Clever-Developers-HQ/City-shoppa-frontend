import { useRef, useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ShopperImg from "../../assets/images/shopperImg.png";
import AddNewCityModal from "@/components/modals/AddNewCity";
import EditCityModal from "@/components/modals/EditCity";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getCitiesAction } from "@/redux/Features/city/getCitiesSlice";
import {deleteCityAction} from "@/redux/Features/city/deleteCitySlice";
import { getCityAction } from "@/redux/Features/city/getCitySlice";


function Cities() {
  const dispatch = useDispatch<AppDispatch>();

  const [addNewCity, setAddNewCity] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [token, setToken] = useState<any>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false)

  const { loading, cities } = useSelector(
    (store: RootState) => store.getCities
  );

  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setPageLoading(false);
      dispatch(getCitiesAction(token));
    }
  }, [token]);

  //DELETE CITY HANDLER
  const deleteHandler = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this City?",
      description: "This action cannot be undone",
      message: "City deleted Successfully",
      onConfirm: () => {
        dispatch(deleteCityAction({ id, token }));
        setIsUpdated(true)
      },
    });
    
  }
  //UPDATE CITY HANDLER

  const updateHandler = (id: string) => {
    setEditCity(true)
    dispatch(getCityAction({id, token}))
  }


  if(isUpdated) {
    dispatch(getCitiesAction(token) )
    setIsUpdated(false)
  }

  return (
    <>
      {addNewCity === true && (
        <AddNewCityModal open={addNewCity} setOpen={setAddNewCity} setIsUpdated={setIsUpdated} token={token} />
      )}
      {editCity === true && (
        <EditCityModal open={editCity} setOpen={setEditCity} setIsUpdated={setIsUpdated} token={token} />
      )}

      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <AdminLayout title="Cities">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto"></div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    onClick={() => setAddNewCity(true)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto">
                    Add New City
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
                                className="px-3 py-3.5 min-w-[12rem] text-left text-md font-semibold text-gray-500">
                                City
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 min-w-[12rem] text-left text-md font-semibold text-gray-500">
                                Street
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 min-w-[12rem] text-left text-md font-semibold text-gray-500">
                                Province
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 min-w-[12rem]  text-left text-md font-semibold text-gray-500">
                                Status
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 min-w-[6rem] pr-4 sm:pr-6">
                                <span className="sr-only">Edit or Delete</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white hover:">
                            {cities?.map((city: any) => (
                              <tr
                                key={city._id}
                                className="bg-gray-50 hover:bg-[#F5F5F5]">
                                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                  <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                  />
                                </td>
                                {/* <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                                  {city._id}
                                </td> */}
                                <td className="whitespace-nowrap py-4 pr-3 text-sm  text-gray-500">
                                  {city.name}
                                </td>
                                <td className="whitespace-nowrap py-4 pr-3 text-sm text-gray-500">
                                  {city.street}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {city.province}
                                </td>
                                {city.state === "Published" ? (
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                    {city.state}
                                  </td>
                                ) : (
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                                    {city.state}
                                  </td>
                                )}
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <div className="flex justify-between items-center">
                                    <span
                                      onClick={() => updateHandler(city._id)}
                                      className="text-gray-500 hover:text-orange cursor-pointer">
                                      <MdOutlineModeEdit size="20" />
                                    </span>

                                    <span
                                    onClick={() => deleteHandler(city._id)}
                                    >
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

export default Cities;
