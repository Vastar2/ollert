"use client";
import { FC, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import { useGetItems } from "../hooks/useGetItems";
import { ItemField, Task, TColumn } from "../types";
import { MdAdd, MdDelete } from "react-icons/md";

type ItemsType = Record<string, Task[]>;

export interface DragAndDropProps {
  columns: TColumn[];
  itemField: ItemField;
  itemsOriginal: Task[];
  onChangeOver: (
    event: DragOverEvent,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    items: ItemsType
  ) => void;
  onChangeEnd: (
    event: DragEndEvent,
    items: ItemsType,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    arrayMove: (arr: Task[], from: number, to: number) => Task[],
    itemField: ItemField,
    onChangeResultArray: any
  ) => void;
  onSetCurrentTaskData: (taskData: Task | null, color: string) => void;
  onChangeResultArray: (newArray: any) => void;
}

const DragAndDrop: FC<DragAndDropProps> = ({
  columns,
  itemField,
  itemsOriginal,
  onChangeOver,
  onChangeEnd,
  onSetCurrentTaskData,
  onChangeResultArray,
}) => {
  const { items, setItems } = useGetItems({
    columns,
    itemsOriginal,
  });
  const sensors = useDefaultSensors();

  return (
    <div className="px-6 select-none flex justify-center">
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
            itemField,
            onChangeResultArray
          )
        }
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => {
            return (
              <div
                key={index}
                className="min-h-full h-[calc(100vh-224px)] mr-4 last-of-type:mr-0 pt-4 p-2 container-main relative"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div
                    className="w-4 h-4 rounded-[50%] flex justify-center items-center"
                    style={{
                      backgroundColor: `${
                        columns.filter((item) => item.name === key)[0].color
                      }60`,
                    }}
                  ></div>
                  <p className="font-[600] text-xl">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
                <SortableList
                  items={value}
                  id={key}
                  itemField={itemField}
                  columns={columns}
                  onSetCurrentTaskData={onSetCurrentTaskData}
                />

                <button
                  type="button"
                  // onClick={}
                  className="flex items-center duration-300 ml-auto mr-auto border w-full justify-center py-2 rounded-custom hover:bg-darkWhite mt-4"
                >
                  New task
                  <MdAdd className="ml-1 rounded-custom w-7 h-7 flex justify-center items-center text-accent" />
                </button>
                <button
                  // onClick={}
                  type="button"
                  className="absolute top-3.5 right-2 button-small"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
