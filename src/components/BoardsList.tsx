import { MdArrowRightAlt } from "react-icons/md";
import { FC } from "react";
import BoardsHalfList from "./BoardsHalfList";

interface BoardsListProps {
  boardsListData:
    | {
        boardId: number;
        boardName: string;
        isFavorite: boolean;
      }[]
    | null;
}

const BoardsList: FC<BoardsListProps> = ({ boardsListData }) => {
  return (
    <div className="w-[340px] h-[calc(100vh-70px)] pl-6 container-main rounded-none">
      {boardsListData?.length ? (
        <>
          {boardsListData?.some((item) => item.isFavorite) && (
            <>
              <p className="mb-4 text-sm text-lightGray pl-4">Favorites</p>

              <BoardsHalfList
                boardsListData={boardsListData}
                isFavorite={false}
              />
            </>
          )}
          <BoardsHalfList boardsListData={boardsListData} isFavorite={true} />
        </>
      ) : (
        <div className="pt-16">
          <p className="text-lightGray text-center mb-2">
            Add your first board
          </p>
          <MdArrowRightAlt className="ml-auto mr-auto text-3xl" />
        </div>
      )}
    </div>
  );
};

export default BoardsList;
