/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from "react";
import bgImg from "../../../public/assets/reg.png";
import logo from "../../../public/assets/cityshoppa.png";
import { useForm } from "react-hook-form";
import Image from "next/image";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import { userRegisterAction } from "@/redux/Features/user/registerUserSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { showSuccess } from "@/components/Utils/AlertMsg";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";



interface Props {
  username: string;
  password: string;
}

export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false )

  const {loading} = useSelector((state: any) => state.registerUser)


  useEffect(() => {
    // Check if User IAlready Logged In or has a Token Saved in Local Storage
    const token = localStorage.getItem("token")

    if (token) {
      router.push("/")
      return
    }

    setIsLoggedIn(true)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) =>{
    const {name, phone, email, password} = data

    dispatch(userRegisterAction({email, phone, password, name, token: ""}))
    .then(unwrapResult)
    .then((result) => {
      if (result.user) {
        showSuccess(`Welcome to city shoppa. Please login to continue`)
        router.push("/login")
      }
    })
  }


  return (
    <>
    {
      isLoggedIn === false ? <Loader/> : (
        <>
        <NavBar />
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: '100vh',
            width: "100vw",
            backgroundColor: "#f5f5f5",
          }}>
          <div className="register">
            <div className="col-2">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}>
                <Image src={bgImg} alt="bg" />
                <h2
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "#f85606",
                    cursor: "pointer",
                    zIndex: "1px",
                  }}
                  className="logintext">
                  Sign<span style={{ color: "#fff" }}>Up</span>
                </h2>
                <Image
                  src={logo}
                  alt="logo"
                  style={{
                    position: "absolute",
                    bottom: "11rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: " 70px",
                    cursor: "pointer",
                    width: " 16rem",
                    zIndex: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="col-1">
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#333",
                  paddingBottom: "5px",
                }}>
                Sign Up
              </h2>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#333",
                }}>
                Welcome to Cityshoppa and enjoy the service
              </span>
  
              <form
                id="form"
                className="flex flex-col"
                onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name", { required: true})} placeholder="Name" />
                {errors.name && <p className="text-orange">Name is Required</p>}
              
              
                <input type="text" {...register("email",
                 { required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
  }})} placeholder="Email" />
                {errors.email && <p className="text-orange">Valid email is Required</p>}
              
                <input
                  type="number"
                  {...register("phone", { required: true })}
                  placeholder="Phone"
                />
   {errors.phone && <p className="text-orange">Phone Number is Required</p>}
  
                <input
                  type="text"
                  {...register("password", { required: true })} 
                  placeholder="Password"
                />
  {errors.password && <p className="text-orange">Password is Required</p>}
  
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "-0.5rem",
                  }}>
                  <h6
                  className="text-orange flex flex-end cursor-pointer font-bold">
                    Forget password?
                  </h6>
                </div>
                {loading && <Loader />}
                <button className="btn font-bold">{loading ? "Please Wait" : "Sign Up"}</button>
              </form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "1rem",
                  }}>
                  <span>--------------------</span>
                  <h6>OR</h6>
                  <span>--------------------</span>
                </div>
               
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#333",
                    cursor: "pointer",
                    marginTop: "1rem",
                  }}>
                  Already have a account on CityShoppa ? Login
                </h4>
                <Link href="/login">
                <button className="font-bold"
                  style={{
                    backgroundColor: "#f85606",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    marginTop: "1rem",
                    cursor: "pointer",
                  }}>
                  Login
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
      )
    }

  );

  </>
)}

const styles = {
  imageContainer: {
    position: "relative",
    width: "100%",
    height: " 100%",
  },

  loginText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#f85606",
    cursor: "pointer",
    zIndex: "1px",
  },

  logo: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: " 70px",
    cursor: "pointer",
    width: " 13rem",
    zIndex: "50px",
  },

  /*  .heading {
            font-size: 2rem;
            font-weight: 600;
            color: #333;
          }
          
          .subheading {
            font-size: 1rem;
            font-weight: 400;
            color: #333;
          } */
};
