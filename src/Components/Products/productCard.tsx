import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router'

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
    className="cards">
      <Image 
        src={props.imageUrl}
        alt={props.name}
        // placeholder="blur"
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
        className="my-3"
          style={{
            // fontSize: "1.1rem",
            fontWeight: 500,
            color: "#000",
            // margin: "1rem 0.5rem",
            fontFamily: "Poppins",
            width: "70%"
          }}>
          {props.name}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#000",
            margin: "0.5rem",
            // marginLeft: "1rem",
            fontFamily: "Poppins",
          }}>
         $ {props.price} 
        </p>
      </div>
    </div>
  );
}
