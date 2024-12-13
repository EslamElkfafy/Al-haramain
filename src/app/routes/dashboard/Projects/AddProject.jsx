import { UploadForm } from "@/components/ui/uploadForm";
import React, { useState } from "react";
import DashboardProjectsImg from "@/assets/dashboard-projects-img.png";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axiosInstance";

export const AddDashboardProjectRoute = () => {
  const [mediaData, setMediaData] = useState([]);
  const router = useNavigate();
  const token = sessionStorage.getItem("token");
  const [formData, setFormData] = useState({
    "name.ar": "",
    "name.en": "",
    "description.ar": "",
    "description.en": "",
    "address.ar": "",
    "address.en": "",
    "category.ar": "",
    "category.en": "",
    "customerName.ar": "",
    "customerName.en": "",
    startAt: "",
    endAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  let controller;
  const imagesData = mediaData
    .filter((item) => item.type === "image")
    .map((item) => item.data);

  // Filter for videos and get only the data (assuming some video objects will be present)
  const videosData = mediaData
    .filter((item) => item.type === "video")
    .map((item) => item.data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddProject = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );

    if (emptyFields.length > 0) {
      setErrors(["All fields are required."]);
      return;
    }
    if (controller) controller.abort(); // Cancel the previous request
    controller = new AbortController();
    setLoading(true);
    setErrors(null);
    setSuccessMessage(null);
    
    try {
      await axiosInstance.post(
        "project",
        { ...formData, images: imagesData, videos: videosData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal
        }
      );
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setFormData({
        "name.ar": "",
        "name.en": "",
        "description.ar": "",
        "description.en": "",
        "address.ar": "",
        "address.en": "",
        "category.ar": "",
        "category.en": "",
        "customerName.ar": "",
        "customerName.en": "",
        startAt: "",
        endAt: "",
      });
      setMediaData([]);
    } catch (error) {
      if (error.name === "CanceledError") {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error:", error);
      }
      setErrors(
        error.response?.data?.errors
          ? error.response?.data?.errors.map((error) => error.msg)
          : [error.response?.data?.message]
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-medium ">أضافه مشروع</h1>
      <p className="text-base font-normal my-3">
        الصفحة الرئيسية/ نماذج من اعمالنا / تفاصيل المشروع
      </p>
      <div className="flex rounded-3xl bg-white p-6 gap-12 w-max-1290:flex-col">
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-medium text-xl">اسم المشروع</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"name.ar"}
            value={formData["name.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">اسم المشروع بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"name.en"}
            value={formData["name.en"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">وصف</h3>
          <textarea
            className="py-3 px-4 rounded-lg border border-black h-[10rem]"
            name={"description.ar"}
            value={formData["description.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">وصف بالانجليزي</h3>
          <textarea
            className="py-3 px-4 rounded-lg border border-black h-[10rem]"
            name={"description.en"}
            value={formData["description.en"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">فئة</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"category.ar"}
            value={formData["category.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">فئة بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"category.en"}
            value={formData["category.en"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">عنوان</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"address.ar"}
            value={formData["address.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">عنوان بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"address.en"}
            value={formData["address.en"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">اسم العميل</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"customerName.ar"}
            value={formData["customerName.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">اسم العميل بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"customerName.en"}
            value={formData["customerName.en"]}
            onChange={handleInputChange}
          />
          <div className="flex gap-6 w-full w-max-854:flex-col">
            <div className="flex-1 mb-5">
              <h3 className="mb-5">بدايه</h3>
              <DatePicker label={"startAt"} setFormData={setFormData} />
            </div>
            <div className="flex-1">
              <h3 className="mb-5">نهايه</h3>
              <DatePicker label={"endAt"} setFormData={setFormData} />
            </div>
          </div>
          <div className="w-max-854:hidden">
            <div className="flex w-[23.75rem] gap-4 w-max-854:flex-col">
              <Button
                intent={"whiteDashboard"}
                onClick={() => router(-1)}
                classsName={"w-[50%] w-max-854:w-full"}
              >
                الغاء
              </Button>
              <Button
                intent={"red"}
                onClick={handleAddProject}
                classsName={"w-[50%] w-max-854:w-full !rounded-lg"}
                disabled={loading}
              >
                أضافه
              </Button>
            </div>
            <div>
              {errors &&
                errors.map((error) => (
                  <p key={error} className="text-red-500 text-xs">
                    {error}
                  </p>
                ))}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[27.5625rem] w-max-854:w-full">
          <img
            src={DashboardProjectsImg}
            alt="project"
            className="w-full h-[26.75rem] rounded-lg"
          />
          <p className="text-xl font-medium m-4 ">معرض المشروع</p>
          <UploadForm
            mediaUploadClasses={
              " border-[1px] border-dashed border-[#232321] p-4 rounded-lg mb-5"
            }
            previewItemClasses={
              "bg-[#FAFAFA] p-4 flex items-center gap-4 flex-row-reverse rounded-lg"
            }
            labelClasses={
              "text-center text-[#70706E] flex flex-col cursor-pointer items-center gap-4"
            }
            previewImgClasses={"w-16 h-16 object-cover rounded-lg"}
            previewVideoClasses={"rounded-lg w-16 h-16 object-cover"}
            progressClasses={
              "w-full h-1 bg-gray-200 rounded-lg overflow-hidden appearance-none"
            }
            setMediaData={setMediaData}
            mediaData={mediaData}
            baisEndPoint={"project"}
          />
        </div>
        <div className="hidden w-max-854:block">
          <div className="flex w-[23.75rem] gap-4 w-max-854:flex-col w-max-854:w-full">
            <Button
              intent={"whiteDashboard"}
              onClick={() => router(-1)}
              classsName={"w-[50%] w-max-854:w-full"}
            >
              الغاء
            </Button>
            <Button
              intent={"red"}
              onClick={handleAddProject}
              classsName={"w-[50%] w-max-854:w-full !rounded-lg"}
              disabled={loading}
            >
              أضافه
            </Button>
          </div>
          <div>
            {errors &&
              errors.map((error) => (
                <p key={error} className="text-red-500 text-xs">
                  {error}
                </p>
              ))}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
