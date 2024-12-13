import axiosInstance from "@/axiosInstance";
import { useViewportBreakpoint } from "@/hooks/useViewportBreakpoint";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VectorLeft from "@/assets/vector-left.svg";
import VectorRight from "@/assets/vector-right.svg";
import Pagination from "@/components/ui/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export const GridSystem = ({
  breakpoints = [],
  numOfRows,
  ComponentLoading,
  ComponentDisplay,
  classNameOfGrid,
  endPoint,
}) => {
  const columnCount = useViewportBreakpoint(breakpoints, "columns");
  const limit = columnCount * numOfRows;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { language, checkLanguage } = useLanguage();
  const [AllListOfData, setAllListOfData] = useState([]);
  let controller;
  const fetchData = useCallback(async () => {
    if (controller) controller.abort(); // Cancel the previous request
    controller = new AbortController();
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${endPoint}?page=${currentPage}&limit=${limit}`, 
        {
          signal: controller.signal,
        }
      );
      setTotalPages(response.data.pagination.numberOfPages);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(endPoint);
      setAllListOfData(response.data.docs)
    })();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const renderData = () => {
    if (loading) {
      return [...Array(limit)].map((_, index) => (
        <ComponentLoading key={index} />
      ));
    }

    return data?.docs?.map((props, index) => (
      <ComponentDisplay
        key={props._id}
        listOfDate={AllListOfData}
        myIndexInSlice={index}
        myIndexInList={
          (data.pagination.currentPage - 1) * data.pagination.limit + index
        }
        {...props}
      />
    ));
  };
  return (
    <div className="flex flex-col flex-1 gap-8">
      <div className={`grid justify-center items-center ${classNameOfGrid}`}>
        {renderData()}
      </div>
      <div
        className={`flex items-center justify-center gap-4 ${checkLanguage(
          "",
          "flex-row-reverse"
        )}`}
      >
        <Button
          intent={"black"}
          onClick={handlePreviousPage}
          classsName={`w-max-400:!px-[.5rem] ${currentPage === 1 ? "bg-[#aeb1bb]" : ""}`}
        >
          <VectorLeft /> {checkLanguage("Back", "خلف")}
        </Button>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Button
          intent={"black"}
          onClick={handleNextPage}
          classsName={`w-max-400:!px-[.5rem] ${currentPage === totalPages ? "bg-[#aeb1bb]" : ""}`}
        >
          {checkLanguage("Next", "التالي")} <VectorRight />
        </Button>
      </div>
    </div>
  );
};
