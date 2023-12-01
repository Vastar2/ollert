import { FC, useState } from "react";
import BoardFiltersTitle from "./BoardFiltersTitle";
import BoardFiltersTitleNewColumn from "./BoardFiltersTitleNewColumn";

interface BoardFiltersProps {
  isFavorite: boolean | undefined;
  boardName: string | undefined;
  boardId: number;
  onToggleFavorite: () => void;
  onChangeName: (newBoardName: string) => void;
  onAddNewColumn: (newColumnName: string, newColumnColor: string) => void;
  onDeleteBoard: (boardId: number) => void;
}

const BoardFilters: FC<BoardFiltersProps> = ({
  isFavorite,
  boardName,
  boardId,
  onToggleFavorite,
  onChangeName,
  onAddNewColumn,
  onDeleteBoard,
}) => {
  const [editedBoardName, setEditedBoardName] = useState("");

  return (
    <div className="container-main max-w-[640px] ml-auto mr-auto flex items-center justify-between h-[70px] mb-6">
      <BoardFiltersTitle
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        editedBoardName={editedBoardName}
        boardName={boardName}
        onSetEditedBoardName={(newName: string) => setEditedBoardName(newName)}
        onDeleteBoard={() => onDeleteBoard(boardId)}
        onChangeName={() => onChangeName(editedBoardName)}
      />
      <BoardFiltersTitleNewColumn onAddNewColumn={onAddNewColumn} />
    </div>
  );
};

export default BoardFilters;
