"use client";
import { FC, useEffect, useState } from "react";
import BoardsList from "./BoardsList";
import BoardsListNewBoard from "./BoardsListNewBoard";
import { TBoardsListData } from "../types";
import { useRouter } from "next/navigation";

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
  }, [localStorage.getItem("boardData")]);

  useEffect(() => {
    setIsNewBoard(false);
    setBoardName("");
  }, [isBoardsList]);

  if (!isBoardsList) return null;

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

    setIsNewBoard(false);
    setBoardName("");
  };

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
        <BoardsList boardsListData={boardsListData} />
        <BoardsListNewBoard
          isNewBoard={isNewBoard}
          onAddBoard={(e) => handleAddBoard(e)}
          boardName={boardName}
          onSetBoardName={(newName) => setBoardName(newName)}
          onSetIsNewBoard={(value) => setIsNewBoard(value)}
        />
      </div>
      <div className="round-up absolute left-[340px]"></div>
      <div className="round-down absolute left-[340px] -bottom-[15px] bg-red-300"></div>
    </div>
  );
};

export default BoardsListModal;
