import { useState } from 'react';
import ImageSlider from './ImageSlider';
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div className="col-span-1 md:col-span-1 mt-4 hidden md:block">
      {Categories.map((category, index) => (
        <NextLink href="/categories" key={index}>
          <p className="text-gray-500 font-medium text-lg px-4 py-2 bg-white hover:bg-gray-100 rounded-md transition-colors duration-300 leading-none cursor-pointer mb-2">{category}</p>
        </NextLink>
      ))}
      <p className="text-orange-500 font-bold text-lg px-4 py-3 bg-white hover:bg-gray-100 rounded-md transition-colors duration-300 leading-none cursor-pointer">All Categories</p>
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







import HeroImage from "/public/assets/hero.png";