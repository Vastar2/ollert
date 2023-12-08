import { FC, useEffect, useState } from "react";
import { TTask, TColumn } from "../types";
import {
  MdEdit,
  MdClose,
  MdOutlineDone,
  MdDelete,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface ModalReadAndEditTaskProps {
  columns: TColumn[] | undefined;
  currentTaskData: null | TTask;
  resetTaskModal: () => void;
  onUpdateTask: (
    id: number,
    editText: string,
    editDescription: string,
    status: string,
    checklist: { checkId: number; isChecked: boolean; content: string }[]
  ) => void;
  onDeleteTask: (id: number, key: string) => void;
  // onToggleIsChecked: (taskId: number, checkId: number) => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  columns,
  currentTaskData,
  resetTaskModal,
  onUpdateTask,
  onDeleteTask,
  // onToggleIsChecked,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editChecklist, setEditChecklist] = useState<
    { checkId: number; isChecked: boolean; content: string }[]
  >([]);

  useEffect(() => {
    setEditChecklist(currentTaskData?.checklist ?? []);
  }, [currentTaskData?.checklist]);

  useEffect(() => {
    setEditText(currentTaskData?.title || "");
    setEditDescription(currentTaskData?.description || "");
  }, [currentTaskData?.description, currentTaskData?.title]);

  useEffect(() => {}, []);

  if (!currentTaskData || !columns) return null;

  return (
    <div
      className="p-3 absolute z-50 top-0 left-0 w-full h-full bg-[#00000040] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetTaskModal();
          setIsEditMode(false);
        }
      }}
    >
      <div className="basis-[540px] container-main pt-16 relative overflow-hidden">
        <div className="w-full absolute top-0 left-0">
          <div
            className="w-full h-2"
            style={{
              backgroundColor: `${currentTaskData.color}`,
            }}
          ></div>
          <div
            className="inline-block px-4 py-1 rounded-br-custom"
            style={{
              backgroundColor: `${currentTaskData.color}30`,
            }}
          >
            <p className="text-halfLightGray dark:text-lightGray">
              {
                columns[
                  columns.findIndex((column) =>
                    column.array.some((item) => item.id === currentTaskData.id)
                  )
                ].name
              }
            </p>
          </div>
        </div>
        {isEditMode ? (
          <label className="block mb-3">
            <p className="text-sm text-lightGray mb-1">Title</p>
            <input
              type="text"
              value={editText}
              className="input-main"
              onChange={(e) => {
                setEditText(e.target.value);
              }}
            />
          </label>
        ) : (
          <p className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden mb-3">
            {currentTaskData.title}
          </p>
        )}
        {isEditMode ? (
          <label className="block  mb-3">
            <p className="text-sm text-lightGray mb-1">Description</p>
            <textarea
              value={editDescription}
              className="block h-[140px] resize-none input-main"
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
          </label>
        ) : (
          <p className="text-base text-halfLightGray mb-3">
            {currentTaskData.description}
          </p>
        )}
        <label className="block">
          {isEditMode && (
            <p className="text-sm text-lightGray mb-1">
              Checklist{" "}
              <span className="italic">({editChecklist.length} tasks)</span>
            </p>
          )}
          <ul className="mt-2">
            {editChecklist?.map((item) => (
              <li
                key={item.checkId}
                className={twMerge(
                  item.isChecked
                    ? "text-lightGray line-through"
                    : "text-mainGray",
                  "w-full flex gap-1 whitespace-nowrap text-ellipsis overflow-hidden mb-1 last-of-type:mb-0"
                )}
              >
                <button
                  type="button"
                  onClick={() =>
                    onUpdateTask(
                      currentTaskData.id,
                      editText,
                      editDescription,
                      columns[
                        columns.findIndex((column) =>
                          column.array.some(
                            (item) => item.id === currentTaskData.id
                          )
                        )
                      ].name,
                      editChecklist.map((value) => {
                        console.log(value, item);
                        return value.checkId === item.checkId
                          ? { ...value, isChecked: !value.isChecked }
                          : value;
                      })
                    )
                  }
                >
                  {item.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </button>
                <p> {item.content}</p>
              </li>
            ))}
          </ul>
        </label>
        <div className="absolute top-4 right-3 flex items-center">
          <button
            className="text-xl button-small"
            onClick={() => {
              onDeleteTask(
                currentTaskData.id,
                columns[
                  columns.findIndex((column) =>
                    column.array.some((item) => item.id === currentTaskData.id)
                  )
                ].name
              );
              resetTaskModal();
              setIsEditMode(false);
            }}
            type="button"
          >
            <MdDelete />
          </button>
          {isEditMode && (
            <p className="text-sm text-lightGray italic">Edit mode</p>
          )}
          <button
            className="text-lg button-small ml-1"
            onClick={() => {
              if (isEditMode) {
                onUpdateTask(
                  currentTaskData.id,
                  editText,
                  editDescription,
                  columns[
                    columns.findIndex((column) =>
                      column.array.some(
                        (item) => item.id === currentTaskData.id
                      )
                    )
                  ].name,
                  editChecklist
                );
              }
              setIsEditMode(!isEditMode);
            }}
            type="button"
          >
            {isEditMode ? (
              <MdOutlineDone className="text-accent" />
            ) : (
              <MdEdit />
            )}
          </button>
          <button
            className="text-xl button-small ml-1"
            onClick={() => {
              resetTaskModal();
              setIsEditMode(false);
            }}
            type="button"
          >
            <MdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalReadAndEditTask;
