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
import { Contrail_One } from "next/font/google";

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

  console.log(boardData);

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
            onAddNewColumn={(newColumnName, newColumnColor) =>
              setBoardData((prev: any) => ({
                ...prev,
                columns: [
                  ...prev.columns,
                  { name: newColumnName, color: newColumnColor },
                ],
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
                taskData && setCurrentTaskData({ ...taskData, color })
              }
              onChangeResultArray={(newArray) =>
                setBoardData((prev: any) => ({
                  ...prev,
                  array: newArray,
                }))
              }
              onNewtask={(key, color) => setNewTaskStatus({ key, color })}
              onDeleteColumn={(status) => {
                setBoardData((prev: any) => ({
                  ...prev,
                  columns: prev.columns.filter((item: any) => {
                    return item.name !== status;
                  }),
                  array: prev.array.filter(
                    (item: any) => item.status !== status
                  ),
                }));
              }}
              onChangeColumnColor={(key, newColumnColor) => {
                setBoardData((prev: any) => ({
                  ...prev,
                  columns: [
                    ...prev.columns.slice(
                      0,
                      prev.columns.findIndex((item: any) => item.name === key)
                    ),
                    { name: key, color: newColumnColor },
                    ...prev.columns.slice(
                      prev.columns.findIndex((item: any) => item.name === key) +
                        1,
                      prev.columns.length
                    ),
                  ],
                }));
              }}
              onMoveColumn={(key, dirrection) => {
                setBoardData((prev: any) => {
                  const resultColumnsArray = [...prev.columns];
                  const oldIndex = prev.columns.findIndex(
                    (item: any) => item.name === key
                  );
                  const newIndex =
                    dirrection === "left" ? oldIndex - 1 : oldIndex + 1;

                  if (newIndex >= resultColumnsArray.length) {
                    var k = newIndex - resultColumnsArray.length + 1;
                    while (k--) {
                      resultColumnsArray.push(undefined);
                    }
                  }

                  resultColumnsArray.splice(
                    newIndex,
                    0,
                    resultColumnsArray.splice(oldIndex, 1)[0]
                  );

                  return {
                    ...prev,
                    columns: [...resultColumnsArray],
                  };
                });
              }}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
      <ModalReadAndEditTask
        currentTaskData={currentTaskData}
        resetTaskModal={() => setCurrentTaskData(null)}
        onUpdateTask={(id, taskName, taskDescription, status) => {
          setBoardData((prev: any) => ({
            ...prev,
            array: [
              ...prev.array.slice(
                0,
                prev.array.findIndex((item: any) => item.id === id)
              ),
              {
                id,
                title: taskName,
                description: taskDescription,
                status,
              },
              ...prev.array.slice(
                prev.array.findIndex((item: any) => item.id === id) + 1,
                prev.array.length
              ),
            ],
          }));
          setCurrentTaskData(
            (prev) =>
              prev && { ...prev, title: taskName, description: taskDescription }
          );
        }}
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
