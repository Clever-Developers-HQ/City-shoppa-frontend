import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface props{
    images: string[];
    currentImageIndex: number;
    nextImage: () => void;
    previousImage: () => void;
}

function ImageSlider({ images, currentImageIndex, nextImage, previousImage } : props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={images[currentImageIndex]}
        alt="slider"
        className="w-full h-auto"
      />

      {/* Add left arrow */}
      {(isHovering || (currentImageIndex !== 0 && isHovering)) && (
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-white bg-opacity-75 p-3 rounded-full transition-all duration-300 hover:bg-gray-100 focus:outline-none"
          onClick={previousImage}
        >
          <FiChevronLeft className="text-gray-800" />
        </button>
      )}

      {/* Add right arrow */}
      {(isHovering || (currentImageIndex !== images.length - 1 && isHovering)) && (
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 bg-white bg-opacity-75 p-3 rounded-full transition-all duration-300 hover:bg-gray-100 focus:outline-none"
          onClick={nextImage}
        >
          <FiChevronRight className="text-gray-800" />
        </button>
      )}
    </div>
  );
}

export default ImageSlider;
