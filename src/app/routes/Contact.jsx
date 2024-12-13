import { Hero } from "@/components/ui/heroes";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TelephoneIcon from "@/assets/telephone-icon.svg";
import ColockIcon from "@/assets/colock-icon.svg";
import { contactInfo, form, heroInfo } from "@/constants/contactConstants";
import { useLanguage } from "@/context/LanguageContext";
import axiosInstance from "@/axiosInstance";

export const ContactRoute = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      await axiosInstance.post("contact", formData);
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      setErrors(
        error.response?.data?.errors
          ? error.response?.data?.errors.map((error) => error.msg)
          : [error.response?.data?.message]
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Hero
        urlImg={heroInfo.urlImg}
        textHeader={heroInfo.title[language]}
        textDescription={heroInfo.description[language]}
        numbers={false}
      />
      <div className="py-16 px-32 w-max-1290:px-10">
        {/* form */}
        <div className="flex flex-col gap-10">
          <div className="flex gap-14 w-max-854:flex-col w-max-854:gap-10">
            <Input
              type={"text"}
              placeholder={form.name[language]}
              intent={"contact"}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              type={"email"}
              placeholder={form.email[language]}
              intent={"contact"}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-14 w-max-854:flex-col w-max-854:gap-10">
            <Input
              type={"text"}
              placeholder={form.phone[language]}
              intent={"contact"}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <Input
              type={"text"}
              placeholder={form.address[language]}
              intent={"contact"}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <textarea
            className="p-5 border-none shadow-[0px_4px_15px_0px_rgba(0,0,0,0.14)] h-[10rem] outline-none rounded-lg"
            placeholder={form.message[language]}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <Button
            intent={"red"}
            classsName={"w-[15rem]"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {form.button.text[language]}{" "}
            <img
              src={form.button.urlOfIcon[language]}
              alt={form.button.altOfIcon[language]}
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110133.31453965882!2d30.620959845053623!3d30.388838558899593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458be390cb38497%3A0x583415d49bffadbe!2z2YXYr9mK2YbYqSDYp9mE2LPYp9iv2KfYqtiMINmF2K3Yp9mB2LjYqSDYp9mE2YXZhtmI2YHZitip!5e0!3m2!1sar!2seg!4v1732275514377!5m2!1sar!2seg"
            width="100%"
            height="445"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex gap-16 w-max-1290:flex-col">
            <div className="flex flex-col gap-3 p-10 border-l-8 border-l-[#E53634] border-l-solid shadow-[0px_2px_25px_0px_rgba(0,33,91,0.20)]">
              <p className="text-sm font-light">
                {contactInfo.title1[language]}
              </p>
              <p className="text-4xl font-normal text-[#00215B]">
                {contactInfo.description1[language]}
              </p>
            </div>
            <div className="flex justify-center items-center gap-5 min-w-[20.6rem]">
              <div className="p-3 bg-[#E53634]">
                <TelephoneIcon />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-normal text-[#41444B]">
                  {contactInfo.title2[language]}
                </p>
                <div className="flex flex-col  ">
                  {contactInfo.description2[language].map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="text-2xl font-normal text-[#16213E]"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 min-w-[20.6rem]">
              <div className="p-3 bg-[#14171F]">
                <ColockIcon />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-normal text-[#41444B]">
                  {contactInfo.title3[language]}
                </p>
                <div className="flex flex-col  ">
                  <p className="text-2xl font-normal text-[#16213E]">
                    {contactInfo.description3[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
