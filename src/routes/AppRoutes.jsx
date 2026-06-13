import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth-pages/login/Login";
import SelectRole from "../pages/auth-pages/register/SelectRole";
import GymOwnerRegister from "@/pages/auth-pages/register/GymOwnerRegister";
import MemberRegister from "@/pages/auth-pages/register/MemberRegister";

import AdminDashboard from "../pages/dashboard/admin-dashboard/AdminDashboard";
// import OwnerDashboard from "@/pages/owner/OwnerDashboard";
// import MemberDashboard from "@/pages/member/MemberDashboard";

import RoleProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/member-register" element={<MemberRegister />} />
      <Route path="/gym-owner-register" element={<GymOwnerRegister />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* Owner */}
      {/* <Route
        path="/owner"
        element={
          <RoleProtectedRoute allowedRoles={["ROLE_GYM_OWNER"]}>
            <OwnerDashboard />
          </RoleProtectedRoute>
        }
      /> */}

      {/* Member */}
      {/* <Route
        path="/member"
        element={
          <RoleProtectedRoute allowedRoles={["ROLE_MEMBER"]}>
            <MemberDashboard />
          </RoleProtectedRoute>
        }
      /> */}
    </Routes>
  );
}
