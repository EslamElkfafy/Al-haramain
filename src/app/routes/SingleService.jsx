import axiosInstance from "@/axiosInstance";
import { Gallery } from "@/components/ui/gallery";
import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridSystem } from "@/shared/components/gridSystem";
import { appointment, breakpoints, heroInfo } from "@/constants/singleServiceConstants";
import { Hero } from "@/components/ui/heroes";
import ArrowAppointmentEnglishIcon from "@/assets/arrow-appointment-right.svg";
import ArrowAppointmentArabicIcon from "@/assets/arrow-appointment-left.svg";
import VectorLeftIcon from "@/assets/vector-left-service.svg";
import VectorRightIcon from "@/assets/vector-right-service.svg";

export const SingleServiceRoute = () => {
  const { serviceId } = useParams();
  const [data, setData] = useState(null);
  const { language, checkLanguage } = useLanguage();
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance(`service/${serviceId}`);
        setData(response.data.doc);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [serviceId]);
  const ComponentOfServiceDisplay = ({ _id, name }) => (
    <div className="h-[14.375rem] w-[16.8125rem] flex flex-col justify-between border-t-[rgba(229,54,52,0.82)] border-t-8 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.14)] p-6">
      <div>
        <p className="text-lg font-light">
          {checkLanguage("Explore Service", "استكشاف الخدمة")}
        </p>
        <p className="text-2xl font-bold">{name[language]}</p>
      </div>

      <button
        className="w-fit flex justify-center items-center gap-5"
        onClick={() => router(`/service/${_id}`)}
      >
        <p className="text-base font-black">
          {checkLanguage("Read", "اقرأ اكثر")}{" "}
        </p>
        {checkLanguage(<VectorRightIcon />, <VectorLeftIcon />)}
      </button>
    </div>
  );
  const ComponentOfServiceLoading = () => (
    <div className="h-[14.375rem] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse"></div>
  );
  return (
    <>
      <Hero
        urlImg={data?.images[0].url}
        textHeader={heroInfo.title[language]}
        textDescription={heroInfo.description[language]}
      />
      <div className="py-24 px-32 w-max-854:px-10">
        <div className="flex flex-col gap-20">
          <Gallery
            listOfImages={data?.images}
            numOfImages={3}
            sizeOfImages={"22.625rem"}
          />
          <div className="flex justify-between gap-20">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8">
                {data?.name[language]}
              </h2>
              {data?.description[language]
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className={`${index === 0 ? "" : "mt-5"}`}>
                    {paragraph}
                  </p>
                ))}
            </div>
            <div className="flex flex-col p-10 bg-[#E53634] text-white h-[30.625rem] w-[25rem] justify-between w-max-1290:hidden">
              <div className="flex flex-col gap-6">
                <h3 className="text-4xl font-bold">
                  {appointment[language].title}
                </h3>
                <p className="text-lg font-bold">
                  {appointment[language].description}
                </p>
              </div>
              <button className="bg-white w-12 h-12 flex justify-center items-center" onClick={() => router("/about", {
                state: {
                  sectionId: "quote",
                },
              })}>
                {checkLanguage(
                  <ArrowAppointmentEnglishIcon />,
                  <ArrowAppointmentArabicIcon />
                )}
              </button>
            </div>
          </div>
          <h2 className="text-4xl font-bold w-max-854:text-center">
            {checkLanguage("Other Services", "خدمات أخرى")}
          </h2>
          <GridSystem
            breakpoints={breakpoints}
            numOfRows={1}
            ComponentDisplay={ComponentOfServiceDisplay}
            ComponentLoading={ComponentOfServiceLoading}
            classNameOfGrid={"grid-cols-[repeat(auto-fit,16.8125rem)] gap-5"}
            endPoint={"service"}
          />
        </div>
      </div>
    </>
  );
};
