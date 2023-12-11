"use client";
import { FC, useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import { TTask, TColumn } from "../types";
import { MdAdd } from "react-icons/md";
import DragAndDropColumnHeader from "./DragAndDropColumnHeader";

type ItemsType = Record<string, { priority: number; array: TTask[] }>;

export interface DragAndDropProps {
  columns: TColumn[];
  onChangeOver: (
    event: DragOverEvent,
    setItems: React.Dispatch<
      React.SetStateAction<
        Record<string, { priority: number; array: TTask[] }> | undefined
      >
    >,
    items: ItemsType
  ) => void;
  onChangeEnd: (
    event: DragEndEvent,
    items: ItemsType,
    setItems: React.Dispatch<
      React.SetStateAction<
        Record<string, { priority: number; array: TTask[] }> | undefined
      >
    >,
    arrayMove: (arr: TTask[], from: number, to: number) => TTask[],
    onChangeResultArray: any
  ) => void;
  onSetCurrentTaskData: (taskData: TTask | null, color: string) => void;
  onChangeResultArray: (newArray: any) => void;
  onNewtask: (key: string, color: string) => void;
  onDeleteColumn: (status: string) => void;
  onChangeColumnColor: (key: string, newColumnColor: string) => void;
  onMoveColumn: (key: string, dirrection: string, priority: number) => void;
  sortingParameter: string;
}

const DragAndDrop: FC<DragAndDropProps> = ({
  columns,
  onChangeOver,
  onChangeEnd,
  onSetCurrentTaskData,
  onChangeResultArray,
  onNewtask,
  onDeleteColumn,
  onChangeColumnColor,
  onMoveColumn,
  sortingParameter,
}) => {
  const [items, setItems] =
    useState<Record<string, { priority: number; array: TTask[] }>>();
  const [resultArray, setResultArray] = useState<
    [string, { priority: number; array: TTask[] }][] | null
  >(null);

  const sensors = useDefaultSensors();

  useEffect(() => {
    if (!!items && sortingParameter === "priority") {
      const result = Object.entries(items).sort(
        ([keyA, valueA], [keyB, valueB]) => valueA.priority - valueB.priority
      );
      setResultArray(result);
    } else if (!!items && sortingParameter === "name") {
      const result = Object.entries(items).sort(
        ([keyA, valueA], [keyB, valueB]) => keyA.localeCompare(keyB)
      );
      setResultArray(result);
    }
  }, [items, sortingParameter]);

  useEffect(() => {
    const getItems = () => {
      const resultItems: Record<string, { priority: number; array: TTask[] }> =
        {};

      const finalColumns = [...columns];

      finalColumns.forEach((item) => {
        resultItems[item.name] = {
          priority: item.priority,
          array: [...item.array],
        };
      });

      setItems(resultItems);
    };
    getItems();
  }, [columns]);

  return (
    <div className="px-6 select-none flex gap-4 justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => onChangeOver(event, setItems, items ?? {})}
        onDragEnd={(event) =>
          onChangeEnd(
            event,
            items as ItemsType,
            setItems,
            arrayMove,
            onChangeResultArray
          )
        }
      >
        {!!resultArray &&
          resultArray.map(([key, value], _) => {
            return (
              <div
                key={key}
                className="min-h-full h-[calc(100vh-224px)] pt-4 p-2 container-main relative"
              >
                <DragAndDropColumnHeader
                  sortingParameter={sortingParameter}
                  columns={columns}
                  name={key}
                  onMoveColumn={onMoveColumn}
                  onChangeColumnColor={onChangeColumnColor}
                  onDeleteColumn={onDeleteColumn}
                />
                <SortableList
                  items={value.array}
                  id={key}
                  columns={columns}
                  onSetCurrentTaskData={onSetCurrentTaskData}
                />
                <button
                  type="button"
                  onClick={() =>
                    onNewtask(
                      key,
                      columns.filter((item) => item.name === key)[0].color
                    )
                  }
                  className="flex items-center duration-300 ml-auto mr-auto border w-full justify-center py-2 rounded-custom hover:bg-darkWhite mt-4"
                >
                  New task
                  <MdAdd className="ml-1 rounded-custom w-7 h-7 flex justify-center items-center text-accent" />
                </button>
              </div>
            );
          })}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
