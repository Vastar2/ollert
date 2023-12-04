"use client";
import { FC, useState } from "react";
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
import { TItemField, TTask, TColumn } from "../types";
import {
  MdAdd,
  MdDelete,
  MdOutlineDone,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BiSolidEyedropper } from "react-icons/bi";
import { HexColorPicker } from "react-colorful";
import { twMerge } from "tailwind-merge";

type ItemsType = Record<string, TTask[]>;

export interface DragAndDropProps {
  columns: TColumn[];
  itemField: TItemField;
  itemsOriginal: TTask[];
  onChangeOver: (
    event: DragOverEvent,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, TTask[]> | undefined>
    >,
    items: ItemsType
  ) => void;
  onChangeEnd: (
    event: DragEndEvent,
    items: ItemsType,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, TTask[]> | undefined>
    >,
    arrayMove: (arr: TTask[], from: number, to: number) => TTask[],
    itemField: TItemField,
    onChangeResultArray: any
  ) => void;
  onSetCurrentTaskData: (taskData: TTask | null, color: string) => void;
  onChangeResultArray: (newArray: any) => void;
  onNewtask: (key: string, color: string) => void;
  onDeleteColumn: (status: string) => void;
  onChangeColumnColor: (key: string, newColumnColor: string) => void;
  onMoveColumn: (key: string, dirrection: string, priority: number) => void;
}

const DragAndDrop: FC<DragAndDropProps> = ({
  columns,
  itemField,
  itemsOriginal,
  onChangeOver,
  onChangeEnd,
  onSetCurrentTaskData,
  onChangeResultArray,
  onNewtask,
  onDeleteColumn,
  onChangeColumnColor,
  onMoveColumn,
}) => {
  const { items, setItems } = useGetItems({
    columns,
    itemsOriginal,
  });
  const [keyOfEditingColumn, setKeyOfEditingColumn] = useState<string | null>(
    null
  );
  const [newColumnColor, setNewColumnColor] = useState("#EE4B4B");

  const sensors = useDefaultSensors();

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
            itemField,
            onChangeResultArray
          )
        }
      >
        {!!items &&
          Object.entries(items)
            .map(([key, value], _) => {
              return (
                <div
                  key={key}
                  className="min-h-full h-[calc(100vh-224px)] pt-4 p-2 container-main relative"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="relative">
                      <div
                        className={twMerge(
                          keyOfEditingColumn === key
                            ? "border-2 border-accent"
                            : "border-2 border-transparent",
                          "w-7 h-7 relative rounded-[50%]"
                        )}
                        style={{
                          backgroundColor: `${
                            columns?.filter((item) => item.name === key)[0]
                              ?.color
                          }60`,
                        }}
                      >
                        <button
                          onClick={() => {
                            setKeyOfEditingColumn(() =>
                              keyOfEditingColumn === key ? null : key
                            );
                            setNewColumnColor(
                              columns.filter((item) => item.name === key)[0]
                                .color
                            );
                          }}
                          className="w-5 h-5 overflow-hidden rounded-[50%] flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <BiSolidEyedropper className="text-xs overflow-hidden" />
                        </button>
                      </div>
                      {keyOfEditingColumn === key && (
                        <div className="flex gap-1 color-input example absolute z-50 top-[38px] mb-2">
                          <HexColorPicker
                            color={newColumnColor}
                            onChange={setNewColumnColor}
                            className="relative -left-1/3 border border-1 border-superLightGray"
                          />
                          <button
                            onClick={() => {
                              onChangeColumnColor(key, newColumnColor);
                              setKeyOfEditingColumn(null);
                              setNewColumnColor("#EE4B4B");
                            }}
                            className="relative -left-1/3 text-lg button-small bg-white h-[38px] w-[38px] border border-1 border-superLightGray"
                            type="button"
                          >
                            <MdOutlineDone className="text-accent" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="font-[600] text-xl">{key}</p>
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
                  <div className="absolute top-3.5 left-2 flex gap-0.5">
                    <button
                      onClick={() =>
                        columns[
                          columns.findIndex((item: any) => item.name === key)
                        ].priority !== 1 &&
                        onMoveColumn(
                          key,
                          "left",
                          columns.filter((item) => item.name === key)[0]
                            .priority
                        )
                      }
                      type="button"
                      className={twMerge(
                        columns[
                          columns?.findIndex((item: any) => item.name === key)
                        ]?.priority === 1
                          ? "button-small select-none cursor-default hover:bg-transparent opacity-40"
                          : "button-small",
                        " text-2xl w-5"
                      )}
                    >
                      <MdOutlineKeyboardArrowLeft />
                    </button>
                    <button
                      onClick={() =>
                        columns[
                          columns.findIndex((item: any) => item.name === key)
                        ].priority !== columns.length &&
                        onMoveColumn(
                          key,
                          "right",
                          columns.filter((item) => item.name === key)[0]
                            .priority
                        )
                      }
                      type="button"
                      className={twMerge(
                        columns[
                          columns.findIndex((item: any) => item.name === key)
                        ].priority === columns.length
                          ? "button-small select-none cursor-default hover:bg-transparent opacity-40"
                          : "button-small",
                        " text-2xl w-5"
                      )}
                    >
                      <MdOutlineKeyboardArrowRight />
                    </button>
                  </div>
                  <button
                    onClick={() => onDeleteColumn(key)}
                    type="button"
                    className={twMerge("absolute top-3.5 right-2 button-small")}
                  >
                    <MdDelete />
                  </button>
                </div>
              );
            })
            .sort((a, b) => {
              return (
                columns.filter((item) => item.name === a.key)[0]?.priority -
                columns.filter((item) => item.name === b.key)[0]?.priority
              );
            })}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
