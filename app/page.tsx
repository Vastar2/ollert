"use client";
import Layout from "../src/components/Layout";
import { useState, useEffect } from "react";
import { TBoardsListData } from "../src/types";
import { MdSdCardAlert, MdStar, MdStarBorder } from "react-icons/md";
import Link from "next/link";
import { MdArrowForwardIos, MdHistory } from "react-icons/md";

const App = () => {
  const [boardsListData, setBoardsListData] = useState<
    TBoardsListData[] | null
  >(null);

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");
    setBoardsListData(
      storedData &&
        JSON.parse(storedData).map((item: TBoardsListData) => ({
          boardId: item.boardId,
          boardName: item.boardName,
          isFavorite: item.isFavorite,
        }))
    );
  }, []);

  return (
    <Layout>
      <div className="h-[calc(100%-100px)] px-6 flex justify-center gap-4">
        <div className="w-[30%] px-6 select-none container-main">
          <p className="mb-4 text-center text-superLightGray">My boards</p>
          {boardsListData?.length ? (
            <ul className="overflow-auto">
              {boardsListData?.map((item) => (
                <li key={item.boardId} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const storedData = localStorage.getItem("boardData");
                      setBoardsListData((prev) =>
                        prev
                          ? prev.map((value) =>
                              value.boardId === item.boardId
                                ? { ...value, isFavorite: !value.isFavorite }
                                : value
                            )
                          : null
                      );
                      localStorage.setItem(
                        "boardData",
                        JSON.stringify(
                          storedData
                            ? [
                                ...JSON.parse(storedData)?.map((value: any) =>
                                  value.boardId === item.boardId
                                    ? {
                                        ...value,
                                        isFavorite: !value.isFavorite,
                                      }
                                    : value
                                ),
                              ]
                            : null
                        )
                      );
                    }}
                    className="mr-2"
                  >
                    {item.isFavorite ? (
                      <MdStar className="text-2xl text-[orange]" />
                    ) : (
                      <MdStarBorder className="text-2xl" />
                    )}
                  </button>
                  <Link
                    className="px-4 py-2 flex-grow rounded-custom group duration-300 hover:bg-darkWhite flex items-center h-full"
                    href={{ pathname: `/board/${item.boardId}` }}
                  >
                    <p>{item.boardName}</p>
                    <MdArrowForwardIos className="ml-auto opacity-0 duration-300 text-lightGray group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="container-main w-[30%] flex items-center justify-center">
              <MdHistory className="text-lightGray mr-2" />
              <p className="text-center text-lightGray">
                List of boards is clear
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
