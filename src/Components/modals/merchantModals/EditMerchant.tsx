import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik, ErrorMessage, useFormik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import {updateMerchantAction} from "@/redux/Features/merchant/updateMerchantSlice";
import { MerchantProps } from "@/redux/Features/merchant/merchantService";


interface ModalProps {
  open: boolean;
  setOpen: any;
}

export default function EditMerchant({ open, setOpen }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, message, merchant } = useSelector(
    (store: RootState) => store.getMerchant
  );

  const [id, setId] = useState("")

  // console.log(loading, merchant, success, message, "ON THE LOADING ");

  const token = "ijrjwhjehfjkhefjkherjkherjkhlerkjerh"

  const updateHandler = async ({id, data}:any) => {
    setOpen(false)
    await dispatch(updateMerchantAction({id, token, data}))
  }


  const formik = useFormik({

      initialValues: {
        email: merchant?.email,
        name: merchant?.name,
        address: merchant?.address,
        website: merchant?.website,
        business_name: merchant?.business_name,
      },

        validationSchema: Yup.object <any>({
      name: Yup.string()
        .required('Required'),
      address: Yup.string().required("Required"),
      website: Yup.string().required("Required").nullable(), 
      business_name: Yup.string()
        .required('Required'),
      email: Yup.string().email('Invalid Merchant email address').required('Email is Required'),
    }), 
    onSubmit: values => {
      updateHandler ({id, values})
      console.log(id, token, "ON SUBMISSION")
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Edit Merchant"
      btnText="Update Merchant"
      submitHandler={formik.handleSubmit}
      >

        {/* LOADING STATE */}
      {loading && <Loader />}

      {/* SUCCESS STATE */}
      {!loading && merchant !== "" && (
      <div className="mt-2">
      <form>
        <div className="mt-2">
          <div>
            <label
              htmlFor="merchant_name"
              className="block text-sm text-left font-medium text-gray-700 py-3">
              Merchant Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="name"
              className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
            />
          </div>
          
          {formik.touched.name && formik.errors.name ? (
   <div className="text-orange flex">{formik.errors.name as string}</div>
 ) : null}


          <div>
            <label
              htmlFor="city"
              className="block text-sm text-left font-medium text-gray-700 py-3">
              Business Name
            </label>
            <input
              type="text"
              name="business_name"
              value={formik.values.business_name}
              onBlur={formik.handleBlur}
              onChange = {formik.handleChange}
              id="business_name"
              className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
            />
          </div>

{formik.touched.business_name && formik.errors.business_name ? (
   <div className="text-orange flex">{formik.errors.business_name as string}</div>
 ) : null}



          <div>
            <label
              htmlFor="email"
              className="block text-sm text-left font-medium text-gray-700 py-3">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange = {formik.handleChange}
              className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
            />
          </div>

{formik.touched.email && formik.errors.email ? (
   <div className="text-orange flex">{formik.errors.email as string}</div>
 ) : null}


          <div>
            <label
              htmlFor="address"
              className="block text-sm text-left font-medium text-gray-700 py-3">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="email"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange = {formik.handleChange}
              className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
            />
          </div>

          {formik.touched.address && formik.errors.address ? (
   <div className="text-orange flex">{formik.errors.address as string}</div>
 ) : null}

          <div>
            <label
              htmlFor="website"
              className="block text-sm text-left font-medium text-gray-700 py-3">
              Website
            </label>
            <input
              type="text"
              name="website"
              id="website"
              value={formik.values.website}
              onBlur={formik.handleBlur}
              onChange = {formik.handleChange}
              className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
            />
          </div>

          {formik.touched.website && formik.errors.website ? (
   <div className="text-orange flex">{formik.errors.website as string}</div>
 ) : null}


        </div>
      </form>
  </div>
      ) }



    </ModalLayout>
  );
}
