// hooks/useInactivityLogout.js
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in ms

export const useInactivityLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const resetTimer = () => {
    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start a fresh 10 min countdown
    timerRef.current = setTimeout(() => {
      logout();
      navigate("/", { replace: true });
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    // These events count as "activity"
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];

    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer(); // start timer on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
};