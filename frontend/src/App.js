import "./App.css";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utilities/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          {/* private routes*/}
          <Route element={<PrivateRoute />}>
            <Route element={<HomePage />} path="/" exact />
            <Route element={<AboutPage />} path="/about" />
          </Route>

          {/* public routes*/}
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
