import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import AddNewProductModal from "@/components/modals/productsModal/addNewProduct";
import EditProductModal from "@/components/modals/productsModal/EditProductModal";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/loader/Loader";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";
import { confirm } from "@/components/alert/confirm";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "@/redux/Features/product/getProductsSlice";
import Empty  from "@/components/empty/empty";
import { FaDotCircle } from "react-icons/fa";
import {deleteProductAction} from "@/redux/Features/product/deleteProductSlice"





function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const [addNewProduct, setAddNewProduct] = useState(false);
  const [editNewProduct, setEditNewProduct] = useState(false);
  const [token, setToken] = useState<any>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setIsLoaded(true);
      dispatch(getProductsAction({}));
    }
  }, [token]);

  const { loading, products } = useSelector(
    (store: RootState) => store.getProducts
  );


  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const deleteHandler = (product_id: string) => {
    confirm({
      title: "Are you sure you want to delete this Product?",
      description: "This action cannot be undone",
      message: "Product deleted Successfully",
      onConfirm: () => {
        dispatch(deleteProductAction({ product_id, token }));
        setIsUpdated(true);
      },
    });
  };

  if(isUpdated) {
    dispatch(getProductsAction({}))
    setIsUpdated(false)
  }

  return (
    <>
      {addNewProduct && (
        <AddNewProductModal open={addNewProduct} setOpen={setAddNewProduct} />
      )}

      {editNewProduct && (
        <EditProductModal open={editNewProduct} setOpen={setEditNewProduct} />
      )}
      <div>
        <AdminLayout title="Product List">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setAddNewProduct(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto">
                  Add New Product
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
                              className="relative w-12 px-6 sm:w-16 sm:px-8"></th>
                            <th
                              scope="col"
                              className="max-w-[4rem] wrap py-3.5 pr-3 text-left text-md font-semibold text-gray-500">
                              Product Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Brand
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Discount
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Status
                            </th>
  
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                              Status
                            </th>
  
                            <th
                              scope="col"
                              className="relative min-w-[8rem] py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Edit or Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white ">
                          {products?.map((product: any) => (
                            <tr
                              key={product._id}
                              className="bg-gray-50 hover:bg-[#F5F5F5]">
                              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                <input
                                  type="checkbox"
                                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6"
                                />
                              </td>
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                                {product.product_name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                $ {product?.product_price}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.qty}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.brand}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.discount}
                              </td>
  
                              {product.state == "published" ? (
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                  <FaDotCircle color="green" size={15} />
                                </td>
                              ) : (
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">
                                  <FaDotCircle color="red" size={15} />
                                </td>
                              )}
  
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product.merchant_name}
                              </td>
  
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-500 hover:text-indigo-900 cursor-pointer">
                                    <GrView size="20" />
                                  </span>
  
                                  <span
                                    onClick={() => setEditNewProduct(true)}
                                    className="text-gray-500 hover:text-indigo-900 cursor-pointer">
                                    <MdOutlineModeEdit size="20" />
                                  </span>
  
                                  <span
                                  onClick = {() => deleteHandler(product._id)}
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
      </div>
    </>
  );
}

export default Products;
