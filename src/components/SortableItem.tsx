import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import { TItemField, TTask, TColumn } from "../types";
import { twMerge } from "tailwind-merge";
import { RxDragHandleDots1 } from "react-icons/rx";

interface SortableItemProps {
  item: TTask;
  id: string;
  itemField: TItemField;
  columns: TColumn[];
  onSetCurrentTaskData: (taskData: TTask | null, color: string) => void;
}

const SortableItem: FC<SortableItemProps> = ({
  columns,
  id,
  item,
  itemField,
  onSetCurrentTaskData,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, animateLayoutChanges: () => false });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={twMerge(
        "text-lg border bg-gray-50 rounded-custom p-3 pt-4 mb-2  last-of-type:mb-0 relative z-[40] overflow-hidden"
      )}
      onClick={() =>
        onSetCurrentTaskData(
          item,
          columns.filter((item) => item.name === id)[0].color
        )
      }
    >
      <div
        className="h-2 w-full absolute top-0 left-0"
        style={{
          backgroundColor: columns.filter((item) => item.name === id)[0]?.color,
        }}
      ></div>
      <p className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden w-[210px]">
        {item.title}
      </p>
      <span
        className={`inline-block font-normal rounded-custom px-1.5 py-1 text-xs mb-2`}
        style={{
          backgroundColor: `${
            columns.filter((item) => item.name === id)[0]?.color
          }30`,
        }}
      >
        {item[itemField]}
      </span>
      <p
        className="text-base text-halfLightGray h-[48px] text-ellipsis overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {item.description}
      </p>
      <RxDragHandleDots1 className="text-3xl absolute top-4 right-1 text-superLightGray" />
    </li>
  );
};

export default SortableItem;
