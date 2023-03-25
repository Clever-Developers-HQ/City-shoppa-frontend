import { useState } from 'react';
import ImageSlider from './imageSliderComponent';
import HeroImage1 from "/public/assets/hero.png";
import HeroImage2 from "/public/assets/hero.png";
import HeroImage3 from "/public/assets/hero.png";
import NextLink from 'next/link';

const Categories = [
  "Food",
  "Consumer Electronics",
  "Bags & Accessories",
  "Mens Wear",
  "Art & Craft",
  "Furniture",
  "Home & Garden",
  "Health & Beauty",
  "Shoes & Accessories",
  "Home Improvement",
  "Computer & Networking",
  "Toys & Hobbies",
  "Sports & Outdoors",
  "Jewelry & Watches",
];

const style = {
  textStyle: {
    fontSize: "1rem",
    fontWeight: "medium",
    lineHeight: "1.5",
    padding: "0.75rem 1.25rem",
    cursor: "pointer",
    color: "#4b5563",
    transition: "all .3s ease",
    "&:hover": {
      background: "#ff7235",
      color: "#ffffff"
    }
  }
};

function HeroSection() {
  const [images] = useState<any>([HeroImage1, HeroImage2, HeroImage3]);
  const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mx-0 md:mx-10">
    <div className="col-span-1 md:col-span-1 pt-2 hidden lg:block bg-[#F1EEEE]">
      {Categories.map((category, index) => (
        <NextLink href="/categories/products" key={index}>
          <p className="text-gray-500 font-medium text-md  px-4 py-1.5 bg-[#F1EEEE] hover:bg-orange hover:text-white rounded-md transition-colors duration-300 leading-none cursor-pointer mb-2">{category}</p>
        </NextLink>
      ))}
      <NextLink href="categories"> 
      <p className="text-orange-500 font-bold text-lg px-4 py-3 bg-[#F1EEEE] hover:bg-orange hover:text-white rounded-md transition-colors duration-300 leading-none cursor-pointer">All Categories</p>
      </NextLink>
    </div>
    <div className="col-span-1 md:col-span-4 relative">
      <ImageSlider
        images={images}
        currentImageIndex={currentImageIndex}
        nextImage={nextImage}
        previousImage={previousImage}
      />
    </div>
  </div>
  );
}

export default HeroSection;