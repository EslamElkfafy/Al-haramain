import PreviousProjectIcon from "@/assets/previous-preview.svg";
import NextProjectIcon from "@/assets/next-preview.svg";
import LongArrowRight from "@/assets/long-arrow-right.png";
import LongArrowLeft from "@/assets/long-arrow-left.png";

export const videoJsOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  sources: [
    {
      src: "https://www.example.com/video.mp4",
      type: "video/mp4",
    },
  ],
};

export const navigateProjects = {
  next: {
    text: {
      en: "Next Project",
      ar: "التالي",
    },
    Icon: NextProjectIcon,
  },
  previous: {
    text: {
      en: "Previous Project",
      ar: "السابق",
    },
    Icon: PreviousProjectIcon,
  },
};
export const breakpointsOfGrid = [
  {
    minWidth: 1776,
    columns: 4,
  },
  {
    minWidth: 1383,
    columns: 3,
  },
  {
    minWidth: 990,
    columns: 2,
  },
];
export const breakpointsOfGallery = [
  {
    minWidth: 1364,
    rows: 4,
  },
  {
    minWidth: 855,
    rows: 2,
  },
  {
    minWidth: 580,
    rows: 4,
  },
  {
    minWidth: 0,
    rows: 2,
  },
];

export const form = {
  name: {
    en: "Your Name *",
    ar: "اسمك الكامل*",
  },
  email: {
    en: "Your Email *",
    ar: "عنوان بريدك  الإلكتروني*",
  },
  comment: {
    en: "Write Comment ...",
    ar: "أدخل رسالتك هنا...*",
  },
  button: {
    text: {
      en: "Send ",
      ar: "إﺭﺳﺎل اﻟﺮﺳﺎﻟﺔ",
    },
    urlOfIcon: {
      en: LongArrowRight,
      ar: LongArrowLeft,
    },
    altOfIcon: {
      en: "arrow",
      ar: "سهم",
    },
  },
};
