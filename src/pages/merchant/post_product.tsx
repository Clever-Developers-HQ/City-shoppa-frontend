import React from 'react'
import FileUpload from "@/components/inputs/FileUpload";
import SelectInput from "@/components/inputs/SelectMenu";
import { Fragment, useRef, useState } from "react";
import MerchantLayout from '@/components/layouts/MerchantLayout';


function Post_product() {

    const [images, setImages] = useState<any>([]);

  return (
    <MerchantLayout title="Post Product">
          <div className="p-5 bg-[#E9EBF2] rounded">
            <div className= "flex justify-end ">
            <button
                  type="button"
                  className="items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                  >
                  Publish
                </button>
               </div>


            <div className="relative w-full inline-block align-bottom">
              <div>
                <div className="mt-3 text-center sm:mt-5">

                  <div className="mt-2">
                    <SelectInput
                      label="Category"
                      options={["Category 1", "Category 2", "Category 3"]}
                      name="category"
                    />

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm text-left font-medium text-gray-700 py-3">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="product name"
                        id="product name"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                      />
                    </div>

                    <div className="w-full flex justify-between items-center">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm text-left font-medium text-gray-700 py-3">
                          Product Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">
                              Currency
                            </label>
                            <select
                              id="currency"
                              name="currency"
                              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm">
                              <option>CAD</option>
                              <option>USD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-40">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm text-left font-medium text-gray-700 py-3">
                            Discount (%)
                          </label>
                          <input
                            type="text"
                            name="discount"
                            id="discount"
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm text-left font-medium text-gray-700 py-3">
                        Product Description
                      </label>
                      <textarea
                        rows={5}
                        name="description"
                        id="description"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your product"
                      />
                    </div>

                    <div className="w-full my-5">
                      <FileUpload
                        multiple={true}
                        label="Click or Drop Product Images Here"
                        images={images}
                        setImages={setImages}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
    </MerchantLayout>

  )
}

export default Post_product
