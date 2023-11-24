import { useEffect, useState } from "react";
import type { ItemField, Task, TColumn } from "../types";

interface UseGetItemsProps {
  columns: TColumn[];
  itemsOriginal: Task[];
}

export const useGetItems = ({ columns, itemsOriginal }: UseGetItemsProps) => {
  const [items, setItems] = useState<Record<string, Task[]>>();

  const [statuses] = useState<string[]>(columns?.map((item) => item.name));

  useEffect(() => {
    const getItems = () => {
      const resultItems: Record<string, Task[]> = {};
      statuses?.forEach((item) => (resultItems[item] = []));
      itemsOriginal?.forEach((item) => {
        resultItems[item["status"]].push(item);
      });

      setItems(resultItems);
    };
    getItems();
  }, [itemsOriginal, statuses]);

  return { items, setItems };
};
