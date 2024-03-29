import { useRef, useState, useEffect } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { showConfirmation } from '@/components/Utils/AlertMsg'
import AdminLayout from '@/components/layouts/AdminLayout'
import AddNewFeaturesModal from '../../components/modals/featuresModal/AddNewFeatures'
import EditFeaturesModal from '@/components/modals/featuresModal/EditFeatures'
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import Loader from '@/components/loader/Loader'
import { getFeaturesAction } from '@/redux/Features/feature/getFeaturesSlice'
import {deleteFeatureAction} from "@/redux/Features/feature/deleteFeatureSlice"
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {confirm} from '../../components/alert/confirm';
// import {getFeatureAction} from '@/redux/Features/feature/getFeatureSlice'


function Features() {
  const dispatch = useDispatch<AppDispatch>();

  const [editFeatures, setEditFeatures] = useState(false)
  const [addFeatures, setAddFeatures] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [feature, setFeature] = useState<any>()

  const [token, setToken] = useState<any>("")

  useEffect(() => {
    setToken(adminTokenAuthentication())

    if(token) {
      setLoaded(true)
      dispatch(getFeaturesAction(""))
    }

  }, [token, dispatch])

  const {loading, features} = useSelector(
    (store: RootState) => store.getFeatures
  );

  if (isUpdated) {
    dispatch(getFeaturesAction(""))
    setIsUpdated(false)
  }

  const updateHandler = (feature: any) => {
    setEditFeatures(true)
    setFeature(feature)
  }




  const deleteHandler = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this feature?',
      description: 'This action cannot be undone',
      message: "Feature Deleted Successfully",
      onConfirm: () => {
        
        dispatch(deleteFeatureAction({id, token}))
        setIsUpdated(true)
      },
    })
  }

  return (
    <div>
      {addFeatures && (
        <AddNewFeaturesModal token={token} setIsUpdated={setIsUpdated} open={addFeatures} setOpen={setAddFeatures} />
      )}

      {editFeatures && (
        <EditFeaturesModal feature={feature} token={token} open={editFeatures} setIsUpdated={setIsUpdated} setOpen={setEditFeatures} />
      )}

      {
        loaded === false ? <LoadingScreen/> :

        (
          <AdminLayout title="Features">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setAddFeatures(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                >
                  Add New Features
                </button>
              </div>
            </div>

            {
              loading ? <Loader/> : 
              (
                <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full table-fixed divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="relative w-12 px-6 sm:w-16 sm:px-8"
                            ></th>
                            <th
                              scope="col"
                              className="min-w-[4rem] py-3.5 pr-3 text-left text-md font-semibold text-gray-500"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 min-w-[4rem] text-left text-md font-semibold text-gray-500"
                            >
                             Features Image
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="relative min-w-[4rem] py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit or Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white hover:">
                          {features?.map((feature: any) => (
                            <tr
                              key={feature._id}
                              className="bg-gray-50 hover:bg-[#F5F5F5]"
                            >
                              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                <input
                                  type="checkbox"
                                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6"
                                />
                              </td>
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                                {feature._id}
                              </td>
                              <td>
                              <img
                                src={feature.image}
                                alt=""
                                width="200"
                                height="200"
                                className="w-20 h-20 my-2 rounded"
                              />
                              </td>

                                <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                  Published
                                </td>

                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <div className="flex justify-between items-center">
                                  <span
                                    onClick={() => updateHandler(feature)}
                                    className="text-gray-500 hover:text-indigo-900 cursor-pointer"
                                  >
                                    <MdOutlineModeEdit size="20" />
                                  </span>
    
                                  <span 
                                  onClick = {() => deleteHandler(feature._id)}
                                  >
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
              )
            }

          </div>
        </AdminLayout>
        )
      }


    </div>
  )
}

export default Features
