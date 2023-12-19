"use client";
import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { random } from "lodash";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface ModalReadAndEditTaskProps {
  newTaskStatus: null | { key: string; color: string };
  resetNewTaskStatus: () => void;
  onSetNewTask: (
    id: number,
    taskName: string,
    taskDescription: string,
    key: string,
    checklist: { checkId: number; isChecked: boolean; content: string }[],
    newLabels: { name: string; color: string }[]
  ) => void;
  boardLabels: { name: string; color: string }[] | undefined;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  newTaskStatus,
  resetNewTaskStatus,
  onSetNewTask,
  boardLabels,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [checklist, setChecklist] = useState<
    { checkId: number; isChecked: boolean; content: string }[]
  >([]);
  const [checklistItem, setChecklistItem] = useState("");
  const [isLabels, setIsLabels] = useState(false);
  const [newLabels, setNewLabels] = useState<{ name: string; color: string }[]>(
    []
  );
  const errorName = () =>
    toast.error("The name must be at least 3 characters long");
  if (!newTaskStatus) return null;

  const handleReset = () => {
    setTaskName("");
    setTaskDescription("");
    setChecklistItem("");
    setChecklist([]);
    resetNewTaskStatus();
    setIsLabels(false);
    setNewLabels([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.length > 2) {
      const id = random(999999);
      onSetNewTask(
        id,
        taskName,
        taskDescription,
        newTaskStatus.key,
        checklist,
        newLabels
      );
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
      <div className="basis-[440px] container-main pt-0 relative overflow-hidden">
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
                className="mt-1 input-main"
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
                className="mt-1 h-[80px] resize-none input-main"
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
                  className="input-main"
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
          <div className="relative mb-4">
            <label className="mt-2">
              <p className="text-sm text-lightGray mb-2">Labels</p>
              <button
                onClick={() => {
                  setIsLabels(!isLabels);
                }}
                type="button"
                className="w-full mb-2 duration-300 hover:bg-darkWhite flex items-center py-2 px-4 rounded-custom"
              >
                <MdKeyboardArrowDown
                  className={twMerge(
                    isLabels ? "rotate-0" : "rotate-180",
                    "text-lightGray mr-1 duration-300 w-6 h-6 flex justify-center items-center text-4xl"
                  )}
                />
                <p>Labels</p>
              </button>
              {isLabels && (
                <div className="mb-4 container-main w-full p-0">
                  {!!boardLabels?.length && (
                    <ul className="flex flex-wrap gap-1">
                      {boardLabels?.map((item, index) => (
                        <li
                          key={index}
                          className={`text-center border-[2px] last-of-type:mb-0 px-1 rounded-custom max-w-[128px] truncate`}
                          style={{ borderColor: item.color }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setNewLabels((prev) => [...prev, item]);
                              setIsLabels(false);
                            }}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {!!newLabels.length ? (
                <ul className="mb-2 flex flex-wrap gap-1 border border-lightGray dark:bg-darkWhite text-mainGray p-2 rounded-custom">
                  {newLabels.map((item, index) => (
                    <li
                      key={index}
                      className={`text-center last-of-type:mb-0 bgc-[${item.color}] px-1 rounded-custom max-w-[128px] truncate`}
                      style={{ background: item.color }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-lightGray">Add some labels</p>
              )}
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
