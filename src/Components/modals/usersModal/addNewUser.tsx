import { Fragment, useRef, useState, useEffect } from 'react'
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../..//loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../../inputs/InputField";
import SubmitBtn from "../../buttons/submitBtn";
import CancelBtn from "../../buttons/cancelButton";
import { showSuccess, showError } from "../../Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";

import { userRegisterAction } from './../../../redux/Features/user/registerUserSlice';

interface AddNewCategoryProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
  token: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export default function AddNewMerchant({open, setOpen, setIsUpdated, token}:AddNewCategoryProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector((store:RootState) => store.registerUser)



  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Add New User"
      >
     <Formik
     initialValues={{name: "", email: "", password:"" , phone:""}}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Name Is Required'), 
      email: Yup.string().email("Ensure a valid email is entered")
      .required('Email Is Required'), 
      password: Yup.string()
      .required('Password Is Required'), 

      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').nonNullable()


    })}
     onSubmit={async (values : any, { setSubmitting }) => {
       const  name = values.name
        const email = values.email
        const  password = values.password
        const  phone = values.phone

            const resultAction = await dispatch(userRegisterAction({name, token, email, password, phone}))

            const result = unwrapResult(resultAction)
            if (result.user) {
              showSuccess("User Created Successfully")
              setIsUpdated(true)
              setOpen(false)
            } else {
              showError(result.status)
              setSubmitting(false)
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
          id="phone"
          label="Phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

<InputField 
          name="password"
          id="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text={loading ? "Please Wait" : "Add User"} />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}

       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}