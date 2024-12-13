import React, { useState } from "react";
import Logo from "@/assets/logo.svg";
import Language from "@/assets/language.png";
import { NavLink, Outlet } from "react-router-dom";
import { navLinks } from "@/constants/navigationLinks";
import { useLanguage } from "@/context/LanguageContext";
import { footer } from "@/constants/footerConstants";
import MenuIcon from "@/assets/menu-icon.svg";
import ContactIcon from "@/assets/fixed-contact-icon.svg";
import TelIcon from "@/assets/fixed-tel-contact-icon.svg";
import EmailIcon from "@/assets/fixed-email-contact-icon.svg";
import CloseIcon from "@/assets/fixed-close-contact-icon.svg";
import { ContactLink } from "@/components/ui/contactLink";

export const ContentLayout = () => {
  const { language, checkLanguage, handleChangeLanguage } = useLanguage();
  const [hiddenList, setHiddenList] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <div>
      <header className="h-[5rem] flex justify-around items-center relative">
        <div>
          {/* <img
            src={Logo}
            alt="Al Haramain For Steel Structure"
            className="w-max-854:w-[18.75rem]"
          /> */}
          <Logo className="w-max-854:w-[18.75rem]" />
        </div>
        <ul
          className={`flex gap-14 font-semibold text-lg text-[#292E3D] bg-white ${
            hiddenList ? "w-max-854:hidden" : ""
          } w-max-854:absolute w-max-854:top-full w-max-854:right-0 w-max-854:left-0 w-max-854:flex-col w-max-854:items-center w-max-854:z-10`}
        >
          {navLinks.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-[#E53634]" : "text-[#292E3D]"
                }
              >
                {title[language]}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setHiddenList((prev) => !prev)}
          className={`hidden w-max-854:flex flex-col items-center`}
        >
          <MenuIcon />
          <p>{checkLanguage("menu", "قائمه")}</p>
        </button>

        <div
          onClick={() => handleChangeLanguage(language === "en" ? "ar" : "en")}
          className="flex items-center gap-1 font-normal text-lg cursor-pointer"
        >
          <img src={Language} alt="World" />
          <p>{checkLanguage("AR", "EN")}</p>
        </div>
      </header>
      <Outlet />
      {/* <footer className="flex gap-12 justify-center pt-12 px-7 pb-3 flex-wrap">
        <div className="flex flex-col p-2 w-[18.4375rem] items-start justify-start">
          <img src={Logo} alt="Al Haramain For Steel Structure" />
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
            <FacebookIcon className="cursor-pointer" />
            <LinkedinIcon className="cursor-pointer" />
            <TwitterIcon className="cursor-pointer" />
          </div>
        </div>
      </footer> */}
      <footer className="bg-[#E53634] p-5 text-center text-white ">
        {footer.text[language]}
      </footer>
      <div
        className={`fixed bottom-14 flex flex-col gap-10 ${checkLanguage(
          "left-14",
          "right-14"
        )} p-5 rounded-[1.875rem] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10`}
      >
        {contactVisible && (
          <ContactLink
            type={"phone"}
            value={"+20 1003 154358"}
            label={<TelIcon />}
          />
        )}
        {contactVisible && (
          <ContactLink
            type={"email"}
            value={"info@Haramain.com"}
            label={<EmailIcon />}
          />
        )}
        <button onClick={() => setContactVisible((prev) => !prev)}>
          {contactVisible ? <CloseIcon /> : <ContactIcon />}
        </button>
      </div>
    </div>
  );
};
