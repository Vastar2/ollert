"use client";
import Layout from "../src/components/Layout";
import { useState, useEffect } from "react";
import { TBoardsListData } from "../src/types";
import { useRouter } from "next/navigation";
import { MdStar, MdStarBorder } from "react-icons/md";
import Link from "next/link";

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
      {boardsListData?.length ? (
        <ul className="px-6 select-none flex gap-4 justify-center max-w-[648px] ml-auto mr-auto">
          {boardsListData?.map((item) => (
            <li key={item.boardId} className="w-[200px] h-[80px]">
              <Link
                className="container-main duration-300 hover:bg-darkWhite flex items-center h-full"
                href={{ pathname: `/board/${item.boardId}` }}
              >
                <div className="mr-2">
                  {item.isFavorite ? (
                    <MdStar className="text-2xl text-[orange]" />
                  ) : (
                    <MdStarBorder className="text-2xl" />
                  )}
                </div>
                <p>{item.boardName}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-center text-lightGray">Add your first board</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
