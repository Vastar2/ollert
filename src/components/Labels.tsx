import { MdKeyboardArrowDown } from "react-icons/md";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

interface LabelsProps {
  boardLabels: { name: string; color: string }[];
  onAddLabel: (newLabelName: string) => void;
}

const Labels: FC<LabelsProps> = ({ boardLabels, onAddLabel }) => {
  const [isLabels, setIsLabels] = useState(false);
  const [isNewLabel, setIsNewLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");

  const errorName = () =>
    toast.error("The name must be at least 3 characters long");

  return (
    <div className="relative w-[160px]">
      <button
        onClick={() => {
          setIsLabels(!isLabels);
          setIsNewLabel(false);
        }}
        type="button"
        className="w-full duration-300 hover:bg-darkWhite flex items-center py-2 px-4 rounded-custom"
      >
        <MdKeyboardArrowDown
          className={twMerge(
            isLabels ? "rotate-180" : "rotate-0",
            "text-lightGray mr-1 duration-300 w-6 h-6 flex justify-center items-center text-4xl"
          )}
        />
        <p>Labels</p>
      </button>
      {isLabels && (
        <div className="absolute mt-[26px] container-main z-50 w-full right-0">
          {!!boardLabels.length ? (
            <ul className="mb-2 flex flex-wrap gap-1">
              {boardLabels.map((item, index) => (
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
            <div className="mb-4">
              <p className="text-center text-lightGray">Nothing yet</p>
            </div>
          )}
          {isNewLabel && (
            <input
              type="text"
              value={newLabelName}
              className="input-main mb-3"
              onChange={(e) => setNewLabelName(e.target.value)}
              autoFocus
            />
          )}
          <button
            type="button"
            className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-accent w-full justify-center py-2 rounded-custom text-accent"
            onClick={() => {
              if (!isNewLabel) {
                setIsNewLabel(true);
              } else if (isNewLabel && newLabelName.length > 2) {
                onAddLabel(newLabelName);
                setIsNewLabel(false);
                setNewLabelName("");
              } else errorName();
            }}
          >
            {isNewLabel ? "Add" : "New"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Labels;
