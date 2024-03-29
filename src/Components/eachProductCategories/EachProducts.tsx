
import React from "react";



export default function EachProducts(props: {
    imageurl: string
    name: string
    price: string
    description: string
}) {
  return (
    <div className="cards">
      <img className="product--image" src={props.imageurl} alt="product image" />
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
          }}>
          <h2 style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: '#000',
                margin: '1rem 0.5rem',
              fontFamily: 'Poppins',
      }}>{props.name}</h2>
              <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#000',
                  marginRight: '0.5rem',
                  marginLeft: '1rem',
                  fontFamily: 'Poppins',
      }}>{props.price}</p>
         </div>
    </div>
  );
}
