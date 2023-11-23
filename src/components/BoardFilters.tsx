import { MdEdit, MdStar, MdStarBorder, MdAdd } from "react-icons/md";
import { FC } from "react";

interface BoardFiltersProps {
  isFavorite: boolean;
  boardName: string;
}

const BoardFilters: FC<BoardFiltersProps> = ({ isFavorite, boardName }) => {
  return (
    <div className="container-main max-w-[640px] ml-auto mr-auto flex items-center justify-between h-[70px] mb-6">
      <div className="flex items-center">
        <button
          // onClick={}
          type="button"
          className="mr-4 butoton-small"
        >
          {isFavorite ? (
            <MdStar className="text-2xl text-[orange]" />
          ) : (
            <MdStarBorder className="text-2xl" />
          )}
        </button>
        <p className="mr-2 text-2xl font-[600] underline decoration-accent">
          {boardName}
        </p>
        <button className="butoton-small mr-1">
          <MdEdit className="text-xl" />
        </button>
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
