import axiosInstance from "@/axiosInstance";
import { Table } from "@/components/ui/table";
import { formatDate } from "@/utils/formateDate";
import React, { useEffect, useState } from "react";

const columns = [
  { key: "name", header: "اسم العميل" },
  { key: "message", header: "التعليق" },
  { key: "phone", header: "رقم الهاتف" },
  { key: "email", header: "ألحساب الألكتروني" },
];
export const DashboardContactRoute = () => {
  const [data, setData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("contact", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(
          response.data.docs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((doc) => ({
              _id: doc._id,
              name: doc.name,
              email: doc.email,
              message: doc.message,
              phone: doc.phoneNumber,
            }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const handleRowSelect = (selected) => {
    console.log(selectedRows);
    setSelectedRows(selected);
  };
  return (
    <div className="p-5 w-max-400:p-[.5rem]">
      <div className="bg-[#FAFAFA] rounded-2xl p-5">
        <h1 className="p-5 border-b-[.5px] border-b-[rgba(35,35,33,0.20)]">
          طلبات التواصل
        </h1>
        {data && (
          <Table
            columns={columns}
            data={data}
            customStyles={"p-4 overflow-auto h-[80vh]"}
            headerStyle={
              "!py-5 border-b-[.5px] border-b-[rgba(35,35,33,0.20)] text-center text-[rgba(35,35,33,0.80)] font-semibold text-base"
            }
            onRowSelect={handleRowSelect}
            rowStyle={
              "!py-5 border-b-[.5px] border-b-[rgba(35,35,33,0.20)] text-center items-center font-normal text-base"
            }
          />
        )}
      </div>
    </div>
  );
};
