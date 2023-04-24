import React, { useState } from 'react';
import Image from 'next/image';

interface ImageSliderDTO{
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
}


function ImageSlider( {mainImage, image1, image2, image3}: ImageSliderDTO ) {
    const imgs=[
        { id: 0, value: mainImage },
        { id: 1, value: image1 },
        { id: 2, value: image2 },
        { id: 3, value: image3 },
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
                    <Image src={wordData?.value} height={300} width={300} alt={''} /> 
                  </div>
                  <div className="w-full md:w-2/12 flex flex-row justify-start md:flex-col md:justify-start">
                  {imgs
            .filter((img) => img.value !== "")
            .map((data, index) => (
              <div className="thumbnail" key={index}>
                <Image
                  className={wordData.id === index ? 'clicked' : ''}
                  src={data.value}
                  onClick={() => handleClick(index)}
                  height={70}
                  width={70}
                  alt={''}
                />
              </div>
            ))}
                  </div>
                </div>
              </div>
            );
};
  
  export default ImageSlider;
  