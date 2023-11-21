import { MdEdit, MdStar, MdStarBorder, MdAdd } from "react-icons/md";

const BoardFilters = () => {
  return (
    <div className="container-main w-[calc(100%-728px)] ml-auto mr-auto flex justify-between">
      <div className="flex items-center">
        <button className="mr-4 duration-300 hover:bg-darkWhite rounded-custom w-7 h-7 flex justify-center items-center text-lightGray">
          <MdStar className="text-2xl text-[orange]" />
        </button>
        <p className="mr-2 text-xl font-[600]">Board name</p>
        <button className="duration-300 hover:bg-darkWhite rounded-custom w-7 h-7 flex justify-center items-center text-lightGray mr-1">
          <MdEdit className="text-xl" />
        </button>
      </div>
      <div>
        <button className="flex items-center group text-lightGray">
          Add column
          <MdAdd className="ml-1 duration-300 group-hover:bg-darkWhite rounded-custom w-7 h-7 flex justify-center items-center text-lightGray" />
        </button>
      </div>
    </div>
  );
};

export default BoardFilters;
