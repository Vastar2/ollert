import Image from "next/image";
import {
  MdFormatListBulleted,
  MdClose,
  MdSunny,
  MdNightlight,
} from "react-icons/md";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { ThemeContext } from "./ThemeProvider";
import Link from "next/link";

interface HeaderProps {
  isBoardsList: boolean;
  onToggleBoardsList: () => void;
}

const Header: FC<HeaderProps> = ({ isBoardsList, onToggleBoardsList }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="h-[70px] mb-3 flex px-6 items-center relative bg-mainWhite shadow-[0px_0px_26px_-12px_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={onToggleBoardsList}
        className="flex gap-1 items-center duration-300 px-4 h-10 rounded-custom hover:bg-darkWhite text-mainGray"
      >
        {!isBoardsList ? (
          <>
            <p>My boards</p>
            <MdFormatListBulleted className="ml-1 flex justify-center items-center text-xl text-accent" />
          </>
        ) : (
          <>
            <p>Close</p>
            <MdClose className="ml-1 flex justify-center items-center text-xl text-accent" />
          </>
        )}
      </button>
      <Link
        className="absolute left-1/2 -translate-x-1/2"
        href={{ pathname: `/` }}
      >
        <Image src="/logo.png" alt="Logo" priority width="100" height="30" />
      </Link>
      <div className="ml-auto">
        <button
          className={twMerge(
            theme?.currentTheme === "light" ? "text-[orange]" : "text-accent",
            "button-small text-xl w-10 h-10"
          )}
          type="button"
          onClick={() =>
            theme?.setCurrentTheme(
              theme?.currentTheme === "light" ? "dark" : "light"
            )
          }
        >
          {theme?.currentTheme === "light" ? <MdSunny /> : <MdNightlight />}
        </button>
      </div>
    </div>
  );
};

export default Header;
