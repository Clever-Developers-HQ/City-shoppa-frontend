import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import { formatMoney } from "../Utils/utilFuncs";

export default function ProductCard(props: {
  imageUrl: string;
  name: string;
  price: string;
  description: string;
  discountPrice: string;
  images: string;
  id: string
  category_id: string
  merchant_id: string
  brand: string
}) {

  const router = useRouter()
  
  return (
    <div 
    onClick={() => router.push({
      pathname: `/product/${props.name}`, 
      query: {
        id : props.id,
        merchant: props.merchant_id
      }
    })}
    className=" mx-1 cursor-pointer h-[220px] ease-in-out duration-300 drop-shadow-2xl">
      <Image 
        src={props.imageUrl}
        alt={props.name}
        className="product--image"
        width={500}
        height={500}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
        <h2
        className="my-3 py-3"
          style={{
            fontSize: "16px", 
            fontWeight: 500,
            color: "#000",
            fontFamily: "Poppins",
            width: "70%",
            // whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '20ch',
            textAlign: 'center'
          }}>
          {props.name}
        </h2>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#000",
            margin: "0.5rem",
            fontFamily: "Poppins",
          }}>
         ${formatMoney(props.price)}
        </p>
      </div>
    </div>
  );
}
