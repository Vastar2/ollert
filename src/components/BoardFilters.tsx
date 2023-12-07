import { FC, useState } from "react";
import BoardFiltersTitle from "./BoardFiltersTitle";
import BoardFiltersTitleNewColumn from "./BoardFiltersTitleNewColumn";
import { twMerge } from "tailwind-merge";

interface BoardFiltersProps {
  isFavorite: boolean | undefined;
  boardName: string | undefined;
  boardId: number;
  onToggleFavorite: () => void;
  onChangeName: (newBoardName: string) => void;
  onAddNewColumn: (newColumnName: string, newColumnColor: string) => void;
  onDeleteBoard: (boardId: number) => void;
  sortingParameter: string;
  onSetSortingParameter: (e: any) => void;
  columnsLength: number;
}

const BoardFilters: FC<BoardFiltersProps> = ({
  isFavorite,
  boardName,
  boardId,
  onToggleFavorite,
  onChangeName,
  onAddNewColumn,
  onDeleteBoard,
  sortingParameter,
  onSetSortingParameter,
  columnsLength,
}) => {
  const [editedBoardName, setEditedBoardName] = useState("");

  return (
    <div className="container-main max-w-[640px] ml-auto mr-auto flex items-center justify-between h-[70px] mb-3">
      <BoardFiltersTitle
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        editedBoardName={editedBoardName}
        boardName={boardName}
        onSetEditedBoardName={(newName: string) => setEditedBoardName(newName)}
        onDeleteBoard={() => onDeleteBoard(boardId)}
        onChangeName={() => onChangeName(editedBoardName)}
      />
      {columnsLength > 1 && (
        <div className="flex items-center">
          <p className="text-lightGray mr-2">Sort by:</p>
          <button
            id="priority"
            type="button"
            className={twMerge(
              sortingParameter === "priority" ? "text-accent" : "text-mainGray",
              "button-small w-auto px-1 mr-1"
            )}
            onClick={onSetSortingParameter}
          >
            Priority
          </button>
          <button
            id="name"
            type="button"
            className={twMerge(
              sortingParameter === "name" ? "text-accent" : "text-mainGray",
              "button-small w-auto px-1"
            )}
            onClick={onSetSortingParameter}
          >
            Name
          </button>
        </div>
      )}
      <BoardFiltersTitleNewColumn onAddNewColumn={onAddNewColumn} />
    </div>
  );
};

export default BoardFilters;
