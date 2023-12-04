"use client";
import Layout from "../src/components/Layout";
import { useState, useEffect } from "react";
import { TBoardsListData } from "../src/types";
import { useRouter } from "next/navigation";
import { MdStar, MdStarBorder } from "react-icons/md";
import Link from "next/link";

const App = () => {
  const [boardName, setBoardName] = useState("");
  const [boardsListData, setBoardsListData] = useState<
    TBoardsListData[] | null
  >(null);
  const { push } = useRouter();

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

  const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
    const localData = localStorage.getItem("boardData");

    if (localData) {
      const updatedData = [
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
          columns: [],
          array: [],
        },
        ...(Array.isArray(JSON.parse(localData)) ? JSON.parse(localData) : []),
      ];

      setBoardsListData(
        (prev: TBoardsListData[] | null) =>
          prev && [
            ...prev,
            {
              boardId: id,
              boardName: boardName,
              isFavorite: false,
            },
          ]
      );

      localStorage.setItem("boardData", JSON.stringify(updatedData));
      push(`/board/${id}`);
    } else {
      const updatedData = [
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
          columns: [],
          array: [],
        },
      ];

      setBoardsListData([
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
        },
      ]);

      localStorage.setItem("boardData", JSON.stringify(updatedData));
      push(`/board/${id}`);
    }
    setBoardName("");
  };

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
