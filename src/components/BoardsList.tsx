"use client";
import { FC, useEffect, useState } from "react";
import { MdAdd, MdClose, MdStar, MdStarBorder } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BoardsListProps {
  isBoardsList: boolean;
  onToggleBoardsList: () => void;
}

const BoardsList: FC<BoardsListProps> = ({
  isBoardsList,
  onToggleBoardsList,
}) => {
  const [isNewBoard, setIsNewBoard] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardsListData, setBoardsListData] = useState<
    | {
        boardId: number;
        boardName: string;
        isFavorite: boolean;
      }[]
    | null
  >(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");

    setBoardsListData(
      storedData &&
        JSON.parse(storedData).map((item: any) => ({
          boardId: item.boardId,
          boardName: item.boardName,
          isFavorite: item.isFavorite,
        }))
    );
  }, []);

  useEffect(() => {
    setIsNewBoard(false);
    setBoardName("");
  }, [isBoardsList]);

  if (!isBoardsList) return null;

  const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
    const localData = localStorage.getItem("boardData");

    if (localData) {
      const updatedData = [
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
          columns: [],
          array: [],
        },
        ...(Array.isArray(JSON.parse(localData)) ? JSON.parse(localData) : []),
      ];

      setBoardsListData((prev: any) => [
        ...prev,
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
        },
      ]);

      localStorage.setItem("boardData", JSON.stringify(updatedData));
    } else {
      const updatedData = [
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
          columns: [],
          array: [],
        },
      ];

      setBoardsListData([
        {
          boardId: id,
          boardName: boardName,
          isFavorite: false,
        },
      ]);

      localStorage.setItem("boardData", JSON.stringify(updatedData));
    }

    setIsNewBoard(false);
    setBoardName("");
  };

  return (
    <div
      className="absolute z-50 top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#00000040]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onToggleBoardsList();
        }
      }}
    >
      <div className="absolute top-0 left-0 pr-2 overflow-hidden flex">
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
        <div className="overflow-hidden pr-2 mt-6">
          <div className="round-down absolute left[340px] top-[10px]"></div>
          {isNewBoard ? (
            <form
              onSubmit={handleAddBoard}
              className="w-[340px] h-[168px] container-main rounded-l-none relative pt-5"
            >
              <label>
                <p className="text-sm text-lightGray">Board name</p>
                <input
                  className="mt-2 mb-4 input-main"
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
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
                  setIsNewBoard(false);
                  setBoardName("");
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
                  setIsNewBoard(true);
                }}
                className="w-full h-full flex justify-center items-center text-accent rounded-xl duration-300 hover:bg-darkWhite"
              >
                <MdAdd className="rounded-custom w-6 h-6 relative -left-0.5 flex justify-center items-center" />
              </button>
            </div>
          )}
          <div className="round-up absolute left[340px]"></div>
        </div>
      </div>
      <div className="round-up absolute left-[340px]"></div>
      <div className="round-down absolute left-[340px] -bottom-[15px] bg-red-300"></div>
    </div>
  );
};

export default BoardsList;
