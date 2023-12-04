import { useEffect, useState } from "react";
import type { TTask, TColumn } from "../types";

interface UseGetItemsProps {
  columns: TColumn[];
  itemsOriginal: TTask[];
}

export const useGetItems = ({ columns, itemsOriginal }: UseGetItemsProps) => {
  const [items, setItems] = useState<Record<string, TTask[]>>();

  const [statuses, setStatuses] = useState<string[]>(
    columns?.map((item) => item.name)
  );

  useEffect(() => {
    setStatuses(columns?.map((item) => item.name));
  }, [columns]);

  useEffect(() => {
    const getItems = () => {
      const resultItems: Record<string, TTask[]> = {};
      statuses?.forEach((item) => (resultItems[item] = []));
      itemsOriginal?.forEach((item) => {
        resultItems[item["status"]]?.push(item);
      });
      setItems(resultItems);
    };
    getItems();
  }, [itemsOriginal, statuses, columns]);

  return { items, setItems };
};
