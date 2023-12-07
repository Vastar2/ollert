import Header from "./Header";
import BoardsListModal from "./BoardsListModal";
import { FC, useState } from "react";
import ThemeProvider from "./ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isBoardsList, setIsBoardsList] = useState(false);
  return (
    <ThemeProvider>
      <div className="h-full relative overflow-hidden">
        <Header
          isBoardsList={isBoardsList}
          onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
        />
        {children}
        {isBoardsList && (
          <BoardsListModal
            isBoardsList={isBoardsList}
            onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
