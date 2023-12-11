import {
  MdDelete,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { twMerge } from "tailwind-merge";
import ColorPicker from "./ColorPicker";
import { FC } from "react";
import { TColumn } from "../types";

interface DragAndDropColumnHeaderProps {
  sortingParameter: string;
  columns: TColumn[];
  name: string;
  onMoveColumn: (key: string, dirrection: string, priority: number) => void;
  onChangeColumnColor: (key: string, newColumnColor: string) => void;
  onDeleteColumn: (status: string) => void;
}

const DragAndDropColumnHeader: FC<DragAndDropColumnHeaderProps> = ({
  sortingParameter,
  columns,
  name,
  onMoveColumn,
  onChangeColumnColor,
  onDeleteColumn,
}) => {
  return (
    <div className="flex items-center relative justify-center mb-3">
      {sortingParameter === "priority" && (
        <div className="flex gap-0.5 mr-auto">
          <button
            onClick={() =>
              columns[columns.findIndex((item: any) => item.name === name)]
                .priority !== 1 &&
              onMoveColumn(
                name,
                "left",
                columns.filter((item) => item.name === name)[0].priority
              )
            }
            type="button"
            className={twMerge(
              columns[columns?.findIndex((item: any) => item.name === name)]
                ?.priority === 1
                ? "button-small select-none cursor-default hover:bg-transparent opacity-40"
                : "button-small",
              " text-2xl w-5"
            )}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            onClick={() =>
              columns[columns.findIndex((item: any) => item.name === name)]
                .priority !== columns.length &&
              onMoveColumn(
                name,
                "right",
                columns.filter((item) => item.name === name)[0].priority
              )
            }
            type="button"
            className={twMerge(
              columns[columns.findIndex((item: any) => item.name === name)]
                ?.priority === columns.length
                ? "button-small select-none cursor-default hover:bg-transparent opacity-40"
                : "button-small",
              " text-2xl w-5"
            )}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
      <div className="absolute ml-auto mr-auto flex items-center justify-center gap-2">
        <ColorPicker
          name={name}
          columns={columns}
          onChangeColumnColor={onChangeColumnColor}
        />
        <p className="font-[600] text-xl">{name}</p>
      </div>
      <button
        onClick={() => onDeleteColumn(name)}
        type="button"
        className="button-small ml-auto"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default DragAndDropColumnHeader;
