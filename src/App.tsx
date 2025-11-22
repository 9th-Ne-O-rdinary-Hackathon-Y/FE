import { Route, Routes } from "react-router-dom";

import RootPage from "./pages/root/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
    </Routes>
  );
}

export default App;
