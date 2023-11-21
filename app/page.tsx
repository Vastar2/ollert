"use client";
import Header from "../src/components/Header";
import Board from "../src/components/Board";
import BoardsList from "../src/components/BoardsList";
import { useState } from "react";

const App = () => {
  const [isBoardsList, setIsBoardsList] = useState(false);

  return (
    <div className="h-full relative">
      <Header
        isBoardsList={isBoardsList}
        onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
      />
      <Board />
      <BoardsList isBoardsList={isBoardsList} />
    </div>
  );
};

export default App;
