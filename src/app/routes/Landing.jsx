import { HeroLanding } from "@/components/ui/heroes";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  aboutInfo,
  breakpoints,
  consultationInfo,
  detailsInfo,
  experinceInfo,
  features,
  infoCards,
  requestInfo,
  services,
} from "@/constants/landingConstants";
import AboutImg from "@/assets/about-img.png";
import { useLanguage } from "@/context/LanguageContext";
import { GridSystem } from "@/shared/components/gridSystem";
import { ContactLink } from "@/components/ui/contactLink";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import axiosInstance from "@/axiosInstance";

export const LandingRoute = () => {
  const headSeactionClass = "font-bold text-4xl text-center";
  const { language, checkLanguage } = useLanguage();
  const router = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const { sectionId } = state || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dataService, setDataService] = useState([]);
  const quoteRef = useRef(null);
  if (sectionId === "quote") {
    quoteRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("service");
        setDataService(
          response.data.docs.map((doc) => ({ name: doc.name.en, _id: doc._id }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelect = (item) => {
    setFormData((prev) => ({ ...prev, service: item._id }));
  };
  const handleSubmit = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );

    if (emptyFields.length > 0) {
      setErrors(["All fields are required."]);
      return;
    }
    setLoading(true);
    setErrors(null);
    setSuccessMessage(null);
    try {
      await axiosInstance.post("quotation", formData);
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
        service: "",
      });
    } catch (error) {
      setErrors(
        error.response?.data?.errors
          ? error.response?.data?.errors.map((error) => error.msg)
          : [error.response?.data?.message]
      );
    } finally {
      setLoading(false);
    }
  };
  const renderFeatures = () =>
    features.map(({ title, description, Icon }, index) => (
      <div
        key={index}
        className="flex flex-col gap-5 w-[18.25rem] p-5 pb-10 border-[1.4px] border-[#E0E3EB] rounded text-center items-center"
      >
        <Icon />
        <h3 className="text-xl font-bold text-[#3D445C]">{title[language]}</h3>
        <p className="font-normal text-[#858EAD]">{description[language]}</p>
      </div>
    ));

  const renderServices = () =>
    services.map(({ Icon, text }, index) => (
      <div
        key={index}
        className={`p-5 pb-10 flex flex-col gap-5 items-center w-[16.9375rem] ${
          index % 2 === 0 ? "bg-white" : "bg-[#E53634]"
        }`}
      >
        <Icon />
        <hr
          className={`w-[3.75rem] h-[0.125rem] ${
            index % 2 === 0 ? "bg-white" : "bg-[#E0E3EB]"
          }`}
        />
        <p
          className={`font-semibold text-xl ${
            index % 2 === 0 ? "text-[#E53634]" : "text-white"
          }`}
        >
          {text[language]}
        </p>
      </div>
    ));

  const renderInfoCards = () =>
    infoCards.map(
      ({ urlImg, text, number, positionClass, positionIconClass }, index) => (
        <div
          key={index}
          dir="ltr"
          className={`absolute w-max-854:static w-max-854:z-0 p-[1.875rem] w-[19.90625rem] bg-white shadow-[0px_12px_16px_-4px_rgba(17,24,39,0.10),0px_4px_6px_-2px_rgba(17,24,39,0.05)] ${positionClass} ${
            index % 2 === 0 ? "z-10" : ""
          }`}
        >
          <div className="relative">
            <img
              src={urlImg}
              alt={text}
              className={`absolute ${positionIconClass}`}
            />
            <h3 className="text-7xl font-semibold text-[#292E3D]">{number}</h3>
            <p className="font-normal text-[#667299] flex items-center">
              <span className="inline-block w-2 h-7 bg-[#F9995D] mx-4"></span>
              {text[language]}
            </p>
          </div>
        </div>
      )
    );
  const ComponentOfProjectDisplay = ({
    _id,
    images,
    name,
    address,
    listOfDate,
    myIndexInList,
  }) => {
    const router = useNavigate();
    return (
      <div
        className="h-[20.6875rem] cursor-pointer"
        onClick={() =>
          router(`project/${_id}`, {
            state: { listOfProjects: listOfDate, myIndexInList },
          })
        }
      >
        <img
          src={images[0]?.url || ""}
          className="h-[15.4375rem] w-full object-cover"
          alt="project"
        />
        <div className="flex flex-col gap-3 p-3 bg-[#E53634]">
          <h3 className="text-xl font-bold text-white">{name[language]}</h3>
          <p className="text-lg font-normal text-white">{address[language]}</p>
        </div>
      </div>
    );
  };
  const ComponentOfProjectLoading = () => (
    <div className="h-[20.6875rem]">
      <div className="h-[14.4375rem] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse"></div>
      <div className="flex flex-col p-3">
        <h2 className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md bg-[length:200%_100%] animate-pulse"></h2>
        <p className="mt-4 h-8 w-4/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md bg-[length:200%_100%] animate-pulse"></p>
      </div>
    </div>
  );
  return (
    <>
      <HeroLanding />
      {/* Feature Section */}
      {/* <div className="p-7  mt-24">
        <h2 className={`${headSeactionClass} mb-12`}>
          {checkLanguage("Our Reputation", "مزايانا")}
        </h2>
        <div className="flex justify-center items-center gap-[4.5rem] w-max-854:flex-col">
          {renderFeatures()}
        </div>
      </div> */}
      {/* About Section */}
      <div className="py-24 px-5">
        <div
          className={`flex items-center w-max-854:p-0 ${checkLanguage(
            "pr-[15.25rem]",
            "pl-[15.25rem]"
          )} justify-center`}
        >
          <div className="relative w-max-854:flex w-max-854:flex-col w-max-854:mx-auto">
            <img src={AboutImg} alt="" />
            <div
              className={`absolute w-max-854:static w-max-854:translate-x-0 w-max-854:translate-y-0 w-max-854:w-full w-max-854:items-center w-max-854:text-center flex flex-col justify-between h-[32.6875rem] w-[30.5rem] py-[3.125rem] px-[2.5rem] bg-[#E53634] text-white ${checkLanguage(
                "right-0 translate-x-1/2",
                "left-0 -translate-x-1/2"
              )} top-1/2 -translate-y-1/2`}
            >
              <div className="flex flex-col gap-[23px]">
                <h2 className="font-semibold text-5xl">
                  {aboutInfo.title[language]}
                </h2>
                {aboutInfo.description[language].map((paraghrap, index) => (
                  <p key={index} className="text-lg font-normal">
                    {paraghrap}
                  </p>
                ))}
              </div>
              <a href="/pdf.pdf">
                <Button intent={"white"} classsName={"w-fit p-4 font-semibold"}>
                  {aboutInfo.textButton[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      {/* <div className="bg-[#F6F8F7] pt-[2.75rem] pb-[4.75rem]">
        <h2 className={`${headSeactionClass} mb-12`}>
          {checkLanguage("Services", "خدمات")}
        </h2>
        <div className="w-[1008px] w-max-1020:w-[16.9375rem] mx-auto">
          <div
            className={`grid grid-cols-3 gap-24 place-items-center w-max-1290:grid-cols-2 w-max-1020:grid-cols-1 `}
          >
            {renderServices()}
          </div>
        </div>
      </div> */}
      {/* Contact Section */}
      <div
        className={`flex justify-center items-center gap-36 p-28 w-max-1290:flex-col ${checkLanguage(
          "",
          "flex-row-reverse"
        )}`}
      >
        <div className="w-[36.0625rem] h-[32.5rem] w-max-854:w-auto relative w-max-854:flex w-max-854:flex-col w-max-854:h-auto w-max-854:items-center w-max-854:gap-6">
          {renderInfoCards()}
        </div>
        <div className="w-[22.4375rem] flex flex-col gap-10 w-max-1290:items-center w-max-1290:text-center">
          <h2 className="text-[#E53634] text-6xl font-bold">
            {experinceInfo.title[language]}
          </h2>
          <p className="font-normal text-xl text-[#525B7A]">
            {experinceInfo.description[language]}
          </p>
          <Button classsName={"w-44"} onClick={() => router("contact")}>
            {experinceInfo.textButton[language]}
          </Button>
        </div>
      </div>
      {/* Consultation Section */}
      <div
        className={`bg-[url("@/assets/consultation-img.png")] p-24 w-max-854:p-9`}
      >
        <div className="flex justify-between items-center w-max-854:flex-col w-max-854:text-center w-max-854:items-center w-max-854:gap-6">
          <div className="flex flex-col gap-10 text-white">
            <h3 className="text-4xl font-bold">
              {consultationInfo.title[language]}
            </h3>
            <p className="text-2xl font-normal">
              {consultationInfo.description[language]}
              <span className={`underline`} dir="ltr">+20 1003 154358</span>
            </p>
          </div>
          <Button intent={"outline"}>
            <ContactLink
              type={"phone"}
              value={"+20 1003 154358"}
              label={consultationInfo.textButton[language]}
            />
          </Button>
        </div>
      </div>
      {/* Projects section */}
      <div className="p-24 w-max-854:p-5">
        <h2 className="font-bold text-4xl mb-10">
          {checkLanguage("Projects", "المشاريع")}
        </h2>
        <div className="flex w-max-854:flex-col w-max-854:gap-6">
          <div className="flex flex-col mr-64 w-max-854:m-0 gap-5">
            <div
              className={`flex items-center ${checkLanguage(
                "",
                "flex-row-reverse"
              )}`}
            >
              <div className="w-1 h-7 bg-[#E53634] mr-4"></div>
              <p className="text-[#E53634] font-bold text-2xl">
                {checkLanguage("All", "الجميع")}
              </p>
            </div>
            {/* <div className="flex items-center">
              <div className="w-1 h-7 bg-[#E53634] mr-4"></div>
              <p>Commercial</p>
            </div>
            <div className="flex items-center">
              <div className="w-1 h-7 bg-[#E53634] mr-4"></div>
              <p>Residential</p>
            </div>
            <div className="flex items-center">
              <div className="w-1 h-7 bg-[#E53634] mr-4"></div>
              <p>Other</p>
            </div> */}
          </div>
          <GridSystem
            breakpoints={breakpoints}
            numOfRows={2}
            ComponentDisplay={ComponentOfProjectDisplay}
            ComponentLoading={ComponentOfProjectLoading}
            classNameOfGrid={"grid-cols-[repeat(auto-fit,24rem)] gap-8"}
            endPoint={"project"}
          />
        </div>
      </div>
      <div
        ref={quoteRef}
        className="flex gap-32 justify-center items-center p-14 !pt-24"
      >
        {/* Form */}
        <div className="w-[37.5rem] p-2 w-max-854:text-center">
          <h5 className="text-[#E53634] text-sm font-medium mb-1">
            {requestInfo.title1[language]}
          </h5>
          <h3 className="text-[#00215B] text-6xl font-semibold mb-7">
            {requestInfo.title2[language]}
          </h3>
          <div className="flex flex-col gap-9 w-max-400:gap-2">
            <div className="flex gap-2 w-max-400:flex-col">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={requestInfo.form.fullName[language]}
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={requestInfo.form.email[language]}
              />
            </div>
            <div className="flex gap-2 w-max-400:flex-col">
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={requestInfo.form.phoneNumber[language]}
              />
              {/* <select
                name="service"
                value={formData.service}
                onChange={(e) => {
                  setSize(1);
                  handleInputChange(e);
                }}
                size={size}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="px-5 py-2 flex-1 outline-none border border-[rgba(0,0,0,0.25)]"
              >
                <option value="" disabled selected>
                  {requestInfo.form.service[language]}
                </option>
                {dataService?.map(({ _id, name }) => (
                  <option key={_id} value={name[language]}>
                    {name[language].toUpperCase()}
                  </option>
                ))}
              </select> */}
              <Select
                options={dataService}
                onSelect={handleSelect}
                placeHolder={
                  <p className="text-[rgba(0,0,0,0.50)] text-base font-normal">
                    {requestInfo.form.service[language]}
                  </p>
                }
                className={
                  "px-5 py-2 flex-1 outline-none border border-[rgba(0,0,0,0.25)] flex"
                }
                dropdownClass={"h-72 overflow-y-auto"}
                controller={formData?.service}
              />
              {/* <Input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                placeholder={requestInfo.form.service[language]}
              /> */}
            </div>
            <textarea
              className="p-5 border border-[rgba(0,0,0,0.25)] h-[10rem] outline-none"
              placeholder={requestInfo.form.message[language]}
              name="message"
              onChange={handleInputChange}
              value={formData.message}
            ></textarea>
            <Button
              classsName={"w-[15rem]"}
              disabled={loading}
              onClick={handleSubmit}
            >
              {requestInfo.button.text[language]}{" "}
              <img
                src={requestInfo.button.urlOfIcon[language]}
                alt={requestInfo.button.altOfIcon[language]}
              />
            </Button>
            <div>
              {errors &&
                errors.map((error) => (
                  <p key={error} className="text-red-500 text-xs">
                    {error}
                  </p>
                ))}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="w-[26.25rem] flex flex-col gap-20 w-max-854:hidden">
          {detailsInfo.map((detailInfo, index) => (
            <div key={index} className="flex gap-7">
              <detailInfo.Icon />
              <div>
                <p className="text-lg font-bold">
                  {detailInfo.title[language]}
                </p>
                <p className="text-lg font-normal">
                  {detailInfo.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
