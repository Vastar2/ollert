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

  console.log(boardData);

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
            onAddNewColumn={(newColumnName, newColumnColor) =>
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
              )
            }
            onDeleteBoard={(boardId) => {
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
            }}
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
                setBoardData(
                  (prev: TBoardData | null) =>
                    prev && {
                      ...prev,
                      array: newArray,
                    }
                )
              }
              onNewtask={(key, color) => setNewTaskStatus({ key, color })}
              onDeleteColumn={(status) => {
                setBoardData(
                  (prev: TBoardData | null) =>
                    prev && {
                      ...prev,
                      columns: prev.columns.filter((item: TColumn) => {
                        return item.name !== status;
                      }),
                      array: prev.array.filter(
                        (item: TTask) => item.status !== status
                      ),
                    }
                );
              }}
              onChangeColumnColor={(key, newColumnColor) => {
                setBoardData(
                  (prev: TBoardData | null) =>
                    prev && {
                      ...prev,
                      columns: [
                        ...prev.columns.slice(
                          0,
                          prev.columns.findIndex(
                            (item: TColumn) => item.name === key
                          )
                        ),
                        {
                          ...prev.columns[
                            prev.columns.findIndex(
                              (item: TColumn) => item.name === key
                            )
                          ],
                          name: key,
                          color: newColumnColor,
                        },
                        ...prev.columns.slice(
                          prev.columns.findIndex(
                            (item: TColumn) => item.name === key
                          ) + 1,
                          prev.columns.length
                        ),
                      ],
                    }
                );
              }}
              onMoveColumn={(key, dirrection, oldPriority) => {
                // console.log("----", key, dirrection, oldPriority, boardData);

                setBoardData((prev: any) => {
                  const temp = [...prev.columns];

                  console.log(temp);

                  const oldIndex = prev.columns.findIndex(
                    (item: TColumn) => item.name === key
                  );
                  const newIndex =
                    dirrection === "left" ? oldIndex - 1 : oldIndex + 1;

                  const temp2 = temp.filter(
                    (item, index) => index !== oldIndex && index !== newIndex
                  );
                  // .filter((item, index) => index !== newIndex);

                  const newOriginalTask = prev.columns[oldIndex];
                  const newPartnerTask = prev.columns[newIndex];

                  newOriginalTask.priority =
                    dirrection === "left" ? oldPriority - 1 : oldPriority + 1;
                  newPartnerTask.priority = oldPriority;

                  temp2.push(newOriginalTask, newPartnerTask);

                  console.log(
                    // oldIndex,
                    // newIndex,
                    // temp,
                    // newOriginalTask,
                    // newPartnerTask,
                    temp2
                  );

                  // const newPriority =
                  //   dirrection === "left" ? oldPriority - 1 : oldPriority + 1;

                  // const originalTask = {
                  //   ...prev.columns[prev.columns.indexOf(
                  //     (item: TColumn) => item.priority === oldPriority
                  //   ),
                  // };
                  // const partnerTask = {
                  //   ...prev.columns[prev.columns.indexOf(
                  //     (item: TColumn) => item.priority === newPriority
                  //   ),
                  // };

                  // originalTask.priority = newPriority;
                  // partnerTask.priority = oldPriority;

                  // console.log(originalTask, partnerTask);

                  // if (newIndex >= resultColumnsArray.length) {
                  //   var temp = newIndex - resultColumnsArray.length + 1;
                  //   while (temp--) {
                  //     resultColumnsArray.push(undefined);
                  //   }
                  // }

                  // resultColumnsArray.splice(
                  //   newPriority,
                  //   0,
                  //   resultColumnsArray.splice(oldPriority, 1)[0]
                  // );

                  // return {
                  //   ...prev,
                  //   columns: [...prev.columns],
                  // };
                  // });

                  // setBoardData((prev: any) => {
                  //   const resultColumnsArray = [...prev.columns];
                  //   const oldIndex = prev.columns.findIndex(
                  //     (item: any) => item.name === key
                  //   );
                  //   const newIndex =
                  //     dirrection === "left" ? oldIndex - 1 : oldIndex + 1;
                  //   if (newIndex >= resultColumnsArray.length) {
                  //     var temp = newIndex - resultColumnsArray.length + 1;
                  //     while (temp--) {
                  //       resultColumnsArray.push(undefined);
                  //     }
                  //   }
                  //   resultColumnsArray.splice(
                  //     newIndex,
                  //     0,
                  //     resultColumnsArray.splice(oldIndex, 1)[0]
                  //   );

                  return {
                    ...prev,
                    columns: temp2,
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
        }}
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
