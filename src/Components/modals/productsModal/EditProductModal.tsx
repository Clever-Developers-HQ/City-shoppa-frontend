import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import SelectInput from "./../../inputs/S"
// import {showConfirmation}
import FileUpload from './../../inputs/FileUpload';

interface ModalProps {
  open: boolean;
  setOpen: any;
  product: any
}

export default function EditProductModal({ open, setOpen, product }: ModalProps) {
  const cancelButtonRef = useRef(null);
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState<any>({});

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="relative w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900">
                    <div className="row  items-center justify-center ">
                      <p>Edit Product Details </p>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* <SelectInput
                      label="Category"
                      name="category" 
                    /> */}

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
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setOpen(false)}>
                  Update 
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}>
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
