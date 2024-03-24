import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PATH } from "./constants/path";
import Navbar from "./components/shared/Navbar";

const { HOME, MY } = PATH;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={HOME} element={<div>HomePage</div>} />
        <Route path={MY} element={<div>MyPage</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
