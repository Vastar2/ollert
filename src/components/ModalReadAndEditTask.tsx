import { FC } from "react";
import { Task } from "../types";
import { MdEdit, MdClose } from "react-icons/md";

interface ModalReadAndEditTaskProps {
  currentTaskData: null | Task;
  resetTaskModal: () => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  currentTaskData,
  resetTaskModal,
}) => {
  if (!currentTaskData) return null;

  return (
    <div
      className="p-3 absolute z-50 top-0 left-0 w-full h-full bg-[#00000040] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetTaskModal();
        }
      }}
    >
      <div className="basis-[640px] container-main pt-16 relative overflow-hidden">
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
        <p className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden mb-3">
          {currentTaskData.title}
        </p>
        <p className="text-base text-halfLightGray">
          {currentTaskData.description}
        </p>
        <div className="absolute top-4 right-3 flex gap-1">
          <button
            className="text-lg button-small"
            // onClick={}
            type="button"
          >
            <MdEdit />
          </button>
          <button
            className="text-xl button-small"
            onClick={resetTaskModal}
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
