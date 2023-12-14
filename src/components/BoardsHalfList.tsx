import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { MdStar, MdStarBorder } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { TBoardsListData } from "../types";

interface BoardsHalfListProps {
  boardsListData:
    | {
        boardId: number;
        boardName: string;
        isFavorite: boolean;
      }[]
    | null;
  isFavorite: boolean;
  setBoardsListData: React.Dispatch<
    React.SetStateAction<TBoardsListData[] | null>
  >;
}

const BoardsHalfList: FC<BoardsHalfListProps> = ({
  boardsListData,
  isFavorite,
  setBoardsListData,
}) => {
  const pathname = usePathname();

  return (
    <ul
      className={twMerge(
        !isFavorite &&
          "after:content[''] after:w-[calc(100%-16px)] after:ml-0 after:h-[1px] after:bg-superLightGray  after:absolute after:bottom-[2px]",
        "relative pb-6 mb-6"
      )}
    >
      {boardsListData &&
        boardsListData.map((item: any) => {
          if (item.isFavorite === isFavorite) return;

          return (
            <li
              className="w-full relative flex items-center pl-4"
              key={item.boardId}
            >
              <button
                type="button"
                onClick={() => {
                  const storedData = localStorage.getItem("boardData");
                  setBoardsListData((prev) =>
                    prev
                      ? prev.map((value) =>
                          value.boardId === item.boardId
                            ? { ...value, isFavorite: !value.isFavorite }
                            : value
                        )
                      : null
                  );
                  localStorage.setItem(
                    "boardData",
                    JSON.stringify(
                      storedData
                        ? [
                            ...JSON.parse(storedData)?.map((value: any) =>
                              value.boardId === item.boardId
                                ? {
                                    ...value,
                                    isFavorite: !value.isFavorite,
                                  }
                                : value
                            ),
                          ]
                        : null
                    )
                  );
                }}
                className="mr-2 button-small hover:bg-transparent"
              >
                {item.isFavorite ? (
                  <MdStar className="text-2xl text-[orange]" />
                ) : (
                  <MdStarBorder className="text-2xl" />
                )}
              </button>
              <Link
                className={twMerge(
                  Number(
                    pathname.split("/")[pathname.split("/").length - 1]
                  ) !== item.boardId
                    ? "duration-300 hover:bg-darkWhite"
                    : "cursor-default select-none",
                  "flex rounded-custom w-[calc(100%-50px)] px-4 py-2"
                )}
                href={{ pathname: `/board/${item.boardId}` }}
              >
                <p className="text-lg">{item.boardName}</p>
                {Number(pathname.split("/")[pathname.split("/").length - 1]) ===
                  item.boardId && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-accent rounded-custom"></div>
                )}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default BoardsHalfList;
