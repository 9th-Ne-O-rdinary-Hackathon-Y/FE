import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

const RootPage = lazy(() => import("@/pages/root/page"));
const GamePage = lazy(() => import("@/pages/game/page"));
const ResultPage = lazy(() => import("@/pages/result/page"));

function App() {
  return (
    <Routes>
      <Route index path="/" element={<RootPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
