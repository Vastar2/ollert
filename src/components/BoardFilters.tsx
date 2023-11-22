import { MdEdit, MdStar, MdStarBorder, MdAdd } from "react-icons/md";

const BoardFilters = () => {
  return (
    <div className="container-main w-[calc(100%-728px)] ml-auto mr-auto flex justify-between py-4 mb-6">
      <div className="flex items-center">
        <button className="mr-4 duration-300 hover:bg-darkWhite rounded-custom w-7 h-7 flex justify-center items-center text-lightGray">
          <MdStar className="text-2xl text-[orange]" />
        </button>
        <p className="mr-2 text-2xl font-[600] underline decoration-accent">
          EZUI
        </p>
        <button className="duration-300 hover:bg-darkWhite rounded-custom w-7 h-7 flex justify-center items-center text-lightGray mr-1">
          <MdEdit className="text-xl" />
        </button>
      </div>
      <div>
        <button className="flex items-center py-2 px-4 duration-300 rounded-custom hover:bg-darkWhite">
          Add column
          <MdAdd className="ml-1 duration-300 w-7 h-7 flex justify-center items-center text-accent text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default BoardFilters;
