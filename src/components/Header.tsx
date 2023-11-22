import Image from "next/image";
import { MdFormatListBulleted, MdClose } from "react-icons/md";
import { FC } from "react";

interface HeaderProps {
  isBoardsList: boolean;
  onToggleBoardsList: () => void;
}

const Header: FC<HeaderProps> = ({ isBoardsList, onToggleBoardsList }) => {
  return (
    <div className="h-[70px] mb-6 flex px-6 items-center relative bg-mainWhite shadow-[0px_0px_26px_-12px_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={onToggleBoardsList}
        className="flex gap-1 items-center duration-300 px-4 h-10 rounded-custom hover:bg-darkWhite text-mainGray"
      >
        {!isBoardsList ? (
          <>
            My boards
            <MdFormatListBulleted className="ml-1 flex justify-center items-center text-xl text-accent" />
          </>
        ) : (
          <>
            Close
            <MdClose className="ml-1 flex justify-center items-center text-xl text-accent" />
          </>
        )}
      </button>
      <Image
        src="/logo.png"
        alt="Logo"
        priority
        width={100}
        height={0}
        className="absolute left-1/2 -translate-x-1/2"
      />
    </div>
  );
};

export default Header;
