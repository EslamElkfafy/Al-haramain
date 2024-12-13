import { useLanguage } from "@/context/LanguageContext";
import React from "react";

export const Hero = ({ urlImg, textHeader, textDescription, numbers }) => {
  const { checkLanguage } = useLanguage();
  return (
    <header
      className={`h-[25.875rem] p-20 flex flex-col relative justify-center text-white bg-no-repeat bg-cover bg-center`}
      style={{ backgroundImage: `url(${urlImg})` }}
    >
      <h1 className="text-7xl font-semibold mb-4">{textHeader}</h1>
      <p className="text-base font-bold">{textDescription}</p>
      <div
        className={`p-9 w-max-854:p-5 flex text-black flex-col absolute bg-white border-t-8 border-t-solid border-t-[#E53634] w-max-400:right-2 right-16 bottom-0 translate-y-1/2 shadow-[0px_0px_35px_0px_rgba(0,0,0,0.14)] ${
          !numbers ? "hidden" : ""
        }`}
      >
        <p className=" text-sm font-normal">{checkLanguage("Call Us Today", "اتصل بنا الأن")}</p>
        <p className=" text-4xl font-semibold w-max-854:text-3xl" dir="ltr">010 0315 4358 - 010 3386 8319</p>
      </div>
    </header>
  );
};
