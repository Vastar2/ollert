"use client";
import { FC, useState } from "react";
import { MdClose } from "react-icons/md";

interface ModalReadAndEditTaskProps {
  newTaskStatus: null | { key: string; color: string };
  resetNewTaskStatus: () => void;
  onSetNewTask: (
    id: number,
    taskName: string,
    taskDescription: string,
    key: string
  ) => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  newTaskStatus,
  resetNewTaskStatus,
  onSetNewTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  if (!newTaskStatus) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
    onSetNewTask(id, taskName, taskDescription, newTaskStatus.key);
    setTaskName("");
    setTaskDescription("");
    resetNewTaskStatus();
  };

  return (
    <div
      className="p-3 absolute z-50 top-0 left-0 w-full h-full bg-[#00000040] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTaskName("");
          setTaskDescription("");
          resetNewTaskStatus();
        }
      }}
    >
      <div className="basis-[360px] container-main pt-0 relative overflow-hidden">
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
              Task name
              <input
                className="mt-3 mb-5 input-main"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
            </label>
          </div>
          <div>
            <label>
              Task description
              <textarea
                className="mt-3 h-[140px] resize-none mb-5 input-main"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-accent w-full justify-center py-2 rounded-custom text-accent"
          >
            Create
          </button>
        </form>

        <button
          className="text-xl button-small absolute top-3 right-3"
          onClick={() => {
            setTaskName("");
            setTaskDescription("");
            resetNewTaskStatus();
          }}
          type="button"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default ModalReadAndEditTask;
