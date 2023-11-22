import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import { getLightColor } from "../utils/index";
import { ItemField, Task } from "../types";
import { getColor } from "../utils";
import { twMerge } from "tailwind-merge";

interface SortableItemProps {
  item: Task;
  id: string;
  itemField: ItemField;
  activeId: null | number;
}

const SortableItem: FC<SortableItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

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
        props.activeId === props.item.id ? "relative" : "relative",
        "text-lg border bg-gray-50 rounded-custom p-3 pt-4 mb-2  last-of-type:mb-0 overflow-hidden"
      )}
    >
      <div
        className="h-2 w-full absolute top-0 left-0"
        style={{ backgroundColor: getColor(props.id) }}
      ></div>
      <p className="font-semibold mb-2">
        {props.item.title}
        <span
          className={`font-normal ml-3 rounded-custom px-2 py-1 text-sm`}
          style={{ backgroundColor: getLightColor(props.id) }}
        >
          {props.item[props.itemField]}
        </span>
      </p>
      <p>{props.item.description}</p>
    </li>
  );
};

export default SortableItem;
