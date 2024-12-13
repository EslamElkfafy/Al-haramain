import React, { useEffect } from "react";
import { AppRouter } from "./router";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
};

export default App;
