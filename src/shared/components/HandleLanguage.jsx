import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const HandleLanguage = () => {
  const { language } = useLanguage();
  const localtion = useLocation();
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      document.documentElement.classList.add("lang-ar");
    } else {
      document.documentElement.className = `lang-${language}`;
    }
  }, [language, localtion.pathname]);
  return null;
};
