"use client";
import { FC, useState, useEffect } from "react";
import BoardFilters from "./BoardFilters";
import DragAndDrop from "./DragAndDrop";
import ModalReadAndEditTask from "./ModalReadAndEditTask";
import dataTemplate from "../data/data.json";
import { handleDragOver, handleDragEnd } from "../utils/index";
import type { ItemField, Task, TBoardData } from "../types";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  const [itemField] = useState<ItemField>("status");
  const [boardData, setBoardData] = useState<TBoardData | null>(null);
  const [currentTaskData, setCurrentTaskData] = useState<Task | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");
    if (storedData) {
      setBoardData(JSON.parse(storedData));
    } else {
      setBoardData(dataTemplate);
    }
  }, []);

  useEffect(() => {
    if (boardData !== null) {
      localStorage.setItem("boardData", JSON.stringify(boardData));
    }
  }, [boardData]);

  // console.log(0, boardData);

  return (
    <>
      <div className="">
        <BoardFilters
          isFavorite={boardData?.isFavorite}
          boardName={boardData?.boardName}
          onToggleFavorite={() =>
            setBoardData((prev: any) => ({
              ...prev,
              isFavorite: !prev.isFavorite,
            }))
          }
          onChangeName={(newBoardName) =>
            setBoardData((prev: any) => ({
              ...prev,
              boardName: newBoardName,
            }))
          }
        />
        {boardData && (
          <DragAndDrop
            columns={boardData?.columns}
            itemField={itemField}
            itemsOriginal={boardData?.array}
            onChangeOver={handleDragOver}
            onChangeEnd={handleDragEnd}
            onSetCurrentTaskData={(taskData, color) =>
              setCurrentTaskData({ ...taskData, color })
            }
            onChangeResultArray={(newArray) =>
              setBoardData((prev: any) => ({
                ...prev,
                array: newArray,
              }))
            }
          />
        )}
      </div>
      <ModalReadAndEditTask
        currentTaskData={currentTaskData}
        resetTaskModal={() => setCurrentTaskData(null)}
      />
      {/* <ModalCreateTask /> */}
    </>
  );
};

export default Board;
