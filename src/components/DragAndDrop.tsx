import { FC } from "react";
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
import { ItemField, Task } from "../types";
import { MdAdd } from "react-icons/md";
import { getColor } from "../utils";

type ItemsType = Record<string, Task[]>;

export interface DragAndDropProps {
  columns: string[];
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
    itemField: ItemField
  ) => void;
}

const DragAndDrop: FC<DragAndDropProps> = ({
  columns,
  itemField,
  itemsOriginal,
  onChangeOver,
  onChangeEnd,
}) => {
  const { items, setItems } = useGetItems({
    columns,
    itemsOriginal,
    itemField,
  });
  const sensors = useDefaultSensors();

  return (
    <div className="px-6 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => onChangeOver(event, setItems, items ?? {})}
        onDragEnd={(event) =>
          onChangeEnd(event, items as ItemsType, setItems, arrayMove, itemField)
        }
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => {
            return (
              <div
                key={index}
                className="min-h-full h-[calc(100vh-212px)] mr-4 last-of-type:mr-0 pt-4 p-2 container-main"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className="w-4 h-4 rounded-[50%]"
                    style={{ backgroundColor: getColor(key) }}
                  ></span>
                  <p className="font-[600] text-xl">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
                <SortableList items={value} id={key} itemField={itemField} />

                <button
                  type="button"
                  // onClick={}
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
