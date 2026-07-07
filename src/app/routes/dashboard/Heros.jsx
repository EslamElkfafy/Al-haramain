import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@/assets/close-upload.svg";
import { CustomDragDropList } from "@/components/ui/customDragDropList";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axiosInstance";

export const DashboardHerosRoute = () => {
  const [image, setImage] = useState(null);
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [finalData, setFinalData] = useState([]);
  const router = useNavigate();
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    text1: "",
    text2: "",
    file: "",
  });

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("gallery", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFinalData(response.data.gallery);
    })();
  }, []);
  function generateId() {
    return `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  // CREATE: Add a new item to the list
  function createItem(data) {
    if (!validate()) return;

    const newItem = { externalId: generateId(), ...data };
    setFinalData((prev) => [...prev, newItem]);
    // console.log("Item added:", newItem);
    return newItem;
  }
  async function deleteItem(id, publicId) {
    if (publicId) {
      try {
        await axiosInstance.delete(`gallery/deleteRecord`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            externalId: id,
            public_id: publicId,
          },
        });
        // console.log("Image deleted:", publicId);
      } catch (error) {
        console.error(error);
      }
    }

    setFinalData((prevItems) =>
      prevItems.filter((item) => item.externalId !== id)
    );
  }
  const handleImageUpload = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setImage(file);
    }
  };
  const validate = () => {
    let isValid = true;
    const newErrors = { text1: "", text2: "", file: "" };

    // Validate text input
    if (!titleAr.trim()) {
      newErrors.text1 = "Text input cannot be empty";
      isValid = false;
    }
    if (!titleEn.trim()) {
      newErrors.text2 = "Text input cannot be empty";
      isValid = false;
    }

    // Validate file input (only image files)
    if (!image) {
      newErrors.file = "Please select a file";
      isValid = false;
    } else if (!image.type.startsWith("image/")) {
      newErrors.file = "File must be an image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const CustomDragDropItemComponent = ({
    item,
    index,
    onDragStart,
    onDragOver,
    onDrop,
  }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => onDragOver(e, index)}
        onDrop={(e) => onDrop(e, index)}
        className="flex gap-2 h-[6.6875rem] border border-[#E53634] bg-white items-center rounded-lg p-4 !pr-[3.8125rem] relative"
      >
        <img
          src={item.image ? URL.createObjectURL(item.image) : item.url}
          alt=""
          className="w-16 h-16 rounded-lg object-cover"
        />
        <p className="overflow-hidden flex-1">{item.title.ar}</p>
        <button
          className="bg-[#E53634] w-9 h-9 rounded-full flex items-center justify-center"
          onClick={() => deleteItem(item.externalId, item.public_id)}
        >
          <DeleteIcon />
        </button>
        <div className="absolute right-0 left-[calc(100%-2.8125rem)] top-0 bottom-0 bg-black rounded-r-lg text-white text-3xl font-medium flex items-center justify-center">
          {index + 1}
        </div>
      </div>
    );
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Step 1: Upload images in parallel and handle errors efficiently
      const updatedDataMap = await Promise.all(
        finalData.map(async ({ externalId, image }) => {
          if (!image) return null; // Skip if no image

          const formData = new FormData();
          formData.append("images", image);

          try {
            const response = await axiosInstance.post(
              "gallery/uploadImages",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const dataOfImageResponse = response.data?.data?.images[0];
            if (dataOfImageResponse) {
              return {
                externalId,
                url: dataOfImageResponse.url,
                public_id: dataOfImageResponse.public_id,
                image: undefined, // Removing the image field
              };
            } else {
              console.error(`Image response missing for id ${externalId}`);
              return null;
            }
          } catch (uploadError) {
            console.error(
              `Error uploading image with id ${externalId}:`,
              uploadError
            );
            return null; // Return null to gracefully handle errors
          }
        })
      );

      // Step 2: Filter out invalid data and merge with finalData
      const validUpdatedData = updatedDataMap.filter((item) => item !== null);

      const validUpdatedDataMap = validUpdatedData.reduce((acc, item) => {
        acc[item.externalId] = item;
        return acc;
      }, {});

      const updatedFinalData = finalData.map((item) =>
        validUpdatedDataMap[item.externalId]
          ? { ...item, ...validUpdatedDataMap[item.externalId] }
          : item
      );

      // Step 3: Update state and send patch request in one go
      setFinalData(updatedFinalData);
      // console.log("Updated final data:", updatedFinalData);

      // Step 4: Perform patch request after updating state
      const patchResponse = await axiosInstance.patch(
        "gallery",
        { images: updatedFinalData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Patch response:", patchResponse);
      router(0);
    } catch (error) {
      console.error("Error during image upload process:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-medium ">معرض الصور</h1>
      <p className="text-base font-normal my-3">الصفحة الرئيسية / معرض الصور</p>
      <div className="flex rounded-3xl bg-white p-6 gap-12 w-max-1290:flex-col">
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-medium text-xl">الجمله الرئيسيه</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"titleAr"}
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
          />
          {errors.text1 && <span style={{ color: "red" }}>{errors.text1}</span>}
          <h3 className="font-medium text-xl">الجمله الرئيسيه بالانجليزي</h3>
          <Input
            intent={"dashboardForm"}
            className={"!flex-none"}
            name={"titleEn"}
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
          />
          {errors.text2 && <span style={{ color: "red" }}>{errors.text2}</span>}
          <div className="h-[27.25rem] border border-black flex items-center justify-center rounded-2xl">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              "عرض الصوره"
            )}
          </div>
          {errors.file && <span style={{ color: "red" }}>{errors.file}</span>}
          <div className="hidden w-max-1290:block">
            <Button
              intent={"red"}
              classsName={"!px-4 !py-2 !rounded-lg w-full my-3 w-max-1290:mt-0"}
            >
              <label htmlFor="image-upload" className="cursor-pointer w-full">
                اضافة صوره
              </label>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <Button
            intent={"red"}
            classsName={"w-[8.875rem] !rounded-lg"}
            onClick={() =>
              createItem({ title: { ar: titleAr, en: titleEn }, image })
            }
          >
            اضافه
          </Button>
          <div className="flex gap-4 mt-12 w-max-1290:hidden">
            <Button
              intent={"whiteDashboard"}
              classsName={"w-[8.875rem] !rounded-lg"}
              onClick={() => router("/dashboard/control")}
            >
              الغاء
            </Button>
            <Button
              intent={"blackDashboard"}
              classsName={"w-[8.875rem] !rounded-lg"}
              // onClick={() => createItem({ titleAr, image })}
              onClick={handleSaveChanges}
              disabled={loading}
            >
              تحديث
            </Button>
          </div>
        </div>
        <div className="w-[29.0625rem] w-max-854:w-full">
          <h1 className="text-xl font-medium "> صور من المنتجات والخدمات</h1>
          <div className="w-max-1290:hidden">
            <Button
              intent={"red"}
              classsName={"!px-4 !py-2 !rounded-lg w-full my-3"}
            >
              <label htmlFor="image-upload" className="cursor-pointer w-full">
                اضافة صوره
              </label>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="bg-[rgba(153,153,153,0.15)] rounded-lg p-4 flex flex-col gap-6 max-h-[39.4375rem] overflow-y-auto">
            <CustomDragDropList
              ComponentItem={CustomDragDropItemComponent}
              items={finalData}
              setItems={setFinalData}
            />
          </div>
        </div>
        <div className=" gap-4 mt-12 hidden w-max-1290:flex">
          <Button
            intent={"whiteDashboard"}
            classsName={"w-[8.875rem] !rounded-lg"}
            onClick={() => router("/dashboard/control")}
          >
            الغاء
          </Button>
          <Button
            intent={"blackDashboard"}
            classsName={"w-[8.875rem] !rounded-lg"}
            // onClick={() => createItem({ titleAr, image })}
            onClick={handleSaveChanges}
            disabled={loading}
          >
            تحديث
          </Button>
        </div>
      </div>
    </div>
  );
};
