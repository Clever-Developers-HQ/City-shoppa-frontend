import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import AddNewProductModal from "@/components/modals/productsModal/addNewProduct";
import EditProductModal from "@/components/modals/productsModal/EditProductModal";
import AdminLayout from "@/components/layouts/AdminLayout";

interface ProductsDTO {
  id: string;
  name: string;
  description: string;
  merchantName: string;
  status: string;
}

function Products() {
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [editNewProduct, setEditNewProduct] = useState(false);

  const products: ProductsDTO[] = [
    {
      id: "6658",
      name: "Headphones",
      description: "Powerful sound",
      merchantName: "Marco Davied",
      status: "Published",
    },
    {
      id: "6659",
      name: "Speaker",
      description: "Full bass boasted",
      merchantName: "Messi",
      status: "Unpublished",
    },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
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
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-md font-semibold text-gray-500">
                            Merchant Name
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
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            className="bg-gray-50 hover:bg-[#F5F5F5]">
                            <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                              <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                              />
                            </td>
                            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">
                              {product.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {product.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {product.description}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {product.merchantName}
                            </td>
                            {product.status === "Published" ? (
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-[#31AB5B]">
                                {product.status}
                              </td>
                            ) : (
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-[#FF0000]">
                                {product.status}
                              </td>
                            )}
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

                                <span>
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
  );
}

export default Products;
