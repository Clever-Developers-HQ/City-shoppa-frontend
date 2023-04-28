import React, {useEffect, useState} from 'react'
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import { useDispatch, useSelector } from 'react-redux'
import { Formik, ErrorMessage } from 'formik';
import PasswordField from '@/components/inputs/passwordInput';
import * as Yup from 'yup';
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "@/components/loader/Loader";
import { AppDispatch } from '@/redux/store';
import { forgetPasswordAction } from '@/redux/Features/auth/authForgetPasswordSlice';
import {useRouter} from 'next/router';
import {resetPassword} from '@/redux/Features/auth/authService';
import {resetPasswordAction} from '@/redux/Features/auth/authResetPasswordSlice';



function ForgetPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const{id, token} = router.query
  
  const [resetting, setResetting] = useState(false)

  console.log(id, token, "THE ID AND TOKEN")

  const {loading} = useSelector(
    (state: any) => state.resetPassword
  );

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/')
    }
  }, [router]);


  return (
    <>
      <NavBar />
      <div className="min-h-full flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <Formik
              initialValues={{ password: "", password_2: "" }}
              validationSchema={Yup.object({
                password: Yup.string().required('Passowrd is Required'), 

                  password_2: Yup.string().required('Confirm Password is Required')
                  .oneOf([Yup.ref('password'), ""], 'Passwords must match')
              })}

              
              onSubmit={async (values: any, { setSubmitting }) => {
                const newPassword = values.password

                if (!token || !id) {
                  showError("Invalid Password Reset Token")
                  window.location.href = '/forget-password';

                  return
                }

                await dispatch(resetPasswordAction({newPassword, id, token}))
                .then(unwrapResult)
                .then((res: any) => {
                  if (res) {
                    showSuccess("Password Updated Successfully")
                    router.push('/login')
                  } else {
                    router.push('/reset-password')
                  }

                  
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

                  <PasswordField
                    name="password"
                    id="password"
                    label="New Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <PasswordField
                    name="password_2"
                    id="password_2"
                    label="Confirm New Password"
                    value={values.password_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div>
                    <button
                      type="submit"
                      className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {
                        loading ? "Please Wait..." : "Update Password"
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
