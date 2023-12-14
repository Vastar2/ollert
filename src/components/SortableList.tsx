import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { TTask, TColumn } from "../types";
import ListOfItems from "./ListOfItems";

interface SortableListProps {
  items: TTask[];
  id: string;
  columns: TColumn[];
  onSetCurrentTaskData: (taskData: TTask | null, color: string) => void;
}

const SortableList: FC<SortableListProps> = ({
  items,
  id,
  columns,
  onSetCurrentTaskData,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul className={`w-64 rounded-custom max-h-[calc(100%-102px)]`}>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={!items.length ? setNodeRef : null}>
          <ListOfItems
            items={items}
            id={id}
            columns={columns}
            onSetCurrentTaskData={onSetCurrentTaskData}
          />
        </div>
      </SortableContext>
    </ul>
  );
};

export default SortableList;
