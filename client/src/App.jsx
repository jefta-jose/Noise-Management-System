import "./App.css";
import Login from "./PAGES/Login/Login";
import SignUp from "./PAGES/Login/SignUp";
import AdminDashboard from "./PAGES/adminDashboard/AdminDashboard";
import UserDashboard from "./PAGES/userDashboard/UserDashboard";
import Mails from "./Components/Mails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reports from "./PAGES/adminDashboard/Reports";
import Users from "./PAGES/adminDashboard/Users";
import Report from "./PAGES/userDashboard/Report";
import Userlayout from "./PAGES/userDashboard/Userlayout";
import Notifications from "./PAGES/userDashboard/Notifications";
import Feedback from "./PAGES/userDashboard/Feedback";
import AdminLayout from "./PAGES/adminDashboard/AdminLayout";
import AdminMails from "./PAGES/adminDashboard/AdminMails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route path="adminLayout" element={<AdminLayout/>} />
            <Route path="mails" element={<AdminMails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/userdashboard" element={<UserDashboard />}>
            <Route path="userlayout" element={<Userlayout />}>
              <Route path="notifications" element={<Notifications />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>
            <Route path="mails" element={<Mails />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
