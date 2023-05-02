import {useState} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../../inputs/InputField";
import SubmitBtn from "../../buttons/submitBtn";
import CancelBtn from "../../buttons/cancelButton";
import { showSuccess, showError } from "../../Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import {updateUserAction} from '@/redux/Features/user/updateUserSlice';

interface ModalProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
  user: any;
}

export default function EditUser({ open, user, setOpen, setIsUpdated, token }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {loading} = useSelector((store:RootState) => store.updateUser)



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
      email: Yup.string().email('Invalid email address').required('Email is Required'),
     phone: Yup.string().required("Phone is Required"),
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
      const id = user._id
      const email = values.email
      const name = values.name
      const phone = values.phone

      console.log(values, "THE VALUES")

      const resultAction = await dispatch(updateUserAction({name, id, token, email, phone}))

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
          label="Phone"
          id="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text= {loading? "Please Wait..." : "Update user"  }/>
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>
       </form>
     )}
   </Formik>

    </ModalLayout>
  );
}
