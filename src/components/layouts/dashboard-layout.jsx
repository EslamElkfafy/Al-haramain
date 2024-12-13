import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import MenuIcon from "@/assets/menu-icon.svg";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { path: "/dashboard/control", title: "لوحة التحكم" },
  { path: "/dashboard/projects", title: "نماذج من اعمالنا" },
  { path: "/dashboard/services", title: "جميع الخدمات" },
  { path: "/dashboard/heros", title: "معرض الصور" },
  {path : "/dashboard/contact", title: "طلبات التواصل"}
];
export const DashboardLayout = () => {
  const { handleChangeLanguage } = useLanguage("ar");
  document.body.style.backgroundColor = "#E0E3EB";
  const [hiddenList, setHiddenList] = useState(true);

  return (
    <div className={`pr-[18rem] w-max-1020:pr-[15rem] w-max-854:pr-[3rem]`}>
      <div
        className={`fixed right-0 top-0 bottom-0 left-[calc(100vw-18rem)] w-max-1020:left-[calc(100vw-15rem)]  ${
          hiddenList
            ? "w-max-854:left-[calc(100vw-3rem)]"
            : "w-max-854:left-[calc(100vw-15rem)]"
        } bg-white flex flex-col p-3 z-50`}
      >
        <Logo className="w-max-1020:w-[13rem] w-max-854:hidden" />
        <button
          onClick={() => setHiddenList((prev) => !prev)}
          className={`hidden w-max-854:flex flex-col items-center`}
        >
          <MenuIcon />
          <p>قائمه</p>
        </button>
        <ul
          className={`flex flex-col w-full gap-12 font-semibold text-lg text-[#292E3D] bg-white w-max-854:z-50 ${
            hiddenList ? "w-max-854:hidden" : ""
          }`}
        >
          {navLinks.map(({ path, title }) => (
            <li key={path} className=" w-full ">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "w-full text-white inline-block bg-[#E53634] py-2 px-4 rounded-lg"
                    : "text-[#292E3D] w-full"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
