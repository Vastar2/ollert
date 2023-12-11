import { MdAdd, MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { HexColorPicker } from "react-colorful";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { TColumn } from "../types";

interface BoardFiltersTitleNewColumnProps {
  onAddNewColumn: (newColumnName: string, newColumnColor: string) => void;
  boardColumns: TColumn[];
}

const BoardFiltersTitleNewColumn: FC<BoardFiltersTitleNewColumnProps> = ({
  onAddNewColumn,
  boardColumns,
}) => {
  const [newColumnName, setNewColumnName] = useState<null | string>(null);
  const [newColumnColor, setNewColumnColor] = useState("#EE4B4B");
  const errorName = () =>
    toast.error("The name must be at least 3 characters long");
  const errorNameExist = () => toast.error("This name is already exists");

  return (
    <div className="relative">
      <button
        onClick={() => setNewColumnName("")}
        type="button"
        className={twMerge(
          newColumnName !== null
            ? "select-none cursor-default hover:bg-mainWhite opacity-60"
            : "duration-300 hover:bg-darkWhite",
          "flex items-center py-2 px-4 rounded-custom"
        )}
      >
        <p>Add column</p>
        <MdAdd
          className={twMerge(
            newColumnName !== null ? "text-mainGray" : "text-accent",
            "ml-1 duration-300 w-7 h-7 flex justify-center items-center text-4xl"
          )}
        />
      </button>
      {newColumnName !== null && (
        <div className="absolute mt-6 container-main z-50 w-[220px] -right-4">
          <label className="block mb-3">
            <p className="text-sm text-lightGray mb-2">Column name</p>
            <input
              type="text"
              value={newColumnName}
              className="input-main"
              onChange={(e) => setNewColumnName(e.target.value)}
              autoFocus
            />
          </label>
          <p className="text-sm text-lightGray mb-2">Column color</p>
          <div className="mb-3 color-input example border border-1 border-lightGray rounded-custom">
            <HexColorPicker
              color={newColumnColor}
              onChange={setNewColumnColor}
            />
          </div>
          <button
            type="button"
            className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-accent w-full justify-center py-2 rounded-custom text-accent"
            onClick={() => {
              if (newColumnName.length < 3) {
                errorName();
              } else if (
                boardColumns.some((value) => value.name === newColumnName)
              ) {
                errorNameExist();
              } else {
                onAddNewColumn(newColumnName, newColumnColor);
                setNewColumnName(null);
              }
            }}
          >
            Create
          </button>
          <button
            className="text-xl button-small ml-1 absolute top-2 right-2"
            onClick={() => setNewColumnName(null)}
            type="button"
          >
            <MdClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardFiltersTitleNewColumn;
