"use client";
import Board from "../../../src/components/Board";
import Layout from "../../../src/components/Layout";
import { usePathname } from "next/navigation";

const App = () => {
  const pathname = usePathname();

  return (
    <Layout>
      <Board pathname={pathname} />
    </Layout>
  );
};

export default App;
