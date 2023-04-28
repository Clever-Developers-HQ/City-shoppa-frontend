import React from 'react'
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import { useDispatch, useSelector } from 'react-redux'
import { Formik, ErrorMessage } from 'formik';
import InputField from '@/components/inputs/InputField';
import * as Yup from 'yup';
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "@/components/loader/Loader";
import { AppDispatch } from '@/redux/store';
import { forgetPasswordAction } from '@/redux/Features/auth/authForgetPasswordSlice';
import API_BASEURL from 'constants';
import axios from "axios";
import {useRouter} from 'next/router'




function ForgetPassword() {
  const router = useRouter()

  return (
    <>
      <NavBar />
      <div className="min-h-full flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forget Password</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid Email Provided")
                  .required('Email is Required')
              })}
              onSubmit={async (values: any, { setSubmitting }) => {
                const email = values.email
                setSubmitting(true)
                
                await axios.post(`${API_BASEURL}/users/forgot-password`,{email})
                .then((res)=>{
                  showSuccess(res.data.message)
                  setTimeout(() => {
                    router.push('/')
                  }, 3000)

                }).catch(() => {
                  showSuccess("A password reset link will be sent to the email provided if the account exist. ")
                 
                  setTimeout(() => {
                    router.push('/')
                  }, 3000)
                })
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setSubmitting
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


                  <div>
                    <button
                      type="submit"
                      className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {
                        isSubmitting ? "Please Wait..." : " Reset Password"
                      }
                     
                    </button>
                  </div>

                </form>
              )}

            </Formik>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ForgetPassword
