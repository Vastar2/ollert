import { useState } from "react";
import BoardFilters from "./BoardFilters";
import DragAndDrop from "./DragAndDrop";
import array from "../data/data.json";
import { handleDragOver, handleDragEnd } from "../utils/index";
import type { ItemField } from "../types";

const Board = () => {
  const [itemFiled] = useState<ItemField>("status");
  return (
    <div className="">
      <BoardFilters />
      <DragAndDrop
        columns={["open", "planned", "in-progress", "done"]}
        itemField={itemFiled}
        itemsOriginal={array}
        onChangeOver={handleDragOver}
        onChangeEnd={handleDragEnd}
      />
    </div>
  );
};

export default Board;
