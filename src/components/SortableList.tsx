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
}

const SortableList: FC<SortableListProps> = ({ items, id, itemField }) => {
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
        {!items.length ? (
          <div ref={setNodeRef}>
            <ListOfItems items={items} id={id} itemField={itemField} />
          </div>
        ) : (
          <>
            <ListOfItems items={items} id={id} itemField={itemField} />
          </>
        )}
      </SortableContext>
    </ul>
  );
};

export default SortableList;
