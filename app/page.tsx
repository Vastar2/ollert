"use client";
import Header from "../src/components/Header";
import Board from "../src/components/Board";
import BoardsList from "../src/components/BoardsList";
import ModalReadAndEditTask from "../src/components/ModalReadAndEditTask";
import { useState } from "react";
import { Task } from "../src/types";

const App = () => {
  const [isBoardsList, setIsBoardsList] = useState(false);
  const [curentTaskData, setCurrentTaskData] = useState<Task | null>(null);

  return (
    <div className="h-full relative overflow-hidden">
      <Header
        isBoardsList={isBoardsList}
        onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
      />
      <Board
        onSetCurrentTaskData={(taskData) => setCurrentTaskData(taskData)}
      />
      <BoardsList
        isBoardsList={isBoardsList}
        onToggleBoardsList={() => setIsBoardsList(!isBoardsList)}
      />
      {/* <ModalCreateTask /> */}
      <ModalReadAndEditTask
        curentTaskData={curentTaskData}
        resetTaskModal={() => setCurrentTaskData(null)}
      />
    </div>
  );
};

export default App;
