import { Hero } from "@/components/ui/heroes";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/axiosInstance";
import { useLanguage } from "@/context/LanguageContext";
import { VideoPlayer } from "@/components/ui/video";
import { Gallery } from "@/components/ui/gallery";
import {
  breakpointsOfGallery,
  breakpointsOfGrid,
  form,
  navigateProjects,
} from "@/constants/singleProjectConstants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/assets/plus-icon.svg";
import { formatDate } from "@/utils/formateDate";
import FacebookImg from "@/assets/facebook-singlepage-icon.png";
import InstagramImg from "@/assets/instagram-singlepage-icon.png";
import LinkedInImg from "@/assets/linkedin-singlepage-icon.png";
import SingleProjectInfoImg from "@/assets/img-info-singleproject.png";
import Avatar from "@/components/ui/avatar/avatar";
import { timeAgo } from "@/utils/timeago";
import { GridSystem } from "@/shared/components/gridSystem";
import { useViewportBreakpoint } from "@/hooks/useViewportBreakpoint";

export const SingleProjectRoute = () => {
  const { language, checkLanguage } = useLanguage();
  const { projectId } = useParams();
  const location = useLocation();
  const { state } = location || {};
  const { listOfProjects, myIndexInList } = state;
  const idOfNextProject = listOfProjects[myIndexInList + 1]?._id;
  const idOfPreviousProject = listOfProjects[myIndexInList - 1]?._id;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    project: projectId,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const numOfImages = useViewportBreakpoint(breakpointsOfGallery, "rows");
  const [data, setData] = useState(null);
  const [reRenderRequest, setReRenderRequest] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`project/${projectId}`);
        setData({ comments: response.data.comments, ...response.data.doc });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [projectId, reRenderRequest]);
  const handleNextProjectClick = () => {
    if (idOfNextProject) {
      router(`/project/${idOfNextProject}`, {
        state: {
          listOfProjects,
          myIndexInList: myIndexInList + 1,
        },
      });
    }
  };
  const handlePreviousProjectClick = () => {
    if (idOfPreviousProject) {
      router(`/project/${idOfPreviousProject}`, {
        state: {
          listOfProjects,
          myIndexInList: myIndexInList - 1,
        },
      });
    }
  };
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
      await axiosInstance.post("comment", formData);
      setSuccessMessage("Form submitted successfully!");
      setReRenderRequest((prev) => !prev);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        comment: "",
        project: projectId,
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
  const ComponentOfProjectDisplay = ({
    _id,
    images,
    name,
    category,
    listOfDate,
    myIndexInList,
  }) => {
    const router = useNavigate();
    return (
      <div
        className="h-[30.3125rem] group cursor-pointer bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images[0].url})` }}
        onClick={() =>
          router(`/project/${_id}`, {
            state: {
              listOfProjects: listOfDate,
              myIndexInList,
            },
          })
        }
      >
        <div className="h-full hidden w-full justify-center items-center flex-col gap-4 text-white group-hover:flex bg-[rgba(229,54,52,.81)]">
          <p className="text-xl font-medium">{name[language]}</p>
          <p className="text-3xl font-medium">{category[language]}</p>
          <div className="bg-white p-6">
            <PlusIcon />
          </div>
        </div>
      </div>
    );
  };
  const ComponentOfProjectLoading = () => (
    <div className="h-[30.3125rem] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse"></div>
  );
  return (
    <>
      <Hero
        urlImg={data?.images[0].url}
        textHeader={checkLanguage("Single Project", "مشروع فردي")}
        textDescription={checkLanguage(
          "Home/ Project / Single Project",
          "الصفحة الرئيسية/ المشروع / مشروع فردي"
        )}
      />
      <div className="py-24 px-28 w-max-1020:px-5">
        <div className="flex flex-col gap-12">
          <div className="flex gap-20 justify-center w-max-854:flex-col-reverse w-max-854:gap-10 ">
            <div className="flex flex-col gap-12 w-[39.5625rem] w-max-854:w-full">
              {data?.videos[0] ? (
                <VideoPlayer videoUrl={data?.videos[0].url} />
              ) : (
                <img src={data?.images[0].url} alt="" className="w-full" />
              )}

              <div>
                {data?.description[language]
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className={`${index === 0 ? "" : "mt-5"}`}>
                      {paragraph}
                    </p>
                  ))}
              </div>
              <Gallery
                listOfImages={data?.images}
                numOfImages={numOfImages}
                sizeOfImages={"19.1875rem"}
              />
              <div
                className={`flex justify-between ${checkLanguage(
                  "",
                  "flex-row-reverse"
                )}`}
              >
                <button
                  disabled={!idOfPreviousProject}
                  className={`flex items-center gap-1 ${checkLanguage(
                    "",
                    "flex-row-reverse"
                  )}`}
                  onClick={handlePreviousProjectClick}
                >
                  <navigateProjects.previous.Icon />
                  {navigateProjects.previous.text[language]}
                </button>
                <button
                  disabled={!idOfNextProject}
                  className={`flex items-center gap-1 ${checkLanguage(
                    "",
                    "flex-row-reverse"
                  )}`}
                  onClick={handleNextProjectClick}
                >
                  {navigateProjects.next.text[language]}
                  <navigateProjects.next.Icon />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                <textarea
                  className="p-5 border-none shadow-[0px_4px_15px_0px_rgba(0,0,0,0.14)] h-[10rem] outline-none rounded-lg"
                  placeholder={form.comment[language]}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  id=""
                ></textarea>
                <Input
                  type={"email"}
                  placeholder={form.email[language]}
                  intent={"contact"}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  type={"text"}
                  placeholder={form.name[language]}
                  intent={"contact"}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Button
                  intent={"red"}
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
                <div className="hidden h-[18.75rem] overflow-y-auto flex-col w-max-854:flex">
                  {data?.comments
                    .slice()
                    .reverse()
                    .map(({ _id, comment, name, createdAt }) => (
                      <div
                        key={_id}
                        className="flex gap-5 px-6 py-5 shadow-[0px_8px_8px_rgba(17,24,39,0.04)] mb-8"
                      >
                        <Avatar username={name} />
                        <div className="flex flex-col gap-1">
                          <p>
                            {name} {timeAgo(createdAt)}
                          </p>
                          <p>{comment}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="w-[27.8125rem] flex flex-col gap-8 w-max-854:items-center w-max-854:text-center w-max-854:w-full">
              <h1 className="text-4xl font-semibold">{data?.name[language]}</h1>
              <p className="text-base font-bold">{data?.address[language]}</p>
              <div>
                <h2 className="text-3xl font-normal">
                  {checkLanguage("Project Info", "معلومات المشروع")}
                </h2>
                <p className="text-2xl font-normal">
                  {checkLanguage("Client:", "عميل :")}{" "}
                  <span className="text-lg font-normal">
                    {data?.customerName[language]}
                  </span>
                </p>
                <p className="text-2xl font-normal">
                  {checkLanguage("Category:", "فئة :")}{" "}
                  <span className="text-lg font-normal">
                    {data?.category[language]}
                  </span>
                </p>
                <p className="text-2xl font-normal">
                  {checkLanguage("Completed on:", "تم الانتهاء في :")}{" "}
                  <span className="text-lg font-normal">
                    {formatDate(data?.endAt, checkLanguage("en-GB",'ar-EG'))}
                  </span>
                </p>
              </div>
              {/* <div className="flex gap-5 w-max-854:justify-center">
                <button>
                  <img src={FacebookImg} alt="facebook" />
                </button>
                <button>
                  <img src={InstagramImg} alt="instagram" />
                </button>
                <button>
                  <img src={LinkedInImg} alt="linkedin" />
                </button>
              </div> */}
              <img src={SingleProjectInfoImg} alt="white building" />
              <div className="flex h-[18.75rem] overflow-y-auto flex-col w-max-854:hidden">
                {data?.comments
                  .slice()
                  .reverse()
                  .map(({ _id, comment, name, createdAt }) => (
                    <div
                      key={_id}
                      className="flex gap-5 px-6 py-5 shadow-[0px_8px_8px_rgba(17,24,39,0.04)] mb-8"
                    >
                      <Avatar username={name} />
                      <div className="flex flex-col gap-1">
                        <p>
                          {name} {timeAgo(createdAt)}
                        </p>
                        <p>{comment}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <GridSystem
            breakpoints={breakpointsOfGrid}
            numOfRows={1}
            ComponentDisplay={ComponentOfProjectDisplay}
            ComponentLoading={ComponentOfProjectLoading}
            classNameOfGrid={"grid-cols-[repeat(auto-fit,23.3125rem)] gap-5"}
            endPoint={"project"}
          />
        </div>
      </div>
    </>
  );
};
