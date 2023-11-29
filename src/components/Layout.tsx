import Header from "./Header";
import BoardsList from "./BoardsList";
import { FC, useState } from "react";

interface LayoutProps {
  children: any;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isBoardsList, setIsBoardsList] = useState(false);
  return (
    <div className="h-full relative overflow-hidden">
      <Header
        isBoardsList={isBoardsList}
        onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
      />
      {children}
      <BoardsList
        isBoardsList={isBoardsList}
        onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
      />
    </div>
  );
};

export default Layout;
