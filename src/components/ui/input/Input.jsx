import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva("px-5 py-2 flex-1 outline-none", {
  variants: {
    intent: {
      quote: "border border-[rgba(0,0,0,0.25)]",
      contact: "border-none shadow-[0px_4px_15px_0px_rgba(0,0,0,0.14)] rounded-lg",
      dashboardLogin: "border-none rounded-lg bg-[#F5F5F5] h-14",
      dashboardForm: "py-3 px-4 rounded-lg border border-black"
    },
  },
  defaultVariants: {
    intent: "quote",
  },
});

export const Input = ({ className, type, intent, ...props }) => {
  const classes = inputVariants({ intent });
  return <input className={cn(classes, className)} type={type} {...props} />;
};
