"use client";
import { FC, useEffect, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface BoardsListProps {
  isBoardsList: boolean;
  onToggleBoardsList: () => void;
}

const BoardsList: FC<BoardsListProps> = ({
  isBoardsList,
  onToggleBoardsList,
}) => {
  const [isNewBoard, setIsNewBoard] = useState(false);

  useEffect(() => {
    setIsNewBoard(false);
  }, [isBoardsList]);

  if (!isBoardsList) return null;

  return (
    <div
      className="absolute z-50 top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#00000040]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onToggleBoardsList();
        }
      }}
    >
      <div className="absolute top-0 left-0 pr-2 overflow-hidden flex">
        <div className="w-[340px] h-[calc(100vh-70px)] container-main rounded-none">
          {/* <div className="flex items-center h-20">
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
              <MdAdd
                className={twMerge(
                  isNewBoard ? "text-lightGray" : "text-accent",
                  "ml-1 rounded-custom w-7 h-7 flex justify-center items-center"
                )}
              />
            </button>
          </div> */}
        </div>
        <div className="overflow-hidden pr-2 mt-6">
          <div className="round-down absolute left[340px] top-[10px]"></div>
          {isNewBoard ? (
            <div className="w-[340px] h-[186px] container-main rounded-l-none relative pt-5">
              <label>
                <p>Board name</p>
                <input
                  className="mt-3 w-full block mb-5 py-2 px-4 border border-lightGray rounded-custom focus:outline focus:outline-1 focus:outline-accent"
                  type="text"
                  autoFocus
                />
              </label>
              <button className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-accent w-full justify-center py-2 rounded-custom text-accent">
                Create
              </button>
              <button
                className="absolute top-4 right-4 text-xl text-lightGray duration-300 hover:text-mainGray"
                onClick={() => {
                  setIsNewBoard(false);
                }}
                type="button"
              >
                <MdClose />
              </button>
            </div>
          ) : (
            <div className="w-[30px] h-[186px] container-main rounded-l-none rounded-r-xl relative p-0">
              <button
                type="button"
                onClick={() => {
                  setIsNewBoard(true);
                }}
                className="w-full h-full flex justify-center items-center text-accent rounded-xl duration-300 hover:bg-darkWhite"
              >
                <MdAdd className="rounded-custom w-6 h-6 relative -left-0.5 flex justify-center items-center" />
              </button>
            </div>
          )}
          <div className="round-up absolute left[340px]"></div>
        </div>
      </div>
      <div className="round-up absolute left-[340px]"></div>
      <div className="round-down absolute left-[340px] -bottom-[15px] bg-red-300"></div>
    </div>
  );
};

export default BoardsList;
