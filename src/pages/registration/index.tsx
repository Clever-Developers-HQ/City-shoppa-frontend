/* eslint-disable @next/next/no-img-element */
import React from "react";
import bgImg from "../../../public/assets/reg.png";
import logo from "../../../public/assets/cityshoppa.png";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface props {
  username: string;
    password: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  // console.log(watch('username'));
    
 

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div className="register">
        <div className="col-2">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                        height: '100%'
                  }}>
                  <Image src={bgImg} alt="bg" />
                  <h2
            style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '4rem',
                fontWeight: 'bold',
                color: '#f85606',
                cursor: 'pointer',
                zIndex: '1px'
            }}
            className="logintext"
          >
            Login<span style={{ color: "#fff" }}>in</span>
                  </h2>
                  <Image src={logo} alt="logo" style={{
                  position: 'absolute',
                  bottom: '11rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop:' 70px',
                  cursor: 'pointer',
                  width:' 16rem',
                          zIndex: '50px',
                  objectFit: 'contain',
              }}/>
                </div>
        </div>
        <div className="col-1">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Sign Up
          </h2>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 400,
              color: "#333",
            }}
          >
            Welcome to Cityshoppa and enjoy the service
          </span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="username"
            />
            <input
              type="text"
              {...register("password")}
              placeholder="password"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "-0.5rem",
              }}
            >
              <h6>{errors.password && <span>This field is required</span>}</h6>
              <h6
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#333",
                  cursor: "pointer",
                }}
              >
                Forget password?
              </h6>
            </div>
            <button className="btn">Login</button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "1rem",
              }}
            >
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
              }}
            >
              New ? Create an account
            </h4>
            <button
              style={{
                backgroundColor: "#f85606",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                marginTop: "1rem",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


   const styles = {
        imageContainer:{
            position: 'relative',
            width: '100%',
            height:' 100%'
          },
          
          loginText: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#f85606',
            cursor: 'pointer',
            zIndex: '1px'
          },
          
          logo: {
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop:' 70px',
            cursor: 'pointer',
            width:' 13rem',
            zIndex: '50px'
          }
          
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
    }