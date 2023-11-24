import { FC } from "react";
import { Task } from "../types";
import { MdEdit, MdClose } from "react-icons/md";

interface ModalReadAndEditTaskProps {
  curentTaskData: null | Task;
  resetTaskModal: () => void;
}

const ModalReadAndEditTask: FC<ModalReadAndEditTaskProps> = ({
  curentTaskData,
  resetTaskModal,
}) => {
  if (!curentTaskData) return null;

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
          <div className="w-full h-2 bg-darkWhite"></div>
          <div className="inline-block px-4 py-1 rounded-br-custom bg-darkWhite">
            <p className="text-halfLightGray">{curentTaskData.status}</p>
          </div>
        </div>
        <p className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden mb-3">
          {curentTaskData.title}
        </p>
        <p className="text-base text-halfLightGray">
          {curentTaskData.description}
        </p>
        <div className="absolute top-4 right-3 flex gap-1">
          <button
            className="text-lg butoton-small"
            // onClick={}
            type="button"
          >
            <MdEdit />
          </button>
          <button
            className="text-xl butoton-small"
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
