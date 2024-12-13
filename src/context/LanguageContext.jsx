import React, { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext();
export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || 'en');

    const handleChangeLanguage = (language) => {
        localStorage.setItem("language", language);
        setLanguage(language);
    }
    const checkLanguage = (englishValue, arabicValue) => {
        return language === 'ar'? arabicValue : englishValue;
    }
  return (
    <LanguageContext.Provider value={{ language, handleChangeLanguage, checkLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
