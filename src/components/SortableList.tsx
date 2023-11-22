import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ItemField, Task } from "../types";
import ListOfItems from "./ListOfItems";

interface SortableListProps {
  items: Task[];
  id: string;
  itemField: ItemField;
  activeId: null | number;
}

const SortableList: FC<SortableListProps> = ({
  items,
  id,
  itemField,
  activeId,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul
      className={`w-64 rounded-custom max-h-[calc(100%-102px)] overflow-y-auto`}
    >
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {!items.length ? (
          <div ref={setNodeRef}>
            <ListOfItems
              items={items}
              id={id}
              itemField={itemField}
              activeId={activeId}
            />
          </div>
        ) : (
          <>
            <ListOfItems
              items={items}
              id={id}
              itemField={itemField}
              activeId={activeId}
            />
          </>
        )}
      </SortableContext>
    </ul>
  );
};

export default SortableList;
