import React, { useState } from "react";
import axiosInstance from "@/axiosInstance";
import UploadImg from "@/assets/upload-img.svg";
import CloseUpload from "@/assets/close-upload.svg";

export const UploadForm = ({
  formClasses,
  mediaUploadClasses,
  dragingClasses,
  previewClasses,
  labelClasses,
  previewItemClasses,
  previewImgClasses,
  previewVideoClasses,
  progressClasses,
  progressTextClasses,
  errorClasses,
  setMediaData,
  mediaData,
  projectOrServiceId,
  label,
  baisEndPoint,
}) => {
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // To track the progress
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length > 0) {
      await uploadFiles(validFiles); // Trigger the upload as soon as files are dropped
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      if (validFiles.length > 0) {
        await uploadFiles(validFiles); // Trigger the upload as soon as files are selected
      }
    }
  };
  const handleDelete = (index) => {
    setMediaData((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(mediaData, index);
    const img = mediaData[index];
    const type = img.type;
    const publicId = img.data.public_id;
    const endPoint =
      type === "image"
        ? label === "update"
          ? "deleteImage"
          : "deleteImageBeforeCreate"
        : label === "update"
        ? "deletevideo"
        : "deleteVideoBeforeCreate";
    const url =
      label === "update"
        ? `${baisEndPoint}/${endPoint}/${projectOrServiceId}`
        : `${baisEndPoint}/${endPoint}`;
    axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        public_id: publicId,
      },
    });
  };
  const uploadFiles = async (files) => {
    const newTemps = Array(files.length).fill("temp");
    setMediaData((prevList) => [...prevList, ...newTemps]);
    setLoading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    // Append images to formData with the label 'images'
    imageFiles.forEach((file) => {
      formData.append("images", file); // Use 'images' as the label for image files
    });

    // Append videos to formData with the label 'videos'
    videoFiles.forEach((file) => {
      formData.append("videos", file); // Use 'videos' as the label for video files
    });

    try {
      const response = await axiosInstance.post(
        `${baisEndPoint}/uploadImagesAndVideos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent); // Update progress state
          },
        }
      );
      setMediaData((prevList) => prevList.filter((item) => item !== "temp"));
      response.data?.data?.images?.map((image) => {
        setMediaData((prevData) => [
          ...prevData,
          { type: "image", data: image },
        ]);
      });
      response.data?.data?.videos?.map((video) => {
        setMediaData((prevData) => [
          ...prevData,
          { type: "video", data: video },
        ]);
      });
      console.log(mediaData);
    } catch (err) {
      setMediaData((prevList) => prevList.filter((item) => item !== "temp"));
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={formClasses}>
      <div
        className={`${mediaUploadClasses} ${dragging ? dragingClasses : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*, video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className={labelClasses}>
          <UploadImg />
          {dragging ? (
            <p>أفلت الملفات لتحميل الصور أو الفيديوهات</p>
          ) : (
            <p>
              اسحب الملفات وأفلتها هنا لتحميل الصور أو الفيديوهات، أو انقر
              لتحديدها
            </p>
          )}
        </label>
      </div>
      {error && <p className={errorClasses}>{error}</p>}
      <div className={`${previewClasses} max-h-[39.4375rem] overflow-y-auto`}>
        {mediaData.map(({ type, data }, index) => (
          <div key={index} className={previewItemClasses}>
            {type === "image" ? (
              <img src={data.url} alt="preview" className={previewImgClasses} />
            ) : type === "video" ? (
              <video className={previewVideoClasses}>
                <source src={data.url} />
              </video>
            ) : (
              <div
                className={`${previewImgClasses} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg bg-[length:200%_100%] animate-pulse`}
              ></div>
            )}
            <div className="flex-1">
              <progress
                value={type ? 100 : uploadProgress}
                max="100"
                className={`${progressClasses}`}
              />
              <p className={progressTextClasses}>
                {!type ? "جاري التحميل..." : "تم التحميل"}{" "}
                {type ? 100 : uploadProgress}%
              </p>
            </div>
            {type && (
              <button
                onClick={() => handleDelete(index)}
                className="w-8 h-8 bg-[#E53634] flex items-center justify-center rounded-full"
              >
                <CloseUpload />
              </button>
            )}
          </div>
        ))}
      </div>
      {/* {loading && (
        <div>
          <progress
            value={uploadProgress}
            max="100"
            className={progressClasses}
          />
          <p className={progressTextClasses}>{uploadProgress}%</p>
        </div>
      )} */}
    </form>
  );
};
