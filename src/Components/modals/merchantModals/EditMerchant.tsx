import {useState} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import {updateMerchantAction} from "@/redux/Features/merchant/updateMerchantSlice";
import InputField from "@/components/inputs/InputField";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";


interface ModalProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
}

export default function EditMerchant({ open, setOpen, setIsUpdated, token }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, message, merchant, error } = useSelector(
    (store: RootState) => store.getMerchant
  );
  
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Edit Merchant"
      >


      {loading && <Loader />}


      {!loading && (
     <Formik
     initialValues={{name: merchant.name, business_name: merchant.business_name, website: merchant.website, address: merchant.address,  email: merchant.email }}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Merchant Name Is Required'),
      business_name: Yup.string()
        .required('Business name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      address: Yup.string().required("Address is Required"),
      website: Yup.string().required("Websiter is Required").nullable(),  
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
      const id = merchant._id
      const business_name = values.business_name
      const email = values.email
      const website = values.website
      const address = values.address
      const name = values.name

        const resultAction = await dispatch(updateMerchantAction({id, token,  name, business_name, email, website, address}))
        const result = unwrapResult(resultAction)

        if(result.merchant){
          setIsUpdated(true)
          showSuccess("Merchant Updated Successfully")
          setOpen(false)
        } else {
          showError("Something Went Wrong. Please try Again")
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
            <SubmitBtn disabled={isSubmitting} text="Update Merchant" />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>
       </form>
     )}
   </Formik>
      )}
    </ModalLayout>
  );
}
