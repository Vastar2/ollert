import { FC, useEffect, useState } from "react";
import { Task } from "../types";
import { MdEdit, MdClose, MdOutlineDone, MdDelete } from "react-icons/md";

interface ModalReadAndEditTaskProps {
  currentTaskData: null | Task;
  resetTaskModal: () => void;
  onUpdateTask: (
    id: number,
    editText: string,
    editDescription: string,
    status: string
  ) => void;
  onDeleteTask: (id: number) => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  currentTaskData,
  resetTaskModal,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    setEditText(currentTaskData?.title || "");
    setEditDescription(currentTaskData?.description || "");
  }, [currentTaskData?.description, currentTaskData?.title]);

  if (!currentTaskData) return null;

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
            <p className="text-halfLightGray">{currentTaskData.status}</p>
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
          <label className="block">
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
          <p className="text-base text-halfLightGray">
            {currentTaskData.description}
          </p>
        )}
        <div className="absolute top-4 right-3 flex items-center">
          <button
            className="text-xl button-small"
            onClick={() => {
              onDeleteTask(currentTaskData.id);
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
                  currentTaskData.status
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
