import React, { useState } from 'react';
import Image from 'next/image';
import product1 from "/public/assets/1.png";
import product2 from "/public/assets/2.png";
import product3 from "/public/assets/3.png";
import product4 from "/public/assets/4.png";



function ImageSlider() {
    const imgs=[
        { id: 0, value: product1 },
        { id: 1, value: product2 },
        { id: 2, value: product4 },
    ];
    const [wordData,setWordData]=useState(imgs[0]);
  
    const handleClick=(index: number)=>{
      console.log(index)
      const wordSlider=imgs[index];
      setWordData(wordSlider);
    };
  
    return (
              <div className="mains">
                <div className="flex flex-col items-center md:flex-row-reverse md:items-center">
                  <div className="w-full md:w-3/5">
                    <Image src={wordData.value} height={300} width={300} alt={''} /> 
                  </div>
                  <div className="w-full md:w-2/12 flex flex-row justify-start md:flex-col md:justify-start">
                    {imgs.map((data,index)=>
                      <div className="thumbnail" key={index}>
                        <Image
                          className={wordData.id === index ? "clicked" : ""}
                          src={data.value}
                          onClick={() => handleClick(index)}
                          height={70}
                          width={70}
                          alt={''}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
};
  
  export default ImageSlider;
  