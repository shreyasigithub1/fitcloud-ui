import { useState } from "react";
import Login from "../auth-pages/login/Login";
import SelectRole from "../auth-pages/register/SelectRole";
import GymOwnerRegister from "../auth-pages/register/GymOwnerRegister";
import MemberRegister from "../auth-pages/register/MemberRegister";

export default function AuthPage() {
  const [screen, setScreen] = useState("login");

  return (
    <>
      {screen === "login" && (
        <Login onCreateAccount={() => setScreen("select-role")} />
      )}

      {screen === "select-role" && (
        <SelectRole
          onSelectMember={() => setScreen("member-register")}
          onSelectGymOwner={() => setScreen("gym-owner-register")}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "member-register" && (
        <MemberRegister onBack={() => setScreen("select-role")} />
      )}

      {screen === "gym-owner-register" && (
        <GymOwnerRegister onBack={() => setScreen("select-role")} />
      )}
    </>
  );
}