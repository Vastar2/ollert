"use client";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const BoardsList = ({ isBoardsList }) => {
  const [isNewBoard, setIsNewBoard] = useState(false);

  if (!isBoardsList) return;

  return (
    <div className="absolute top-[70px] left-0 pr-2 overflow-hidden flex">
      <div className="w-[340px] h-[calc(100vh-70px)] container-main rounded-none">
        <div className="flex items-center h-20">
          <button
            type="button"
            onClick={() => {
              setIsNewBoard(true);
            }}
            className={twMerge(
              isNewBoard
                ? "user text-lightGray select-none cursor-auto"
                : "hover:bg-darkWhite",
              "flex items-center duration-300 ml-auto mr-auto border w-full justify-center py-2 rounded-custom"
            )}
          >
            New board
            <MdAdd className="ml-1 rounded-custom w-7 h-7 flex justify-center items-center" />
          </button>
        </div>
      </div>
      {isNewBoard && (
        <div className="overflow-hidden pr-2 mt-6">
          <div className="round-down absolute left[340px] top-[10px]"></div>
          <div className="w-[340px] h-[168px] container-main rounded-l-none relative pt-5">
            <label htmlFor="">
              <p className="text-lightGray">Board name</p>
              <input
                className="mt-2 w-full block mb-4 py-2 px-4 border border-lightGray rounded-custom"
                type="text"
              />
            </label>
            <button className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-mainGray w-full justify-center py-2 rounded-custom">
              Create
            </button>
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => {
                setIsNewBoard(false);
              }}
              type="button"
            >
              <MdClose />
            </button>
          </div>
          <div className="round-up absolute left[340px]"></div>
        </div>
      )}
      <div className="round-up absolute left-[340px]"></div>
    </div>
  );
};

export default BoardsList;
