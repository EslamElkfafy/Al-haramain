import React from "react";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "py-[1rem] px-[1.25rem] text-lg flex gap-2 justify-center items-center disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      intent: {
        red: "bg-[#E53634] text-[#fff] rounded-sm",
        black: "bg-[#292E3D] text-[#fff]",
        white: "bg-[#FFF] text-[#E53634] rounded-md",
        icon: "bg-[#E53634] text-[#fff]",
        outline: "bg-transparent rounded-sm border-2 border-[#fff] text-[#fff]",
        whiteDashboard: "py-2 px-4 text-black bg-white rounded-lg border border-black",
        blackDashboard: "py-2 px-4 text-white bg-black rounded-lg",
      },
    },
    defaultVariants: {
      intent: "red",
    },
  }
);

export const Button = ({ intent, children, classsName, ...props }) => {
  const classes = buttonVariants({ intent });
  return (
    <button className={`${classes} ${classsName}`} {...props}>
      {children}
    </button>
  );
};
