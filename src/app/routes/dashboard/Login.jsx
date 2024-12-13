import React, { useEffect, useState } from "react";
import BackgroundImg from "@/assets/dashboard-bg-login-img.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/axiosInstance";
import { useNavigate } from "react-router-dom";
import EyeOpen from "@/assets/eye_open.svg";
import EyeClose from "@/assets/eye_close.svg";

export const DashboardLoginRoute = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );

    if (emptyFields.length > 0) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("admin/login", formData);
      sessionStorage.setItem("token", response.data.accessToken);
      setFormData({
        email: "",
        password: "",
      });
      router("/dashboard/control");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen bg-black relative">
      <div className="absolute p-14 bg-white flex flex-col gap-11 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[57.9375rem] w-max-1020:w-[33.9375rem] w-max-400:w-[28.9375rem] w-max-854:!px-5">
        <h1 className="font-semibold text-3xl text-[#666] text-center">
          تسجيل الدخول
        </h1>
        <label className="text-3xl font-medium">الايميل</label>
        <Input
          intent={"dashboardLogin"}
          type={"text"}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label className="text-3xl font-medium">كلمة المرور</label>
        <div className="relative">
          <Input
            intent={"dashboardLogin"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={"!pr-12 w-full"}
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-3 w-max-854:right-2" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOpen  /> : <EyeClose />}
          </button>
        </div>

        <Button
          intent={"red"}
          classsName={"!rounded-lg"}
          onClick={handleSubmit}
          disabled={loading}
        >
          تسجيل الدخول
        </Button>
        <div>{error && <p className="text-red-500">{error}</p>}</div>
        {/* <input type="text" className="" /> */}
      </div>
      <div className="absolute right-0 left-0 bottom-0">
        <BackgroundImg className="w-full" />
      </div>
    </div>
  );
};
