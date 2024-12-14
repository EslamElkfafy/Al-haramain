import React, { useState, useEffect } from "react";
import VectorLeft from "@/assets/vector-left.svg";
import VectorRight from "@/assets/vector-right.svg";
import { useLanguage } from "@/context/LanguageContext";

export const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, checkLanguage } = useLanguage();

  // Function to navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatically change the slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // 10000ms = 10 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);
  console.log(images);
  return (
    <div
      className="relative w-full mx-auto overflow-hidden h-[42.3125rem] "
      style={{
        background: checkLanguage(
          `linear-gradient(270deg, rgba(255, 255, 255, 0.00) 7.21%, rgba(255, 255, 255, 0.90) 76.35%), url(${images[currentIndex].url}) lightgray 50% / cover no-repeat`,
          `linear-gradient(90deg, rgba(255, 255, 255, 0.00) 7.21%, rgba(255, 255, 255, 0.90) 76.35%), url(${images[currentIndex].url}) lightgray 50% / cover no-repeat`
        ),
      }}
    >
      {/* <img
        src={images[currentIndex].url}
        className="w-full h-full object-cover object-center"
        alt="Slider Image"
      /> */}
      <h1
        className={`absolute  ${checkLanguage(
          "left-16",
          "right-16"
        )} top-1/2 -translate-y-1/2 text-6xl font-semibold break-words w-max-854:text-center`}
      >
        {images[currentIndex].title[language]}
      </h1>
      <div
        className={`absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 ${checkLanguage(
          "",
          "flex-row-reverse"
        )}`}
      >
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="bg-black bg-opacity-50 text-white border-none p-2 cursor-pointer text-lg"
        >
          <VectorLeft />
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          className="bg-black bg-opacity-50 text-white border-none p-2 cursor-pointer text-lg"
        >
          <VectorRight />
        </button>
      </div>
    </div>
  );
};
