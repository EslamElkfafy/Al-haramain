import { Hero } from "@/components/ui/heroes";
import React from "react";
import HeroServicesImg from "@/assets/hero-services-img.jpg";
import { servicesInfo } from "@/constants/servicesConstants";
import { useLanguage } from "@/context/LanguageContext";
import { GridSystem } from "@/shared/components/gridSystem";
import { Button } from "@/components/ui/button";
import LongArrowRight from "@/assets/long-arrow-right.png";
import LongArrowLeft from "@/assets/long-arrow-left.png";
import { useNavigate } from "react-router-dom";

export const ServicesRoute = () => {
  const { language, checkLanguage } = useLanguage();
  const router = useNavigate();
  const ComponentOfServiceDisplay = ({
    _id,
    name,
    description,
    images,
    myIndexInSlice,
  }) => (
    <div
      className={`w-full h-[27.0625rem] flex w-max-1020:flex-col w-max-1020:h-auto ${checkLanguage(
        `${myIndexInSlice % 2 !== 0 ? "flex-row-reverse" : ""}`,
        `${myIndexInSlice % 2 === 0 ? "flex-row-reverse" : ""}`
      )}`}
    >
      <div className="flex-1">
        <img className="h-full w-full object-cover w-max-1020:h-72" src={images[0]?.url} alt="" />
      </div>
      <div className="flex flex-1 p-12 flex-col justify-between bg-[#E53634] text-white w-max-854:p-6">
        <div>
          <h2 className="text-4xl font-bold">{name[language]}</h2>
          <p className="text-base font-normal h-32 overflow-hidden">{description[language]}</p>
        </div>

        <Button
          intent={"outline"}
          classsName={"w-[15rem]"}
          onClick={() => router(`/service/${_id}`)}
        >
          {checkLanguage("Learn more", "اﻗﺮأ أﻛﺜﺮ")}{" "}
          <img
            src={checkLanguage(LongArrowRight, LongArrowLeft)}
            alt={checkLanguage("arrow", "سهم")}
          />
        </Button>
      </div>
    </div>
  );
  const ComponentOfServiceLoading = () => (
    <div className="h-[27.0625rem] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse"></div>
  );
  return (
    <>
      <Hero
        urlImg={HeroServicesImg}
        textHeader={servicesInfo.title[language]}
        textDescription={servicesInfo.description[language]}
        numbers={true}
      />
      <div className="p-36 !pt-56 w-max-854:p-10 w-max-854:!pt-36">
        <GridSystem
          numOfRows={3}
          ComponentDisplay={ComponentOfServiceDisplay}
          ComponentLoading={ComponentOfServiceLoading}
          classNameOfGrid={"grid-cols-1 gap-5"}
          endPoint={"service"}
        />
      </div>
    </>
  );
};
