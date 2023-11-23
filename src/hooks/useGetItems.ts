import { useEffect, useState } from "react";
import type { ItemField, Task, TColumn } from "../types";

interface UseGetItemsProps {
  columns: TColumn[];
  itemsOriginal: Task[];
  itemField: ItemField;
}

export const useGetItems = ({
  columns,
  itemsOriginal: array,
  itemField,
}: UseGetItemsProps) => {
  const [items, setItems] = useState<Record<string, Task[]>>();

  const [statuses] = useState<string[]>(columns.map((item) => item.name));

  useEffect(() => {
    const getItems = () => {
      const resultItems: Record<string, Task[]> = {};
      statuses.forEach((item) => (resultItems[item] = []));
      array.forEach((item) => {
        resultItems[item[itemField]].push(item);
      });

      setItems(resultItems);
    };
    getItems();
  }, [array, itemField, statuses]);

  return { items, setItems };
};
