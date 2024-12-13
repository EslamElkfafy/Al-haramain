import { Button } from "@/components/ui/button";
import { GridSystem } from "@/shared/components/gridSystem";
import { formatDate } from "@/utils/formateDate";
import React from "react";
import { useNavigate } from "react-router-dom";

const breakpoints = [
  {
    minWidth: 1420,
    columns: 2,
  },
];
export const GetDashboardProjectsRoute = () => {
    const router = useNavigate();
  const ComponentOfProjectDisplay = ({
    _id,
    images,
    name,
    category,
    endAt,
    description,
    listOfDate,
    myIndexInList,
  }) => {
    const router = useNavigate();
    return (
      <div
        className="h-[30.0625rem] p-4 flex flex-col overflow-hidden bg-[#FAFAFA] rounded-2xl cursor-pointer"
        // onClick={() =>
        //   router(`/project/${_id}`, {
        //     state: {
        //       listOfProjects: listOfDate,
        //       myIndexInList,
        //     },
        //   })
        // }
        onClick={() => router(`/dashboard/project/${_id}`)}
      >
        <img
          src={images[0]?.url}
          className="w-full h-[20.6875rem] rounded-lg object-cover"
        />
        <h2 className="text-2xl font-medium">{name.ar}</h2>
        {endAt && (
          <p className="text-sm font-semibold opacity-[.6] text-black">
            {formatDate(endAt, "ar-EG")}
          </p>
        )}
        <p className="font-normal text-base">{category.ar}</p>
        <h3 className="font-normal text-base">ملخص</h3>
        <p className="font-normal text-sm">{description.ar}</p>
      </div>
    );
  };
  const ComponentOfProjectLoading = () => (
    <div className="h-[30.0625rem] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse"></div>
  );
  return (
    <div className="py-8 px-4">
      <div className="flex justify-between mb-3">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-medium ">نماذج من اعمالنا</h1>
          <p className="text-base font-normal ">
            الصفحة الرئيسية/ نماذج من اعمالنا
          </p>
        </div>
        <Button intent={"red"} classsName={"!rounded-lg"} onClick={() => router("/dashboard/project/add")}>
          إضافة مشروع جديد
        </Button>
      </div>

      <GridSystem
        breakpoints={breakpoints}
        numOfRows={2}
        ComponentDisplay={ComponentOfProjectDisplay}
        ComponentLoading={ComponentOfProjectLoading}
        classNameOfGrid={
          "grid-cols-[repeat(auto-fit,34rem)] w-max-854:grid-cols-[repeat(auto-fit,26rem)] gap-3"
        }
        endPoint={"project"}
      />
    </div>
  );
};
