import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn/signIn.jsx";
import SignUp from "./pages/signUp/signUp.jsx";
import Main from "./pages/home/main.jsx";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo="/signup" />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
