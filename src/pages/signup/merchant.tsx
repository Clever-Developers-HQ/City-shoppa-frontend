/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from "react";
import bgImg from "../../../public/assets/reg.png";
import logo from "../../../public/assets/cityshoppa.png";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { showError, showSuccess } from "@/components/Utils/AlertMsg";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import { merchantRegisterAction } from '@/redux/Features/merchant/registerMerchantSlice';
import { userAuthenticateToken } from '@/components/Utils/TokenAuthentication';
import API_BASEURL from 'constants';
import axios from "axios";

interface IFormValues {
  business_name: string;
  address: string;
  website: URL;
  name: string;
  email: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};



export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [token, setToken] = useState<any>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {

    const {name, email, business_name, website, address} = data

    await dispatch(merchantRegisterAction({name, email, business_name, website, address, token}))
    .then(unwrapResult)
    .then((result) => {
      if (result.merchant) {
        showSuccess(`Merchant Account Created Successflly`)
        router.push("/merchant")
      } 
    })
  }

  const Input = ({ label, register, required }: InputProps) => (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );

  const {loading} = useSelector((state: any) => state.registerMerchant)


  useEffect(() => {
    setToken(userAuthenticateToken()?.token)

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : {};
    if (user) {
        reset({
          name: user?.name,
          email: user?.email
        });
    }
  }, [reset])
  return (
    <>
    <NavBar/>
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="register">
        <div className="col-2">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image src={bgImg} alt="bg" />
            <h3
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                marginTop: "30px",
                fontWeight: "bold",
                color: "#f85606",
                cursor: "pointer",
                zIndex: "1px",
                textAlign: 'center'
              }}
              className="logintext md:block hidden"
            >
              Become A <span style={{ color: "#fff" }}>Merchant</span>
            </h3>
            <Image
              src={logo}
              alt="logo"
              style={{
                position: "absolute",
                bottom: "15rem",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: " 60px",
                cursor: "pointer",
                width: " 16rem",
                zIndex: "50px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="col-1">

          <form
          method="POST"
            id="form"
            className="flex flex-col w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h6 style={{marginBottom: '-0.5rem'}}>Name</h6>

            <input
            disabled
              type="text"
              {...register("name", { required: true })}
              className="bg-accent font-bold"
              placeholder="username"/>


            <h6 style={{marginBottom: '-0.5rem'}}>Business Name</h6>
            <input
              type="text"
              {...register("business_name", { required: true })}
              placeholder="Business Name"
            />
   {errors.business_name && <p className="text-orange">Business Name is Required</p>}

            
             <h6 style={{marginBottom: '-0.5rem'}}>Address</h6>
            <input type="text" {...register("address", { required: true })} placeholder="Address" />
            {errors.address && <p className="text-orange">Address is Required</p>}


            <h6 style={{marginBottom: '-0.5rem'}}>Website</h6>
            <input type="text" {...register("website", { required: true })} placeholder="URL" />
            {errors.website && <p className="text-orange">Website is Required</p>}
            
            <button className="btn">{loading ? "Processing... Please wait" : "Register"}</button>
            {
              loading && <Loader/>
            }
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          ></div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}
