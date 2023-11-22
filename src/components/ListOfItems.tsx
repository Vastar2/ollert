import { FC } from "react";
import { DragOverlay } from "@dnd-kit/core";
import SortableItem from "./SortableItem";
import { AiOutlinePlus } from "react-icons/ai";
import { ItemField, Task } from "../types";

interface SortableListProps {
  items: Task[];
  id: string;
  itemField: ItemField;
  activeId: null | number;
}

const ListOfItems: FC<SortableListProps> = ({
  items,
  id,
  itemField,
  activeId,
}) => {
  console.log(id, items, activeId);

  return (
    <>
      {items.length ? (
        items.map((item, index) =>
          item.id !== activeId ? (
            <SortableItem
              key={index}
              item={item}
              id={id}
              itemField={itemField}
              activeId={activeId}
            />
          ) : (
            <DragOverlay key={index}>
              <SortableItem
                item={item}
                id={id}
                itemField={itemField}
                activeId={activeId}
              />
            </DragOverlay>
          )
        )
      ) : (
        <div className="border w-full py-8 rounded-custom bg-gray-50 flex justify-center items-center">
          <AiOutlinePlus className="text-lightGray w-8 h-8" />
        </div>
      )}
    </>
  );
};

export default ListOfItems;
