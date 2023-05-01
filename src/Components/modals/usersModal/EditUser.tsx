import {useState} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
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
  user: any;
}

export default function EditUser({ open, user, setOpen, setIsUpdated, token }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  console.log(user, "THE User ")
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Edit User"
      >

     <Formik
     initialValues={{name: user?.name,  phone: user.phone,  email: user.email }}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Name Is Required'),
      business_name: Yup.string()
        .required('Business name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
     phone: Yup.string().required("Phone is Required"),
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
      const id = user._id
      const business_name = values.business_name
      const email = values.email
      const website = values.website
      const address = values.address
      const name = values.name
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
          label="Name"
          value={values.name}
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
          name="phone"
          label="Phone"
          id="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text="Update user" />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>
       </form>
     )}
   </Formik>

    </ModalLayout>
  );
}
