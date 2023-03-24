/* eslint-disable @next/next/no-img-element */
import React from "react";
import bgImg from "../../../public/assets/reg.png";
import logo from "../../../public/assets/cityshoppa.png";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface IFormValues {
  "First Name": string;
  Age: number;
  "Last Name": string;
  "Business Name": string;
  "Company Name": string;
  Address: string;
  Website: URL;
  Email: string;
  "Phone Number": string;
  Password: number;
  "Confirm Password": number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  // console.log(watch('username'));

  const Input = ({ label, register, required }: InputProps) => (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );

  return (
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
            <h2
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "4rem",
                marginTop: "30px",
                fontWeight: "bold",
                color: "#f85606",
                cursor: "pointer",
                zIndex: "1px",
              }}
              className="logintext"
            >
              Login<span style={{ color: "#fff" }}>in</span>
            </h2>
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
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              color: "#333",
            }}
          >
            Register on Cityshoppa and enjoy the service
          </span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h6 style={{marginBottom: '-0.5rem'}}>Name</h6>
            <input
              type="text"
              {...register("username")}
              {...register("name")}
              placeholder="username"
            />
            <h6 style={{marginBottom: '-0.5rem'}}>Business Name</h6>
            <input
              type="text"
              {...register("businessname")}
              placeholder="Business Name"
            />
             <h6 style={{marginBottom: '-0.5rem'}}>Company Name</h6>
            <input
              type="text"
              {...register("companyname")}
              placeholder="Company Name"
            />
             <h6 style={{marginBottom: '-0.5rem'}}>Address</h6>
            <input type="text" {...register("address")} placeholder="Address" />
            <h6 style={{marginBottom: '-0.5rem'}}>Website</h6>
            <input type="text" {...register("website")} placeholder="URL" />
            <button className="btn">Register</button>
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
  );
}
