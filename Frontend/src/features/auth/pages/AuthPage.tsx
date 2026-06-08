import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";


const AuthPage = () => {
  const [mode, setMode] =
    useState<"login" | "register">("login");

  return (
    <>
      {mode === "login" ? (
        <LoginForm
          onSwitchToRegister={() =>
            setMode("register")
          }
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() =>
            setMode("login")
          }
        />
      )}
    </>
  );
}

export default AuthPage;