import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ProductsCarousel(props: {
  imageurl: string;
  name: string;
  price: string;
  Discountprice: string;
  description: string;
  images: string[];
  id: string;
  categoryId: string;
  merchantId: string;
}) {

  const productDetails = {
    id: props.id,
    categoryId: props.categoryId,
    merchantId: props.merchantId,
    name: props.name,
    price: props.price,
    Discountprice: props.Discountprice,
    description: props.description,
    images: props.images,
    imageUrl: props.imageurl
  }
  

  const router = useRouter()
  return (
    <>
    <div 
      onClick={() => router.push({
        pathname: `/product/${props.name}`, 
        query: {
          id : props.id,
          merchant: props.merchantId
        }
      })}
    className="card">
      <img
        className="product--image"
        src={props.imageurl}
        alt="product image"
      />
      <h2
        style={{
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#000",
          margin: "2rem 2rem",
          fontFamily: "Poppins",
        }}>
        {props.name}
      </h2>
      <div>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#000",
            margin: "0 2rem",
            fontFamily: "Poppins",
          }}>
          <span>$ {props.price}</span>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#000",
              margin: "0.5rem 10px",
              fontFamily: "Poppins",
              textDecoration: "line-through",
            }}>
            {props.Discountprice}
          </span>
        </p>
      </div>
    </div>
    </>
  )
}
