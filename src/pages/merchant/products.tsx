import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ShopperImg from "../../assets/images/shopperImg.png";
import Image from "next/image";
import MerchantLayout from "@/components/layouts/MerchantLayout";
import AddNewProductModal from "@/components/modals/productsModal/addNewProduct";
import EditProductModal from "@/components/modals/productsModal/EditProductModal";
import { userAuthenticateToken } from "@/components/Utils/TokenAuthentication";
import {getUserAction} from "@/redux/Features/user/getUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingScreen from "@/components/loader/loadingScreen";
import Loader from "@/components/loader/Loader";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import Empty from "@/components/empty/empty";
import { FaDotCircle } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { deleteProductAction } from "@/redux/Features/product/deleteProductSlice";
import { confirm } from "@/components/alert/confirm";
import { unwrapResult } from "@reduxjs/toolkit";
import PendingAccountScreen from '@/components/empty/pending_account'
import DeclinedAccountScreen from '@/components/empty/declined_account'
import { useRouter } from 'next/router'
import { formatMoney } from "@/components/Utils/utilFuncs";


interface UserDTO {
  id: string;
  token: string;
}

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<any>()

  const router = useRouter()

  const { products, loading, error } = useSelector(
    (state: any) => state.getUser
  );
  console.log(products, error, loading, "THE STATETSSSS");

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>();
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const user = userAuthenticateToken()
    setUser(user)
    if (user) {
      if (user?.role === 'merchant') {
        dispatch(getUserAction({id:user.id, token: user.token}))
      }

      if(user.merchant_application == "pending"){
        dispatch(getUserAction({id:user.id, token: user.token}))
        .then(unwrapResult)
        .then((res:any) => {
          if(res.user){
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify(res.user))
            setIsLoaded(true)
          }
        })
      }

      setIsLoaded(true)
    }

  }, [dispatch]);

// console.log(user, "THE USER 000000")

  const [addNewProduct, setAddNewProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  function deleteHandler(product_id: any): void {
    confirm({
      title: "Are you sure you want to delete this Product?",
      description: "This action cannot be undone",
      message: "Product deleted Successfully",
      onConfirm: () => {
        dispatch(deleteProductAction({ product_id, token:user.token }));
        setIsUpdated(true);
      },
    });
  }

  if (isUpdated) {
    dispatch(getUserAction({id:user.id, token: user.token}));
    setIsUpdated(false)
  }

  const viewProductHandler = (name: string, merchant_id: string, id:string) => {
    const url = `/product/${name}?id=${id}&merchant=${merchant_id}`
    window.open(url, '_blank')
  }

  const editProductHandler = (product: any) => {
    setProduct(product)
    setEditProduct(true);
  }

  return (
    <div>
      {addNewProduct && (
        <AddNewProductModal setIsUpdated={setIsUpdated} token={user?.token} open={addNewProduct} setOpen={setAddNewProduct} />
      )}
      {editProduct && (
        <EditProductModal product={product} open={editProduct} setOpen={setEditProduct} />
      )}

      {isLoaded === false && <LoadingScreen />}

      {
        user?.merchant_application == "pending" && (<PendingAccountScreen/>)
      }

      {
        user?.merchant_application == "declined" && (<DeclinedAccountScreen/>)
      }

      {isLoaded === true && user?.merchant_application == "approved" && (
        <MerchantLayout title="Product List">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setAddNewProduct(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto">
                  Add New Product
                </button>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                {products?.length > 0 ? (
                  <>
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
                              Product Image
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
                              className="relative min-w-[4rem] py-3.5 pl-3 pr-4 sm:pr-6">
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
                                <Image
                                  src={product?.mainImage}
                                  alt="product image"
                                  className="w-20 h-20 cover"
                                  width={200}
                                  height={200}
                                />
                              </td>

                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                $ {formatMoney(product?.product_price)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.qty}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.brand}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {product?.discount}%
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
                                  <span 
                                  onClick = {() =>  viewProductHandler(product.product_name, product.merchant_id, product._id)}
                                  className="text-gray-500 hover:text-indigo-900 cursor-pointer">
                                    <GrView size="20" />
                                  </span>

                                  <span
                                    onClick={() => editProductHandler(product)}
                                    className="text-gray-500 hover:text-orange cursor-pointer">
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
                  </>
                ) : (
                  <Empty
                  text="Your Shop is currently Empty On CityShoppa. Add Product! "
                   />
                )}
              </>
            )}
          </div>
        </MerchantLayout>
      )}
    </div>
  );
}

export default Products;
