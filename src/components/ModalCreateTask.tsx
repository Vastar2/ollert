"use client";
import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { random } from "lodash";

interface ModalReadAndEditTaskProps {
  newTaskStatus: null | { key: string; color: string };
  resetNewTaskStatus: () => void;
  onSetNewTask: (
    id: number,
    taskName: string,
    taskDescription: string,
    key: string,
    checklist: { checkId: number; isChecked: boolean; content: string }[]
  ) => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  newTaskStatus,
  resetNewTaskStatus,
  onSetNewTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [checklist, setChecklist] = useState<
    { checkId: number; isChecked: boolean; content: string }[]
  >([]);
  const [checklistItem, setChecklistItem] = useState("");
  const errorName = () =>
    toast.error("The name must be at least 3 characters long");
  if (!newTaskStatus) return null;

  const handleReset = () => {
    setTaskName("");
    setTaskDescription("");
    setChecklistItem("");
    setChecklist([]);
    resetNewTaskStatus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.length > 2) {
      const id = random(999999);
      onSetNewTask(id, taskName, taskDescription, newTaskStatus.key, checklist);
      handleReset();
    } else {
      errorName();
    }
  };

  return (
    <div
      className="p-3 absolute z-50 top-0 left-0 w-full h-full bg-[#00000040] flex items-center justify-center"
      onClick={(e) => {
        e.target === e.currentTarget && handleReset();
      }}
    >
      <div className="basis-[640px] container-main pt-0 relative overflow-hidden">
        <div
          className="w-1/2 h-2 ml-auto mr-auto rounded-b-custom"
          style={{
            backgroundColor: `${newTaskStatus.color}`,
          }}
        ></div>
        <div className="flex gap-2 justify-center items-center mt-2 mb-4">
          <span>New</span>
          <p
            className="text-halfLightGray font-[700]"
            style={{
              color: `${newTaskStatus.color}`,
            }}
          >
            {newTaskStatus.key}
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>
              <p className="text-sm text-lightGray">Task name</p>
              <input
                className="mt-1 input-main max-w-[200px]"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
            </label>
          </div>
          <div className="mb-4 mt-4">
            <label>
              <p className="text-sm text-lightGray">Task description</p>
              <textarea
                className="mt-1 h-[140px] resize-none input-main"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </label>
          </div>
          <div className=" mb-4">
            <label className="mt-2">
              <p className="text-sm text-lightGray">Checklist</p>
              <div className="mt-1 flex gap-2">
                <input
                  className="input-main max-w-[200px]"
                  type="text"
                  value={checklistItem}
                  onChange={(e) => setChecklistItem(e.target.value)}
                />
                {checklistItem && (
                  <button
                    type="button"
                    className="block px-4 border border-lightGray  text-mainGray rounded-custom duration-300 hover:bg-darkWhite"
                    onClick={() => {
                      setChecklistItem("");
                      setChecklist([
                        ...checklist,
                        {
                          checkId: random(999999),
                          isChecked: false,
                          content: checklistItem,
                        },
                      ]);
                    }}
                  >
                    Add
                  </button>
                )}
              </div>
              <ul className="mt-2 flex flex-wrap gap-1">
                {checklist?.map((item, index) => (
                  <li
                    key={index}
                    className="max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden py-1 px-2 bg-darkWhite rounded-custom text-lightGray"
                  >
                    {item.content}
                  </li>
                ))}
              </ul>
            </label>
          </div>
          <button
            type="submit"
            className="max-w-[200px] flex items-center duration-300 hover:bg-darkWhite border border-accent w-full justify-center py-2 rounded-custom text-accent"
          >
            Create
          </button>
        </form>

        <button
          className="text-xl button-small absolute top-3 right-3"
          onClick={() => handleReset()}
          type="button"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default ModalReadAndEditTask;
