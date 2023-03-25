import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {FaCity} from 'react-icons/fa'
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

interface AddNewMerchantProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3OTI5NDUzMSwiZXhwIjoxNjgwMTU4NTMxfQ.vjXHZy9wPSyPae3tx148TlZUmhtfaTQoDLITEHTH_TE";

export default function AddNewMerchant({open, setOpen, setIsUpdated}:AddNewMerchantProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading, success, message, merchant, error} = useSelector((store:RootState) => store.registerMerchant)

  console.log(loading, success, message, merchant, error, "THE STATES OOOOOOO")


  
  

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
      website: Yup.string().required("Websiter is Required").nullable(),  
    })}
     onSubmit={(values : any, { setSubmitting }) => {
      const business_name = values.business_name
      const email = values.email
      const website = values.website
      const address = values.address
      const name = values.name

        dispatch(merchantRegisterAction({token,  name, business_name, email, website, address}))

        if(merchant){
          showSuccess("Merchant Account Created Successfully")
          setOpen(false)
          setIsUpdated(true)
        }
      
        if(error){
          showError("Something Went Wrong. Please Try Again")
          // setOpen(false)
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
            <SubmitBtn disabled={isSubmitting} text="Add Merchant" />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}
       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}