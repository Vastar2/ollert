import { useEffect, useState } from "react";
import type { Task, TColumn } from "../types";

interface UseGetItemsProps {
  columns: TColumn[];
  itemsOriginal: Task[];
}

export const useGetItems = ({ columns, itemsOriginal }: UseGetItemsProps) => {
  const [items, setItems] = useState<Record<string, Task[]>>();

  const [statuses, setStatuses] = useState<string[]>(
    columns?.map((item) => item.name)
  );

  useEffect(() => {
    setStatuses(columns?.map((item) => item.name));
  }, [columns]);

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
  }, [itemsOriginal, statuses, columns]);

  return { items, setItems };
};
