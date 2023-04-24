/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import card from "../../../public/assets/card2.png"

const AdsCards = () => {
  return (
    <div className="bg-white">
       <div className="mx-auto max-w-2xl px-4 sm:mb-6 sm:px-6 lg:max-w-7xl lg:px-8">
       <div className="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
        <div
          className="max-w-2xl mr-10 "
          style={{
            backgroundImage:
              "url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTNG-1Xn9OxtusGaDapGaqOm6nJMZYNTY2cYtdhOO3CwYeyja_I)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "250px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <div
            className="max-w-2xl py-10 px-8 "
            style={{
              height: "100%",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <p className="text-2xl font-bold text-white sm:text-3xl">
              boAt Bassheads 900
            </p>
            <p className="mt-2 max-w-prose mx-auto text-2xl text-slate-400">
              Wired On Ear Headphones with Mic <br /> at Just{" "}
              <span
                className="mt-2 max-w-prose mx-auto text-2xl text-slate-400"
                style={{
                  color: "#03C68B",
                }}
              >
                $39
              </span>
            </p>
            <button
              className="mt-4 max-w-prose mx-auto text-1xl text-white"
              style={{
                backgroundColor: "#03C68B",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div
          style={{
            background: "#58a0e2",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "250px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <div
            className="flex justify-between items-center"
          >
            <div
              className="max-w-2xl py-10 px-8 "
              style={{
                height: "100%",
                width: "100%",
                maxWidth: "300px",
              }}
          >
            <p className="text-2xl text-white sm:text-3xl">
              AirPods{" "}
              <span className="text-2xl font-bold text-white sm:text-3xl">
                Pro
              </span>
            </p>
            <p className="mt-2 max-w-prose mx-auto text-1xl text-slate-100">
              From $3095.00/mo. Per Month <br />
              with EMI, <br /> or <br />{" "}
              <span className="text-1xl font-bold text-white sm:text-1xl">
                MRP $239.00
              </span>
              <br />
              (Incl. of all taxes)
            </p>
            </div>
            <div
            >
              <Image
              src={card}
              alt="card"
              width={200}
                height={10}
                style={{
                  marginTop: '3px',
                  marginLeft: '10px',
                }}
                className=""
            />
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default AdsCards;
