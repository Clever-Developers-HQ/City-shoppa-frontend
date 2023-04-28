import {useState} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import PasswordField from "@/components/inputs/passwordInput";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginAction } from "@/redux/Features/auth/authLoginSlice";
import axios from 'axios'
import API_BASEURL  from "constants";
import router from "next/router";


interface ModalProps {
  open: boolean;
  setOpen: any;
}

export default function LoginModal({ open, setOpen}: ModalProps) {
  
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Login To Continue"
      >


     <Formik
     initialValues={{name: "", street: "",  province: "" }}
     validationSchema={Yup.object({
      email: Yup.string().email("Invalid Email")
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
        const email = values.email
        const password = values.password

        const config = {
            headers: {
              "Content-Type": "application/json",
              
            },
          };
      
          await axios.post(`${API_BASEURL}/users/login`, {email, password}, config)
          .then(response => {
            // console.log(response, "THE RESPONSE")
            if (response.data.status === "success") {
              showSuccess(`Welcome Back ${response.data.user?.name}`)
              //Save the User and Token Token To Local Storage
      
              //CHECK IF USER ACCOUNT IS DISABLED OR NOT 
              if (response.data.user?.isDisabled === true) {
                showError("Your Account Has Been Suspended. Please Contact Our Support Team For further Assistance.")
                setSubmitting(false)
                router.push("/disabled")
                return
              }

              localStorage.setItem("user", JSON.stringify(response.data.user))
              const token = response.data.user.token
              localStorage.setItem("token",token)
              sessionStorage.setItem('token', token);
              setSubmitting(false)
                setOpen(false)
                window.location.reload();
            }
          }).catch (err => {
              showError("Invalid Login Credentials")
              setSubmitting(false)
          })
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
          name="email"
          id="email"
          label="Email Address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <PasswordField
          name="password"
          id="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text={isSubmitting ? "Authenticating..." : "Login"} />
            <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>
       </form>
     )}
   </Formik>
    </ModalLayout>
  );
}