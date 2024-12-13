import { UploadForm } from "@/components/ui/uploadForm";
import React, { useEffect, useState } from "react";
import DashboardProjectsImg from "@/assets/dashboard-projects-img.png";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/axiosInstance";

export const UpdateDashboardProjectRoute = () => {
  const [mediaData, setMediaData] = useState([]);
  const router = useNavigate();
  const { id } = useParams();
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
  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data.doc;
      setFormData({
        "name.ar": data.name.ar,
        "name.en": data.name.en,
        "description.ar": data.description.ar,
        "description.en": data.description.en,
        "address.ar": data.address.ar,
        "address.en": data.address.en,
        "category.ar": data.category.ar,
        "category.en": data.category.en,
        "customerName.ar": data.customerName.ar,
        "customerName.en": data.customerName.en,
        startAt: new Date(data.startAt).toISOString().split("T")[0],
        endAt: new Date(data.endAt).toISOString().split("T")[0],
      });
      const newMediaData = [
        ...data.images.map((image) => ({ data: image, type: "image" })),
        ...data.videos.map((video) => ({ data: video, type: "video" })),
      ];

      setMediaData(newMediaData);
    })();
  }, [id]);
  const handleUpdateProject = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );

    if (emptyFields.length > 0) {
      setErrors(["All fields are required."]);
      return;
    }
    setLoading(true);
    setErrors(null);
    try {
      await axiosInstance.put(
        `project/${id}`,
        { ...formData, images: imagesData, videos: videosData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router(0);
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
  const handleDeleteProject = async () => {
    axiosInstance.delete(`project/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    router("/dashboard/projects");
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-medium ">تفاصيل المشروع</h1>
      <p className="text-base font-normal my-3">
        الصفحة الرئيسية / نماذج من اعمالنا / تفاصيل المشروع
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
              <DatePicker
                label={"startAt"}
                setFormData={setFormData}
                placeholder={formData?.startAt}
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-5">نهايه</h3>
              <DatePicker
                label={"endAt"}
                setFormData={setFormData}
                placeholder={formData?.endAt}
              />
            </div>
          </div>
          <div className="w-max-854:hidden">
            <div className="flex w-[23.75rem] gap-4 w-max-854:flex-col">
              <Button
                intent={"whiteDashboard"}
                onClick={() => router("/dashboard/projects")}
                classsName={"w-[50%] w-max-854:w-full"}
              >
                الغاء
              </Button>
              <Button
                intent={"red"}
                onClick={handleDeleteProject}
                classsName={"w-[50%] w-max-854:w-full !rounded-lg"}
              >
                مسح
              </Button>
              <Button
                intent={"blackDashboard"}
                onClick={handleUpdateProject}
                classsName={"w-[50%] w-max-854:w-full"}
                disabled={loading}
              >
                تحديث
              </Button>
            </div>
            <div>
              {errors &&
                errors.map((error) => (
                  <p key={error} className="text-red-500 text-xs">
                    {error}
                  </p>
                ))}
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
            projectOrServiceId={id}
            label="update"
            baisEndPoint={"project"}
          />
        </div>
        <div className="hidden w-max-854:block">
          <div className="flex w-[23.75rem] gap-4 w-max-854:flex-col w-max-854:w-full">
            <Button
              intent={"whiteDashboard"}
              onClick={() => router("/dashboard/projects")}
              classsName={"w-[50%] w-max-854:w-full"}
            >
              الغاء
            </Button>
            <Button
              intent={"red"}
              onClick={handleDeleteProject}
              classsName={"w-[50%] w-max-854:w-full !rounded-lg"}
            >
              مسح
            </Button>
            <Button
              intent={"blackDashboard"}
              onClick={handleUpdateProject}
              classsName={"w-[50%] w-max-854:w-full"}
              disabled={loading}
            >
              تحديث
            </Button>
          </div>
          <div>
            {errors &&
              errors.map((error) => (
                <p key={error} className="text-red-500 text-xs">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
