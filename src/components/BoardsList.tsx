import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdStar, MdStarBorder } from "react-icons/md";
import { FC } from "react";

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
  const pathname = usePathname();

  return (
    <div className="w-[340px] h-[calc(100vh-70px)] pl-6 container-main rounded-none">
      <p className="mb-4 text-sm text-lightGray pl-4">Favorites</p>
      <ul className="relative after:content[''] after:w-[calc(100%-16px)] after:ml-0 after:h-[1px] after:bg-superLightGray pb-6 mb-6 after:absolute after:bottom-[2px]">
        {boardsListData &&
          boardsListData.map((item: any) => {
            if (item.isFavorite === false) return;

            return (
              <li className="w-full relative" key={item.boardId}>
                <Link
                  className={twMerge(
                    Number(
                      pathname.split("/")[pathname.split("/").length - 1]
                    ) !== item.boardId
                      ? "duration-300 hover:bg-darkWhite"
                      : "cursor-default select-none",
                    "flex rounded-custom w-full px-4 py-2"
                  )}
                  href={{ pathname: `/board/${item.boardId}` }}
                >
                  <div className="mr-2 button-small hover:bg-transparent">
                    {item.isFavorite ? (
                      <MdStar className="text-2xl text-[orange]" />
                    ) : (
                      <MdStarBorder className="text-2xl" />
                    )}
                  </div>
                  <p className="text-lg">{item.boardName}</p>
                  {Number(
                    pathname.split("/")[pathname.split("/").length - 1]
                  ) === item.boardId && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-accent rounded-custom"></div>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>
      <ul className="pb-6 mb-6">
        {boardsListData &&
          boardsListData.map((item: any) => {
            if (item.isFavorite === true) return;
            return (
              <li className="w-full relative" key={item.boardId}>
                <Link
                  className={twMerge(
                    Number(
                      pathname.split("/")[pathname.split("/").length - 1]
                    ) !== item.boardId
                      ? "duration-300 hover:bg-darkWhite"
                      : "cursor-default select-none",
                    "flex rounded-custom w-full px-4 py-2"
                  )}
                  href={{ pathname: `/board/${item.boardId}` }}
                >
                  <div className="mr-2 button-small hover:bg-transparent">
                    {item.isFavorite ? (
                      <MdStar className="text-2xl text-[orange]" />
                    ) : (
                      <MdStarBorder className="text-2xl" />
                    )}
                  </div>
                  <p className="text-lg">{item.boardName}</p>
                  {Number(
                    pathname.split("/")[pathname.split("/").length - 1]
                  ) === item.boardId && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-accent rounded-custom"></div>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BoardsList;
