/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import { loginAction } from "@/redux/Features/auth/authLoginSlice";
import { showError, showSuccess } from "@/components/Utils/AlertMsg";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import router, { useRouter } from 'next/router'
import axios from 'axios'
import API_BASEURL  from "constants";
import Loader from "@/components/loader/Loader";
import NextLink from 'next/link';


export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const {isAuthenticated, user, message, error} = useSelector((state: any) => state.authUser)
  
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/")
      return
    }

    setIsLoggedIn(true)

  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)

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
          setIsSubmitting(false)
          router.push("/disabled")
          return
        }



        localStorage.setItem("user", JSON.stringify(response.data.user))
        const token = response.data.user.token
        localStorage.setItem("token",token)
        sessionStorage.setItem('token', token);

        setIsSubmitting(false)

        if (response.data.user?.role === 'admin') {
          router.push("/admin")
        }
  
        if (response.data.user?.role === 'user') {
          router.push("/")
        }
  
        if (response.data.user?.role === 'merchant') {
          router.push("/merchant")
        }
      }
    }).catch (err => {
        showError("Invalid Login Credentials")
        setIsSubmitting(false)
    })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
    {
      !isLoggedIn ? <Loader /> : (
        <>
        <NavBar />
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md rounded-[42px] shadow-[0_35px_130px_-65px_rgb(248,86,6)] p-10 bg-white">
                <div
                    className="flex flex-col justify-center items-center"
                >
                     <h2 className="text-4xl">Welcome</h2>
                     <h2 className="text-2xl mb-8">Sign In To Your Account</h2>
                </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="appearance-none border border-secondary rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                required
              />
            </div>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="appearance-none border border-secondary rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-4 mb-8">
                {showPassword ? (
                  <EyeOffIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <EyeIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
              <div className="mt-2">
                <NextLink href="/forget-password" className="text-sm font-bold text-blue-500 hover:text-blue-700">
                  Forgot password?
                </NextLink>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
  
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                style={{
                  backgroundColor: "#f85606",
                }}
              >
                {isSubmitting? "Please wait..." : "Sign In"}
              </button>
      
              <div className="ml-4">
                <Link href="/signup">
                <span className="text-gray-600">Don't have an account?</span>
                            <div className="text-blue-500 hover:text-blue-700 ml-2"
                                style={{
                                    color: '#f85606',
                                  }}
                            >
                  Sign up
                </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
      )
    }
    </>
  )
  }