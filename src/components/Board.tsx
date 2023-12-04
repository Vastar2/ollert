"use client";
import { FC, useState, useEffect } from "react";
import BoardFilters from "./BoardFilters";
import DragAndDrop from "./DragAndDrop";
import ModalReadAndEditTask from "./ModalReadAndEditTask";
import ModalCreateTask from "./ModalCreateTask";
import Loading from "./Loading";
import { handleDragOver, handleDragEnd } from "../utils/index";
import type { TItemField, TTask, TBoardData, TColumn } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BoardProps {
  pathname: string;
}

const Board: FC<BoardProps> = ({ pathname }) => {
  const [itemField] = useState<TItemField>("status");
  const [boardData, setBoardData] = useState<TBoardData | null>(null);
  const [currentTaskData, setCurrentTaskData] = useState<TTask | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<{
    key: string;
    color: string;
  } | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");
    const pathNumber = Number(
      pathname.split("/")[pathname.split("/").length - 1]
    );

    if (storedData) {
      setBoardData(
        JSON.parse(storedData).filter(
          (item: TBoardData) => item.boardId === pathNumber
        )[0]
      );
    }
  }, [boardData?.boardId, pathname]);

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");

    if (boardData !== null && storedData !== null && storedData.length > 0) {
      if (
        !JSON.parse(storedData).some(
          (item: TBoardData) => boardData.boardId === item.boardId
        )
      ) {
        localStorage.setItem(
          "boardData",
          JSON.stringify([boardData, ...JSON.parse(storedData)])
        );
      } else {
        const index = JSON.parse(storedData).findIndex(
          (item: TBoardData) => item.boardId === boardData.boardId
        );
        const finalStoredData = [
          ...JSON.parse(storedData).slice(0, index),
          boardData,
          ...JSON.parse(storedData).slice(
            index + 1,
            JSON.parse(storedData).length
          ),
        ];

        localStorage.setItem("boardData", JSON.stringify([...finalStoredData]));
      }
    } else if (
      (boardData !== null && storedData === null) ||
      (boardData !== null && storedData !== null && storedData.length === 0)
    ) {
      localStorage.setItem("boardData", JSON.stringify([boardData]));
    }
  }, [boardData]);

  const handleAddNewColumn = (newColumnName: string, newColumnColor: string) =>
    setBoardData(
      (prev: TBoardData | null) =>
        prev && {
          ...prev,
          columns: [
            ...prev.columns,
            {
              name: newColumnName,
              color: newColumnColor,
              priority: prev.columns.length + 1,
            },
          ],
        }
    );

  const handleDeleteBoard = (boardId: number) => {
    const localData = localStorage.getItem("boardData");
    if (localData) {
      const updatedData = [
        ...JSON.parse(localData).filter(
          (item: TBoardData) => item.boardId !== boardId
        ),
      ];
      localStorage.setItem("boardData", JSON.stringify(updatedData));
      push("/");
    }
  };

  const handleDeleteColumn = (status: string) => {
    setBoardData(
      (prev: TBoardData | null) =>
        prev && {
          ...prev,
          columns: prev.columns.filter((item: TColumn) => {
            return item.name !== status;
          }),
          array: prev.array.filter((item: TTask) => item.status !== status),
        }
    );
  };

  const handleChangeColumnColor = (key: string, newColumnColor: string) => {
    setBoardData(
      (prev: TBoardData | null) =>
        prev && {
          ...prev,
          columns: [
            ...prev.columns.slice(
              0,
              prev.columns.findIndex((item: TColumn) => item.name === key)
            ),
            {
              ...prev.columns[
                prev.columns.findIndex((item: TColumn) => item.name === key)
              ],
              name: key,
              color: newColumnColor,
            },
            ...prev.columns.slice(
              prev.columns.findIndex((item: TColumn) => item.name === key) + 1,
              prev.columns.length
            ),
          ],
        }
    );
  };

  const handleMoveColumn = (
    key: string,
    dirrection: string,
    oldPriority: number
  ) => {
    setBoardData((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((item: TColumn) =>
          item.name === key
            ? {
                ...item,
                priority:
                  dirrection === "left" ? oldPriority - 1 : oldPriority + 1,
              }
            : item.priority ===
              (dirrection === "left" ? oldPriority - 1 : oldPriority + 1)
            ? {
                ...item,
                priority: oldPriority,
              }
            : item
        ),
      };
    });
  };

  const handleUpdateTask = (
    id: number,
    taskName: string,
    taskDescription: string,
    status: string
  ) => {
    setBoardData(
      (prev: TBoardData | null) =>
        prev && {
          ...prev,
          array: [
            ...prev.array.slice(
              0,
              prev.array.findIndex((item: TTask) => item.id === id)
            ),
            {
              id,
              title: taskName,
              description: taskDescription,
              status,
            },
            ...prev.array.slice(
              prev.array.findIndex((item: TTask) => item.id === id) + 1,
              prev.array.length
            ),
          ],
        }
    );
    setCurrentTaskData(
      (prev) =>
        prev && { ...prev, title: taskName, description: taskDescription }
    );
  };

  return (
    <>
      {boardData ? (
        <div>
          <BoardFilters
            isFavorite={boardData?.isFavorite}
            boardName={boardData?.boardName}
            boardId={boardData?.boardId}
            onToggleFavorite={() =>
              setBoardData(
                (prev: TBoardData | null) =>
                  prev && {
                    ...prev,
                    isFavorite: !prev.isFavorite,
                  }
              )
            }
            onChangeName={(newBoardName) =>
              setBoardData(
                (prev: TBoardData | null) =>
                  prev && {
                    ...prev,
                    boardName: newBoardName,
                  }
              )
            }
            onAddNewColumn={handleAddNewColumn}
            onDeleteBoard={handleDeleteBoard}
          />
          {boardData.columns.length ? (
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
                setBoardData(
                  (prev: TBoardData | null) =>
                    prev && {
                      ...prev,
                      array: newArray,
                    }
                )
              }
              onNewtask={(key, color) => setNewTaskStatus({ key, color })}
              onDeleteColumn={handleDeleteColumn}
              onChangeColumnColor={handleChangeColumnColor}
              onMoveColumn={handleMoveColumn}
            />
          ) : (
            <div className="w-96 pt-12 ml-auto mr-auto relative">
              <Image
                src="/nothing.png"
                alt="Nothing image"
                priority
                width={400}
                height={0}
                className="ml-auto mr-auto"
              />
              <p className="text-center text-lightGray">
                Add your first column
              </p>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <ModalReadAndEditTask
        currentTaskData={currentTaskData}
        resetTaskModal={() => setCurrentTaskData(null)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={(id) => {
          setBoardData(
            (prev: TBoardData | null) =>
              prev && {
                ...prev,
                array: prev.array.filter((item: TTask) => {
                  return item.id !== id;
                }),
              }
          );
        }}
      />
      <ModalCreateTask
        newTaskStatus={newTaskStatus}
        resetNewTaskStatus={() => setNewTaskStatus(null)}
        onSetNewTask={(id, taskName, taskDescription, key) =>
          setBoardData(
            (prev: TBoardData | null) =>
              prev && {
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
              }
          )
        }
      />
    </>
  );
};

export default Board;
