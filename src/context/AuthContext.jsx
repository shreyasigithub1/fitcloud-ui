import { createContext, useContext, useState } from "react";
import { isTokenExpired } from "@/utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // on page refresh, read from localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const userName = localStorage.getItem("userName");

    // Catches expired token on app startup / laptop restart
    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      return null;
    }

    return role ? { role, userName, email } : null;
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("role", data.role);
    localStorage.setItem("loginTime", data.loginTime);

    setUser({ role: data.role, email: data.email, userName: data.userName });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
