import {
  MdEdit,
  MdStar,
  MdStarBorder,
  MdAdd,
  MdOutlineDone,
  MdClose,
  MdDelete,
} from "react-icons/md";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { HexColorPicker } from "react-colorful";

interface BoardFiltersProps {
  isFavorite: boolean | undefined;
  boardName: string | undefined;
  onToggleFavorite: () => void;
  onChangeName: (newBoardName: string) => void;
  onAddNewColumn: (newColumnName: string, newColumnColor: string) => void;
}

const BoardFilters: FC<BoardFiltersProps> = ({
  isFavorite,
  boardName,
  onToggleFavorite,
  onChangeName,
  onAddNewColumn,
}) => {
  const [editedBoardName, setEditedBoardName] = useState("");
  const [newColumnName, setNewColumnName] = useState<null | string>(null);
  const [newColumnColor, setNewColumnColor] = useState("#EE4B4B");

  return (
    <div className="container-main max-w-[640px] ml-auto mr-auto flex items-center justify-between h-[70px] mb-6">
      <div className="flex items-center">
        <button
          onClick={onToggleFavorite}
          type="button"
          className="mr-2 button-small"
        >
          {isFavorite ? (
            <MdStar className="text-2xl text-[orange]" />
          ) : (
            <MdStarBorder className="text-2xl" />
          )}
        </button>
        {!editedBoardName ? (
          <>
            <p className="mr-2 text-2xl font-[600] underline decoration-accent pl-[9px]">
              {boardName}
            </p>
            <button
              onClick={() => setEditedBoardName(boardName || "404")}
              type="button"
              className="button-small"
            >
              <MdEdit className="text-xl" />
            </button>
            <button
              onClick={() => console.log("On board delete")}
              type="button"
              className="button-small"
            >
              <MdDelete className="text-xl" />
            </button>
          </>
        ) : (
          <form
            className="flex"
            onSubmit={() => {
              setEditedBoardName("");
              onChangeName(editedBoardName);
            }}
          >
            <input
              type="text"
              value={editedBoardName}
              onChange={(e) => setEditedBoardName(e.target.value)}
              className="inline text-2xl border px-2 py-1 rounded-l-custom focus:outline focus:outline-1 focus:outline-accent max-w-[220px] relative z-10"
              autoFocus
            />
            <button
              type="submit"
              className="w-[42px] h-[42px] flex justify-center items-center rounded-r-custom border border-l-0 duration-300 hover:bg-darkWhite"
            >
              <MdOutlineDone className="text-accent text-2xl" />
            </button>
          </form>
        )}
      </div>
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
                onAddNewColumn(newColumnName, newColumnColor);
                setNewColumnName(null);
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
    </div>
  );
};

export default BoardFilters;
