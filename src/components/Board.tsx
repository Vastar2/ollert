import { FC, useState, useEffect } from "react";
import BoardFilters from "./BoardFilters";
import DragAndDrop from "./DragAndDrop";
import data from "../data/data.json";
import { handleDragOver, handleDragEnd } from "../utils/index";
import type { ItemField, Task } from "../types";

interface BoardProps {
  onSetCurrentTaskData: (taskData: Task | null) => void;
}

const Board: FC<BoardProps> = ({ onSetCurrentTaskData }) => {
  const [itemField] = useState<ItemField>("status");
  const [boardData, setBoardData] = useState<null | any>(null);

  useEffect(() => {
    setBoardData(data);
  }, []);

  return (
    <div className="">
      <BoardFilters isFavorite={data.isFavorite} boardName={data.boardName} />
      {boardData && (
        <DragAndDrop
          columns={boardData?.columns}
          itemField={itemField}
          itemsOriginal={boardData?.array}
          onChangeOver={handleDragOver}
          onChangeEnd={handleDragEnd}
          onSetCurrentTaskData={onSetCurrentTaskData}
        />
      )}
    </div>
  );
};

export default Board;
