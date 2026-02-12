import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, ForgetedPwdPage } from "./features/auth";
import DashboardUsersManage from "./features/admin-users/pages/DashboardUsersManage";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.auth} element={<AuthPage />} />
        <Route path={routes.forgetedPassword} element={<ForgetedPwdPage />} />
        <Route path={routes.adminUsers} element={<DashboardUsersManage />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
