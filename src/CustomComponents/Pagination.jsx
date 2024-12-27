import React from "react";
import { useDispatch } from "react-redux";
import { refreshDashScroll } from "../slices/otherSlice";
import Button from "./Button";

const Pagination = ({ totalPages, currentPage, goToPreviousPage, goToNextPage, dataLength }) => {
  const dispatch = useDispatch();

  return (
    <>
      {dataLength.length > 0 && (
        <div className="flex justify-between items-center">
          <Button
            value={"Previous"}
            onClick={() => {
              if (currentPage > 1) {
                goToPreviousPage();
                dispatch(refreshDashScroll());
              }
            }}
            disabled={currentPage === 1}
            className={`px-4 py-1 border rounded-[8px] bg-transparent ${
              currentPage === 1
                ? "text-gray-400"
                : "text-[#17ACC3] hover:bg-[#17ACC3] hover:text-white"
            }`}
          />
          <span className="mx-4 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            value={"Next"}
            onClick={() => {
              if (currentPage < totalPages) {
                goToNextPage();
                dispatch(refreshDashScroll());
              }
            }}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 border rounded-[8px] bg-transparent ${
              currentPage === totalPages
                ? "text-gray-400"
                : "text-[#17ACC3] hover:bg-[#17ACC3] hover:text-white"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Pagination;

