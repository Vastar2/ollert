"use client";
import { FC, useState, useEffect } from "react";
import BoardFilters from "./BoardFilters";
import DragAndDrop from "./DragAndDrop";
import ModalReadAndEditTask from "./ModalReadAndEditTask";
import ModalCreateTask from "./ModalCreateTask";
import Loading from "./Loading";
import dataTemplate from "../data/data.json";
import { handleDragOver, handleDragEnd } from "../utils/index";
import type { ItemField, Task, TBoardData } from "../types";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  const [itemField] = useState<ItemField>("status");
  const [boardData, setBoardData] = useState<TBoardData | null>(null);
  const [currentTaskData, setCurrentTaskData] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<{
    key: string;
    color: string;
  } | null>(null);

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

  return (
    <>
      {boardData ? (
        <div>
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
              onNewtask={(key, color) => setNewTaskStatus({ key, color })}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
      <ModalReadAndEditTask
        currentTaskData={currentTaskData}
        resetTaskModal={() => setCurrentTaskData(null)}
      />
      <ModalCreateTask
        newTaskStatus={newTaskStatus}
        resetNewTaskStatus={() => setNewTaskStatus(null)}
        onSetNewTask={(id, taskName, taskDescription, key) =>
          setBoardData((prev: any) => ({
            ...prev,
            array: [
              ...prev.array,
              {
                id,
                title: taskName,
                description: taskDescription,
                status: key,
              },
            ],
          }))
        }
      />
    </>
  );
};

export default Board;
