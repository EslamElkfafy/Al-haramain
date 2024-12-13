import { UploadForm } from "@/components/ui/uploadForm";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axiosInstance";
import DashboardServicesImg from "@/assets/dashboard-services-img.png";

export const AddDashboardServiceRoute = () => {
  const [mediaData, setMediaData] = useState([]);
  const router = useNavigate();
  const token = sessionStorage.getItem("token");
  const [formData, setFormData] = useState({
    "name.ar": "",
    "name.en": "",
    "description.ar": "",
    "description.en": "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
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
  const handleAddService = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );

    if (emptyFields.length > 0) {
      setErrors(["All fields are required."]);
      return;
    }
    setLoading(true);
    setErrors(null);
    setSuccessMessage(null);
    try {
      await axiosInstance.post(
        "service",
        { ...formData, images: imagesData, videos: videosData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
      });
      setMediaData([]);
    } catch (error) {
      console.error(error);
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
      <h1 className="text-3xl font-medium ">تفاصيل الخدمه</h1>
      <p className="text-base font-normal my-3">
        الصفحة الرئيسية / جميع الخدمات / تفاصيل الخدمه
      </p>
      <div className="flex rounded-3xl bg-white p-6 gap-12 w-max-1290:flex-col">
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-medium text-xl">اسم الخدمه</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"name.ar"}
            value={formData["name.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl"> اسم الخدمه بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"name.en"}
            value={formData["name.en"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">الوصف الخاص بالصوره</h3>
          <textarea
            className="py-3 px-4 rounded-lg border border-black h-[10rem]"
            name={"description.ar"}
            value={formData["description.ar"]}
            onChange={handleInputChange}
          />
          <h3 className="font-medium text-xl">الوصف الخاص بالصوره بالانجليزي</h3>
          <textarea
            className="py-3 px-4 rounded-lg border border-black h-[10rem]"
            name={"description.en"}
            value={formData["description.en"]}
            onChange={handleInputChange}
          />
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
                onClick={handleAddService}
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
            src={DashboardServicesImg}
            alt="service"
            className="w-full h-[26.75rem] rounded-lg"
          />
          <p className="text-xl font-medium m-4 ">صور من المنتجات والخدمات</p>
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
            baisEndPoint={"service"}
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
              onClick={handleAddService}
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
