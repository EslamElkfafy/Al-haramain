import { Hero } from "@/components/ui/heroes";
import React from "react";
import WorkerImg from "@/assets/worker-img.jpeg";
import { Button } from "@/components/ui/button";
import {
  headInfo,
  heroInfo,
  leadersInfo,
  numbersInfo,
  quoteInfo,
  slides,
} from "@/constants/aboutConstants";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { building, contact, description, hourWorking } from "@/constants/footerConstants";
import Logo from "@/assets/logo.svg";
import { ContactLink } from "@/components/ui/contactLink";
import FacebookIcon from "@/assets/facebook-icon.svg";
import TwitterIcon from "@/assets/twitter-icon.svg";
import LinkedinIcon from "@/assets/linkedIn-icon.svg";

export const AboutRoute = () => {
  const { language, checkLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();
  const router = useNavigate();

  const renderSlides = () =>
    slides.map((slide, index) => (
      <div
        key={index}
        className={`flex gap-20 justify-center w-max-1290:items-center w-max-1020:flex-col-reverse w-max-1020:gap-5 ${
          index % 2 !== 0 ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1 pt-16 w-max-1020:pt-0 w-max-1020:text-center">
          <h2 className="text-[#525B7A] text-6xl font-semibold mb-14">
            {slide.title[language]}
          </h2>
          <div className="p-6 flex-col flex">
            {slide.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-xl font-medium text-[#525B7A] mb-5"
              >
                {paragraph[language]}
              </p>
            ))}
          </div>
        </div>
        <img
          src={slide.image.src}
          alt={slide.image.alt[language]}
          className="w-[29.8125rem]"
        />
      </div>
    ));
  const renderLeaders = () =>
    leadersInfo.leaders.map((leader, index) => (
      <div className="flex flex-col" key={index}>
        <img src={leader.image.src} alt={leader.image.alt} className="mb-7" />
        <p className="text-[#FF3E54] text-xl font-bold mb-2">{leader.name}</p>
        <p className="text-[#0E1F51] text-base font-medium">{leader.title}</p>
      </div>
    ));
  return (
    <>
      <Hero
        urlImg={heroInfo.urlImg}
        textHeader={heroInfo.title[language]}
        textDescription={heroInfo.description[language]}
        numbers={true}
      />
      <div className="px-28 pt-28 flex flex-col w-max-1290:px-5 w-max-1290:pt-24">
        <div
          className={`flex justify-center gap-32 w-max-1290:gap-10 w-max-1290:items-center w-max-1020:flex-col ${checkLanguage(
            "",
            "flex-row-reverse"
          )}`}
        >
          <div className="w-[25rem] relative shadow-[0px_0px_25px_0px_rgba(0,0,0,0.25)]">
            <img src={WorkerImg} alt="worker" className="w-full h-full" />
            <div className="absolute bottom-0 left-0 bg-black text-white p-5 flex flex-col gap-4">
              <p className="text-8xl font-black">{currentYear - 2000}+</p>
              <p className="font-normal text-lg">
                {checkLanguage("Years of experience", "سنوات من الخبرة")}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 w-max-1020:text-center w-max-1020:items-center">
            <p className="text-[#E53634] text-sm font-medium mb-5">
              {headInfo.title1[language]}
            </p>
            <h2 className="text-6xl font-semibold text-[#525B7A] mb-14">
              {headInfo.title2[language]}
            </h2>

            <div className="p-7 bg-[#F9F9F9] font-medium text-2xl text-[#525B7A] flex flex-col gap-5 mb-24">
              {headInfo.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph[language]}</p>
              ))}
            </div>
            <a href="/pdf.pdf"><Button intent={"red"} classsName={"w-[15rem]"}>
              {headInfo.button.text[language]}{" "}
              <img
                src={headInfo.button.urlOfIcon[language]}
                alt={headInfo.button.altOfIcon[language]}
              />
            </Button></a>
            
          </div>
        </div>
        {renderSlides()}
        <div className="text-center hidden">
          <h5 className="text-[#FF3E54] text-2xl font-bold mb-2">
            {leadersInfo.title1[language]}
          </h5>
          <h3 className="text-[#0E1F51] text-5xl font-bold mb-10">
            {leadersInfo.title2[language]}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16.375rem,auto))] gap-8 py-12">
            {renderLeaders()}
          </div>
        </div>
      </div>
      {/* Quote */}
      <div className="bg-[url('@/assets/quote-img.png')] bg-cover bg-no-repeat bg-center text-white text-center p-6 flex flex-col justify-center items-center gap-4 h-[44.3125rem] relative w-max-1290:h-auto">
        <h4 className="text-4xl font-normal">{quoteInfo.title1[language]}</h4>
        <h3 className="text-6xl font-bold">{quoteInfo.title2[language]}</h3>
        <p className="text-lg font-normal">{quoteInfo.description[language]}</p>
        <Button
          classsName={"w-[15.3125rem]"}
          onClick={() => router("/", {
            state: {
              sectionId: "quote",
            }
          })}
        >
          {quoteInfo.button.text[language]}{" "}
          <img
            src={quoteInfo.button.urlOfIcon[language]}
            alt={quoteInfo.button.altOfIcon[language]}
          />
        </Button>
        {/* Numbers */}
        <div className="flex justify-center items-center gap-5 w-max-1290:flex-col w-max-1290:translate-y-0 w-max-1290:static">
          {numbersInfo.map((numberInfo, index) => (
            <div
              key={index}
              className="p-7 items-center flex gap-5 bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.14)] w-[23.75rem]"
            >
              <p className="bg-[#E53634] text-4xl font-bold p-5">
                0{index + 1}
              </p>
              <div className="flex flex-col">
                <p className="text-[rgba(0,33,91,0.85)] text-xl font-bold">
                  {numberInfo.title[language]}
                </p>
                <p className="text-black text-2xl font-normal">
                  {numberInfo.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="flex gap-12 justify-center pt-12 px-7 pb-3 flex-wrap">
        <div className="flex flex-col p-2 w-[18.4375rem] items-start justify-start">
          <Logo />
          <p className="text-lg font-normal text-[#525B7A]">
            {description[language]}
          </p>
        </div>
        <div className="flex flex-col p-2 w-[18.4375rem] ">
          <h4 className="text-[#E53634] font-medium text-xl">
            {hourWorking.title[language]}
          </h4>
          <p className="text-[#292E3D] text-xl font-normal">
            {hourWorking.description[language]}
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110133.31453965882!2d30.620959845053623!3d30.388838558899593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458be390cb38497%3A0x583415d49bffadbe!2z2YXYr9mK2YbYqSDYp9mE2LPYp9iv2KfYqtiMINmF2K3Yp9mB2LjYqSDYp9mE2YXZhtmI2YHZitip!5e0!3m2!1sar!2seg!4v1732275514377!5m2!1sar!2seg"
            width="100%"
            height="242"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex flex-col p-2 w-[18.4375rem] ">
          <h4 className="text-[#E53634] font-medium text-xl">
            {building.title[language]}
          </h4>
          <p className="text-[#292E3D] text-xl font-normal">
            {building.description[language]}
          </p>
          <div className="flex gap-3 flex-col w-full mt-7">
            {building.examples.map((example, index) => (
              <div key={index} className="flex gap-4 justify-center">
                <img src={example.urlImg} alt={example.title[language]} />
                <p>{example.title[language]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-2 w-[18.4375rem] ">
          <h4 className="text-[#E53634] font-medium text-xl">
            {contact.title[language]}
          </h4>
          <div className="flex flex-col w-full gap-7 my-9">
            <p className="text-xl font-normal">
              <span className="font-medium">
                {contact.address.title[language]}
              </span>{" "}
              {contact.address.description[language]}
            </p>
            <p className="text-xl font-normal">
              <span className="font-medium">
                {contact.number.title[language]}
              </span>{" "}
              <ContactLink type={"phone"} value={contact.number.description[language]} label={contact.number.description[language]} className={"text-blue-500"} />
              
            </p>
            <p className="text-xl font-normal">
              <span className="font-medium">
                {contact.email.title[language]}
              </span>{" "}
              <ContactLink type={"email"} value={contact.email.description[language]} label={contact.email.description[language]} className={"text-blue-500"} />
            </p>
          </div>
          <h4 className="text-[#E53634] font-medium text-xl">
            {contact.social.title[language]}
          </h4>
          <div className="flex gap-5 w-full mt-5">
            <a href="https://www.facebook.com/share/14uCRzi8VF/"><FacebookIcon className="cursor-pointer" /></a>
            <a href="https://www.linkedin.com/in/elharamen-steel-460637341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><LinkedinIcon className="cursor-pointer" /></a>
            <TwitterIcon className="cursor-pointer" />
          </div>
        </div>
      </footer>
    </>
  );
};
