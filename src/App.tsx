import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

const RootPage = lazy(() => import("@/pages/root/page"));
const GamePage = lazy(() => import("@/pages/game/page"));
const ResultPage = lazy(() => import("@/pages/result/page"));
const ResultDetailPage = lazy(() => import("@/pages/result/[idPriority]/page"));

function App() {
  return (
    <Routes>
      <Route index path="/" element={<RootPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/result/:idPriority" element={<ResultDetailPage />} />
    </Routes>
  );
}

export default App;
