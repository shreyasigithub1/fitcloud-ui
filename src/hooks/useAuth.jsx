import { useMutation } from "@tanstack/react-query";
import {
  registerGymMemberApi,
  registerGymOwnerApi,
  loginAPI,
} from "../api/AuthApi";
import { useAuth } from "@/context/AuthContext";

// ── Register Gym Member ──────────────────────────────

export const useRegisterGymMember = () => {
  return useMutation({
    mutationFn: registerGymMemberApi,

    onSuccess: (data) => {
      console.log("Gym Member registered successfully!", data);
    },

    onError: (error) => {
      console.error("Gym Member register error:", error.message);
    },
  });
};

// ── Register Gym Owner ───────────────────────────────

export const useRegisterGymOwner = () => {
  return useMutation({
    mutationFn: registerGymOwnerApi,

    onSuccess: (data) => {
      console.log("Gym Owner registered successfully!", data);
    },

    onError: (error) => {
      console.error("Gym Owner register error:", error.message);
    },
  });
};

// ── Login ─────────────────────────────────────────────

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

// ── Logout ────────────────────────────────────────────
export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("identifier");
    localStorage.removeItem("loginTime");
    window.location.href = "/login";
  };
  return { logout };
};
