import { MdAdd, MdClose } from "react-icons/md";
import { FC } from "react";

interface BoardsListNewBoardProps {
  isNewBoard: boolean;
  onAddBoard: (e: React.FormEvent<HTMLFormElement>) => void;
  boardName: string;
  onSetBoardName: (newName: string) => void;
  onSetIsNewBoard: (value: boolean) => void;
}

const BoardsListNewBoard: FC<BoardsListNewBoardProps> = ({
  isNewBoard,
  onAddBoard,
  boardName,
  onSetBoardName,
  onSetIsNewBoard,
}) => {
  return (
    <div className="overflow-hidden pr-2 mt-6">
      <div className="round-down absolute left[340px] top-[10px]"></div>
      {isNewBoard ? (
        <form
          onSubmit={(e) => onAddBoard(e)}
          className="w-[340px] h-[168px] container-main rounded-l-none relative pt-5"
        >
          <label>
            <p className="text-sm text-lightGray">Board name</p>
            <input
              className="mt-2 mb-4 input-main"
              type="text"
              value={boardName}
              onChange={(e) => onSetBoardName(e.target.value)}
              autoFocus
            />
          </label>
          <button
            type="submit"
            className="flex items-center duration-300 hover:bg-darkWhite ml-auto mr-auto border border-accent w-full justify-center py-2 rounded-custom text-accent"
          >
            Create
          </button>
          <button
            className="absolute top-4 right-4 text-xl text-lightGray duration-300 hover:text-mainGray"
            onClick={() => {
              onSetIsNewBoard(false);
              onSetBoardName("");
            }}
            type="button"
          >
            <MdClose />
          </button>
        </form>
      ) : (
        <div className="w-[30px] h-[186px] container-main rounded-l-none rounded-r-xl relative p-0">
          <button
            type="button"
            onClick={() => {
              onSetIsNewBoard(true);
            }}
            className="w-full h-full flex justify-center items-center text-accent rounded-xl duration-300 hover:bg-darkWhite"
          >
            <MdAdd className="rounded-custom w-6 h-6 relative -left-0.5 flex justify-center items-center" />
          </button>
        </div>
      )}
      <div className="round-up absolute left[340px]"></div>
    </div>
  );
};

export default BoardsListNewBoard;
