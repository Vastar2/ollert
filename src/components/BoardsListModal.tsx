"use client";
import { FC, useEffect, useState } from "react";
import BoardsList from "./BoardsList";
import BoardsListNewBoard from "./BoardsListNewBoard";
import { TBoardsListData } from "../types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { random } from "lodash";

interface BoardsListModalProps {
  isBoardsList: boolean;
  onToggleBoardsList: () => void;
}

const BoardsListModal: FC<BoardsListModalProps> = ({
  isBoardsList,
  onToggleBoardsList,
}) => {
  const [isNewBoard, setIsNewBoard] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardsListData, setBoardsListData] = useState<
    TBoardsListData[] | null
  >(null);
  const { push } = useRouter();
  const errorName = () =>
    toast.error("The name must be at least 3 characters long");

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");
    setBoardsListData(
      storedData &&
        JSON.parse(storedData).map((item: TBoardsListData) => ({
          boardId: item?.boardId,
          boardName: item?.boardName,
          isFavorite: item?.isFavorite,
        }))
    );
  }, []);

  useEffect(() => {
    setIsNewBoard(false);
    setBoardName("");
  }, [isBoardsList]);

  const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = random(999999);
    const localData = localStorage.getItem("boardData");

    if (boardName.length < 3) {
      errorName();
      return;
    }

    if (localData) {
      const updatedData = [
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
          columns: [],
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

    setIsNewBoard(false);
    setBoardName("");
  };

  return (
    <div
      className="absolute z-50 top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#00000040] dark:bg-[#00000020]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onToggleBoardsList();
        }
      }}
    >
      <div className="absolute top-0 left-0 pr-2 overflow-hidden flex">
        <BoardsList
          boardsListData={boardsListData}
          setBoardsListData={setBoardsListData}
        />
        <BoardsListNewBoard
          isNewBoard={isNewBoard}
          onAddBoard={(e) => handleAddBoard(e)}
          boardName={boardName}
          onSetBoardName={(newName) => setBoardName(newName)}
          onSetIsNewBoard={(value) => setIsNewBoard(value)}
        />
      </div>
      <div className="round-up absolute left-[340px]"></div>
    </div>
  );
};

export default BoardsListModal;
