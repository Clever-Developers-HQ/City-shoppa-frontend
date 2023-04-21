import { Fragment, useRef, useState } from 'react'
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import { merchantRegisterAction } from '@/redux/Features/merchant/registerMerchantSlice';
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";



interface AddNewMerchantProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
  token: string
}


export default function AddNewMerchant({open, setOpen, setIsUpdated, token}:AddNewMerchantProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector((store:RootState) => store.registerMerchant)

  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Add New Merchant"
      >
     <Formik
     initialValues={{name: "", business_name: "", website: "", address: "",  email: "" }}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Merchant Name Is Required'),
      business_name: Yup.string()
        .required('Business name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      address: Yup.string().required("Address is Required"),
      website: Yup.string().required("Website is Required").url("Ensure your website url starts wiith https:// or http://")
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
      const business_name = values.business_name
      const email = values.email
      const website = values.website
      const address = values.address
      const name = values.name

 
        const resultAction = await dispatch(merchantRegisterAction({token,  name, business_name, email, website, address}))
        const result = unwrapResult(resultAction)
        if (result.merchant) {
          showSuccess(result.status)
          setIsUpdated(true)
          setOpen(false)
        } else {
          showError("Something Went Wrong. Please Try Again")
        }
        
     }}
   >
     {({
       values,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
     }) => (
       <form onSubmit={handleSubmit}>

        <InputField 
          name="name"
          id="name"
          label="Merchant Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField 
          name="business_name"
          id="business_name"
          label="Business Name"
          value={values.business_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

          <InputField
          name="email"
          id="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
         />

        <InputField 
          name="address"
          id="address"
          label="Address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        
        <InputField 
          name="website"
          id="website"
          label="Website"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text={isSubmitting? "Please Wait" : "Add Merchant"} />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}
       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}