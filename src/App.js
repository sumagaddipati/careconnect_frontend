import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

/* Senior */
import SeniorDashboard from "./pages/senior/SeniorDashboard";
import SeniorProfile from "./pages/senior/SeniorProfile";
import SeniorCreateRequest from "./pages/senior/SeniorCreateRequests";
import SeniorMyRequests from "./pages/senior/SeniorMyRequests";

/* Volunteer */
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerRequests from "./pages/volunteer/VolunteerRequests";
import VolunteerHistory from "./pages/volunteer/VolunteerHistory";
import VolunteerProfile from "./pages/volunteer/VolunteerProfile";
import VolunteerMyTasks from "./pages/volunteer/VolunteerMyTasks";
import VolunteerMessages from "./pages/family/FamilyMessages";

/* Family */
import FamilyConnect from "./pages/family/FamilyConnect";
import FamilyDashboard from "./pages/family/FamilyDashboard";
import FamilyProfile from "./pages/family/FamilyProfile";
import FamilyRequests from "./pages/family/FamilyRequests";
import FamilyMessageVolunteer from "./pages/family/FamilyMessageVolunteer";
import FamilyEditProfile from "./pages/family/FamilyEditProfile";
import FamilyCreateRequest from "./pages/family/FamilyCreateRequest";
import FamilyMessages from "./pages/family/FamilyMessages";

/* Admin */
import AdminRequests from "./pages/admin/AdminRequests";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminSeniors from "./pages/admin/AdminSeniors";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* SENIOR */}
        <Route path="/senior" element={<Navigate to="/senior/dashboard" />} />
        <Route path="/senior/dashboard" element={<SeniorDashboard />} />
        <Route path="/senior/profile" element={<SeniorProfile />} />
        <Route path="/senior/request" element={<SeniorCreateRequest />} />
        <Route path="/senior/requests" element={<SeniorMyRequests />} />

        {/* FAMILY */}
        <Route path="/family" element={<Navigate to="/family/dashboard" />} />
        <Route path="/family/connect" element={<FamilyConnect />} />
        <Route path="/family/dashboard" element={<FamilyDashboard />} />
        <Route path="/family/profile" element={<FamilyProfile />} />
        <Route path="/family/edit-profile" element={<FamilyEditProfile />} />
        <Route path="/family/requests" element={<FamilyRequests />} />
        <Route path="/family/create-request" element={<FamilyCreateRequest />} />
        <Route path="/family/message" element={<FamilyMessageVolunteer />} />
        <Route path="/family/messages" element={<FamilyMessages />} />


        {/* VOLUNTEER */}
        <Route path="/volunteer" element={<Navigate to="/volunteer/dashboard" />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer/requests" element={<VolunteerRequests />} />
        <Route path="/volunteer/tasks" element={<VolunteerMyTasks />} />
        <Route path="/volunteer/history" element={<VolunteerHistory />} />
        <Route path="/volunteer/profile" element={<VolunteerProfile />} />
        <Route path="/volunteer/messages" element={<VolunteerMessages />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/volunteers" element={<AdminVolunteers />} />
        <Route path="/admin/seniors" element={<AdminSeniors />} />
        <Route path="/admin/messages" element={<AdminMessages />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;