import { Hero } from "@/components/ui/heroes";
import React from "react";
import HeroProjectsImg from "@/assets/hero-projects.png";
import PlusIcon from "@/assets/plus-icon.svg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { breakpoints, heroInfo } from "@/constants/projectsConstants";
import { GridSystem } from "@/shared/components/gridSystem";

export const ProjectsRoute = () => {
  const { language } = useLanguage();
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
        style={{ backgroundImage: `url(${images[0]?.url})` }}
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
        urlImg={HeroProjectsImg}
        textHeader={heroInfo.title[language]}
        textDescription={heroInfo.description[language]}
        numbers={true}
      />
      <div className="p-36 !pt-56">
        <GridSystem
          breakpoints={breakpoints}
          numOfRows={3}
          ComponentDisplay={ComponentOfProjectDisplay}
          ComponentLoading={ComponentOfProjectLoading}
          classNameOfGrid={"grid-cols-[repeat(auto-fit,23.3125rem)] gap-5"}
          endPoint={"project"}
        />
      </div>
    </>
  );
};
