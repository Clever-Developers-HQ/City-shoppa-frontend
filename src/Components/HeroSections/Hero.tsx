import { useState, useEffect } from 'react';
import ImageSlider from './imageSliderComponent';
import HeroImage1 from "/public/assets/hero.png";
import HeroImage2 from "/public/assets/hero.png";
import HeroImage3 from "/public/assets/hero.png";
import NextLink from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCategoriesAction } from "../../redux/Features/category/getCategoriesSlice";
import router, { useRouter } from 'next/router'



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
  const dispatch = useDispatch<AppDispatch>();
  const [images] = useState<any>([HeroImage1, HeroImage2, HeroImage3]);
  const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);

  const { categories } = useSelector((store: RootState) => store.getCategories);


  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    dispatch (getCategoriesAction("token"))
  }, [])


  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mx-0 md:mx-10">
    <div className="col-span-1 md:col-span-1 pt-2 hidden lg:block bg-[#F1EEEE]">
      {categories?.slice(0,15).map((category: any) => (
        <NextLink href={`/category/${category.name}`} as={`/category/${category.name}`} key={category._id}>

          <p className="text-gray-500 font-medium text-md  px-4 py-1.5 bg-[#F1EEEE] hover:bg-orange hover:text-white rounded-md transition-colors duration-300 leading-none cursor-pointer mb-2">{category.name}</p>
  
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