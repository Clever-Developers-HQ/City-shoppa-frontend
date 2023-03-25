import * as React from 'react'
import brand1 from "/public/assets/brand1.png";
import brand2 from "/public/assets/brand2.png";
import brand3 from "/public/assets/brand3.png";
import brand4 from "/public/assets/brand4.png";
import brand5 from "/public/assets/brand5.png";
import brand6 from "/public/assets/brand6.png";
import Image from 'next/image';
  
  export default function Brands() {
    return (
      <div className="bg-slate-100 mt-10 mb-14">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className=" text-3xl font-extrabold text-slate-900 sm:text-5xl">
             Get Discounts
            </p>
            <p className="mt-5 max-w-prose mx-auto text-2xl text-slate-500">On Your Most Popular Cant Do Without Brands</p>
          </div>
          <div className="mt-12">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <Image
                  src={brand1}
                  alt="hero"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "0.5rem",
                  }}
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <Image
                  src={brand2}
                  alt="hero"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "0.5rem",
                  }}
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <Image
                  src={brand3}
                  alt="hero"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "0.5rem",
                  }}
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <Image
                  src={brand4}
                  alt="hero"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "0.5rem",
                  }}
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <Image
                  src={brand5}
                  alt="hero"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "0.5rem",
                  }}
                />
              </div>
            </div>
          </div>
          </div>
      </div>
    )
  }