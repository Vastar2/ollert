import { DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { TItemField } from "../types";
import { TTask } from "../types";

type Items = Record<string, TTask[]>;

export const handleDragOver = (
  event: DragOverEvent,
  setItems: React.Dispatch<
    React.SetStateAction<Record<string, TTask[]> | undefined>
  >,
  items?: Items
): void => {
  const { active, over, activatorEvent } = event;

  const id = active?.id;
  const overId = over?.id;

  if (!overId) return;
  if (!items) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setItems((prev) => {
    if (prev) {
      const activeItems = prev[activeContainer] || [];
      const overItems = prev[overContainer] || [];

      const activeIndex = activeItems.filter((item) => item.id === id)[0].id;

      let overIndex = 0;
      if (typeof overId === "number") {
        overIndex =
          overItems.length > 0 && !isNaN(overId)
            ? overItems.filter((item) => item.id === overId)[0].id
            : -1;
      }

      let newIndex: number;
      if (overId in prev) {
        newIndex = overItems.length;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          (activatorEvent as MouseEvent).offsetY > 0;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      const objectWithOurIndex = items[activeContainer].filter(
        (item) => item.id === activeIndex
      );

      return {
        ...prev,
        [activeContainer]: [...activeItems.filter((item) => item.id !== id)],
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          items[activeContainer][
            items[activeContainer].indexOf(objectWithOurIndex[0])
          ],
          ...overItems.slice(newIndex, overItems.length),
        ],
      };
    }
  });
};

export const handleDragEnd = (
  event: DragEndEvent,
  items: Items,
  setItems: React.Dispatch<
    React.SetStateAction<Record<string, TTask[]> | undefined>
  >,
  arrayMove: (arr: TTask[], from: number, to: number) => TTask[],
  onChangeResultArray: any
): void => {
  const { active, over } = event;

  const id = active?.id;
  const overId = over?.id;

  if (!overId) return;
  if (!items) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  const activeIndex = (items[activeContainer] || []).filter(
    (item) => item.id === id
  )[0].id;
  const overIndex = items[overContainer].indexOf(
    (items[overContainer] || []).filter((item) => item.id === overId)[0]
  );

  const objectWithOurIndex = items[activeContainer].filter(
    (item) => item.id === activeIndex
  );

  const newArray = (prevItems: Items) => {
    const resultArray = prevItems[overContainer].map((item, index) => {
      if (index === prevItems[activeContainer].indexOf(objectWithOurIndex[0])) {
        const newItem = { ...item };
        newItem.status = overContainer as string;
        return newItem;
      } else {
        return item;
      }
    });

    return resultArray;
  };

  setItems((prevItems) => {
    if (prevItems) {
      const newItems = {
        ...prevItems,
        [overContainer]: arrayMove(
          newArray(prevItems) || [],
          prevItems[activeContainer].indexOf(objectWithOurIndex[0]),
          overIndex
        ),
      };
      onChangeResultArray(Object.values(newItems));
      return newItems;
    }
  });
};
