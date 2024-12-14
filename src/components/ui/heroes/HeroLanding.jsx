import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { dataOfHeroes } from "@/constants/landingConstants";
import { useLanguage } from "@/context/LanguageContext";
import { ImageSlider } from "@/components/ui/imageSlider";
import axiosInstance from "@/axiosInstance";

export const HeroLanding = () => {
  // const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  // const currentImg = dataOfHeroes[currentHeroIndex];
  const { language, checkLanguage } = useLanguage()
  // const handlePrevHero = () => {
  //   setCurrentHeroIndex(prev => (prev > 0 ? prev - 1 : prev));
  // };
  // const handleNextHero = () => {
  //   setCurrentHeroIndex(prev => (prev < dataOfHeroes.length - 1 ? prev + 1 : prev));
  // };
  // const isPrevDisabled = currentHeroIndex === 0;
  // const isNextDisabled = currentHeroIndex === dataOfHeroes.length - 1;
  const [dataImgs, setDataImg] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("gallery");
        setDataImg(response.data.gallery);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <>
      {dataImgs.length !== 0 ? (
        <ImageSlider images={dataImgs} />
      ) : (
        <header
          style={{ backgroundImage: `url(${dataOfHeroes[0].urlImg})` }}
          className={`relative bg-no-repeat bg-cover bg-center flex items-center h-[42.3125rem]  w-max-854:p-5`}
        >
          <h1
            className={`${checkLanguage(
              "ml-[7rem]",
              "mr-[7rem]"
            )} text-7xl font-semibold w-[34.75rem] w-max-854:m-0 w-max-400:text-center`}
          >
            {dataOfHeroes[0].title[language]}
          </h1>
          //{" "}
          {/* <div className={`absolute ${checkLanguage("right-0", "left-0")} bottom-0 w-[26rem] h-[11.875rem] flex flex-col`}>
    //         <div className='p-3 flex flex-col gap-5 bg-[#E53634] flex-grow text-center text-[#fff]'>
    //             <p className='text-xl font-bold'>{checkLanguage("Description", "وصف")}</p>
    //             <p className='text-2xl font-normal'>{currentImg.description[language]}</p>
    //         </div>
    //         <div className={`flex gap-[1px] bg-white ${checkLanguage("", "flex-row-reverse")}`}>
    //             <Button intent={"black"} classsName={`flex-1 !py-2 ${isPrevDisabled ? "bg-[#aeb1bb]" : ""}`} onClick={handlePrevHero}><VectorLeft />{checkLanguage("Back", "خلف")}</Button>
    //             <Button intent={"black"} classsName={`flex-1 !py-2 ${isNextDisabled ? "bg-[#aeb1bb]" : ""}`} onClick={handleNextHero}>{checkLanguage("Next", "التالي")}<VectorRight /></Button>
    //         </div>
    //     </div> */}
        </header>
      )}
    </>
  );
};
