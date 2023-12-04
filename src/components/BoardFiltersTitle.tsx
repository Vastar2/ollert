import {
  MdEdit,
  MdStar,
  MdStarBorder,
  MdOutlineDone,
  MdDelete,
} from "react-icons/md";
import { FC } from "react";

interface BoardFiltersTitleProps {
  onToggleFavorite: () => void;
  isFavorite: boolean | undefined;
  editedBoardName: string;
  boardName: string | undefined;
  onSetEditedBoardName: (newName: string) => void;
  onDeleteBoard: () => void;
  onChangeName: () => void;
}

const BoardFiltersTitle: FC<BoardFiltersTitleProps> = ({
  onToggleFavorite,
  isFavorite,
  editedBoardName,
  boardName,
  onSetEditedBoardName,
  onDeleteBoard,
  onChangeName,
}) => {
  return (
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
            onClick={() => onSetEditedBoardName(boardName || "404")}
            type="button"
            className="button-small"
          >
            <MdEdit className="text-xl" />
          </button>
          <button
            onClick={() => onDeleteBoard()}
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
            onSetEditedBoardName("");
            onChangeName();
          }}
        >
          <input
            type="text"
            value={editedBoardName}
            onChange={(e) => onSetEditedBoardName(e.target.value)}
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
  );
};

export default BoardFiltersTitle;
