import { FC } from "react";
import SortableItem from "./SortableItem";
import { TbDragDrop } from "react-icons/tb";
import { TItemField, TTask, TColumn } from "../types";

interface SortableListProps {
  items: TTask[];
  id: string;
  columns: TColumn[];
  onSetCurrentTaskData: (taskData: TTask | null, color: string) => void;
}

const ListOfItems: FC<SortableListProps> = ({
  items,
  id,
  columns,
  onSetCurrentTaskData,
}) => {
  return (
    <>
      {items.length ? (
        items.map((item, index) => (
          <SortableItem
            key={index}
            item={item}
            id={id}
            columns={columns}
            onSetCurrentTaskData={onSetCurrentTaskData}
          />
        ))
      ) : (
        <div className="border w-full py-8 h-[146px] rounded-custom bg-gray-50 flex justify-center items-center">
          <TbDragDrop className="text-lightGray text-4xl" />
        </div>
      )}
    </>
  );
};

export default ListOfItems;
