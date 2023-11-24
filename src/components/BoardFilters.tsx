import {
  MdEdit,
  MdStar,
  MdStarBorder,
  MdAdd,
  MdOutlineDone,
} from "react-icons/md";
import { FC, useState } from "react";

interface BoardFiltersProps {
  isFavorite: boolean | undefined;
  boardName: string | undefined;
  onToggleFavorite: () => void;
  onChangeName: (newBoardName: string) => void;
}

const BoardFilters: FC<BoardFiltersProps> = ({
  isFavorite,
  boardName,
  onToggleFavorite,
  onChangeName,
}) => {
  const [editedBoardName, setEditedBoardName] = useState("");

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
          </>
        ) : (
          <div className="flex">
            <input
              type="text"
              value={editedBoardName}
              onChange={(e) => setEditedBoardName(e.target.value)}
              className="inline text-2xl border px-2 py-1 rounded-l-custom focus:outline focus:outline-1 focus:outline-accent max-w-[220px] relative z-10"
              autoFocus
            />
            <button
              onClick={() => {
                setEditedBoardName("");
                onChangeName(editedBoardName);
              }}
              type="button"
              className="w-[42px] h-[42px] flex justify-center items-center rounded-r-custom border border-l-0 duration-300 hover:bg-darkWhite"
            >
              <MdOutlineDone className="text-accent text-2xl" />
            </button>
          </div>
        )}
      </div>
      <div>
        <button className="flex items-center py-2 px-4 duration-300 rounded-custom hover:bg-darkWhite">
          Add column
          <MdAdd className="ml-1 duration-300 w-7 h-7 flex justify-center items-center text-accent text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default BoardFilters;
