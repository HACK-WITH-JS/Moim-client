import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PATH } from "./constants/path";
import Navbar from "./components/shared/Navbar";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import AuthGuard from "./components/auth/AuthGuard";
import MyArticlePage from "./pages/MyArticlePage";
import MyBookMarkPage from "./pages/MyBookMarkPage";
import PrivateRoute from "./components/auth/PrivateRoute";

const { HOME, MY, MY_ARTICLES, MY_BOOKMARKS } = PATH;

function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path={HOME} element={<HomePage />} />
          <Route
            path={MY}
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path={MY_ARTICLES}
            element={
              <PrivateRoute>
                <MyArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path={MY_BOOKMARKS}
            element={
              <PrivateRoute>
                <MyBookMarkPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

export default App;
