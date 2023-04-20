import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "@/components/inputs/FileUpload";
import SelectInput from "@/components/inputs/SelectMenu";
import InputField from "@/components/inputs/InputField";
import ModalLayout from "@/components/layouts/ModalLayout";
import { Formik, ErrorMessage } from "formik";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import { uploadFile, multipleUploadFile } from "@/components/Utils/cloudinaryUpload";
import * as Yup from "yup";
import {createProductAction} from "@/redux/Features/product/createProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";



interface ModalProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
}

export default function AddNewProductModal({ open, setOpen, token, setIsUpdated }: ModalProps) {
  let [images, setImages] = useState<any>([]);
  const [id, setId] = useState<any>("")
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch<AppDispatch>();

  const {loading, product, message, } = useSelector(
    (store: RootState) => store.createProduct
  );
  console.log(loading, message, "THGE STATES")

  useEffect(() => {
    //Get the user id  from objectdata from local Storage
    const user_id = JSON.parse(localStorage.getItem("user") || "{}")._id;
    setId(user_id)
  }, [id])

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Add New Product">
      <Formik
        initialValues={{
          product_name: "",
          description: "",
          product_price: "",
          category_id: "",
          product_images: [],
          discount: "",
          brand: "",
          qty: "",
        }}
        validationSchema={Yup.object({
          product_name: Yup.string().required("Product Name Is Required"),
          qty: Yup.number().required("Quantity Is Required"),
          product_price: Yup.number().required("Product Price Is required"),
          discount: Yup.number()
            .required("Discount Is Required")
            .test(
              "is-number",
              "Discount must be a number",
              (value) => !isNaN(value)
            )
            .test(
              "max-value",
              "Discount must be less than or equal to 100",
              (value) => Number(value) <= 100
            ),

          description: Yup.string().required("Product description Is Required"),

          category_id: Yup.string().required("Category Is Required"),
        })}
        onSubmit={async (values: any, { setSubmitting }) => {

          const product_name = values.product_name
          const product_price = values.product_price
          const discount = values.discount
          const description = values.description
          const category_id = values.category_id
          const qty = values.qty
          const brand = values.brand

          if (images.length === 0) {
            return showError("Missing Product Images ");
          }
      
          //Check if the images array is greater than 5
          if (images.length > 4) {
            return showError("Ensure Product Image Is Not Greater Than 4");
          }

          const results :any = [];
          //Upload every images in the array by calling the uploadFile function
          setUploading(true)
          images.forEach(async (image: any) => {

            const result = await uploadFile(image.data_url);
            results.push(result);
          if (results.length === images.length) {
            setUploading(false)
            const resultAction = await dispatch(createProductAction({
              product_price, 
              product_name, 
              discount, qty, 
              brand, 
              category_id,
              description, 
              token,
              merchant_id: id,
              mainImage: results[0],
              imageTop: results[1] || "",
              imageBack: results[2] || "",
              imageSide: results[3] || "",
            }))
          const result = unwrapResult(resultAction);
          if (result.product) {
            showSuccess(result.status)
            setIsUpdated(true)
            setOpen(false)
          }
          } 
          });
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="relative w-full inline-block align-bottom rounded-lg px-2  text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-lg sm:w-full ">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <SelectInput
                      label="Category"
                      name="category_id"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <InputField
                      name="product_name"
                      id="product_name"
                      label="Product Name"
                      value={values.product_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className="w-full flex items-center">
                      <div className="w-72">
                        <InputField
                          name="brand"
                          id="brand"
                          label="Brand"
                          value={values.brand}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      <InputField
                        name="qty"
                        id="qty"
                        label="Quantity"
                        value={values.qty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="w-full flex justify-between items-center">
                      <div>
                        <label
                          htmlFor="product_price"
                          className="block text-sm text-left font-medium text-gray-700 py-3">
                          Product Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="product_price"
                            id="product_price"
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        <div className="text-orange text-sm italic text-start text">
                          <ErrorMessage name="product_price" />
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
                          />
                        </div>
                        <div className="text-orange text-sm italic text-start text">
                          <ErrorMessage name="discount" />
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your product"
                      />

                      <div className="text-orange text-sm italic text-start text">
                        <ErrorMessage name="description" />
                      </div>
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
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <SubmitBtn disabled={isSubmitting} text={uploading ? "Processing, Please Wait": "Add Product"} />
              <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>

            {/* {loading && <Loader />} */}
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}
