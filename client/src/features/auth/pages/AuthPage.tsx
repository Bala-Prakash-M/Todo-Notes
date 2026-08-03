import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { ArchitecturalTexture } from '../components/Texture';

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    
    <div className="relative min-h-screen w-full bg-[#e9ecf0] flex items-center justify-center overflow-hidden">
      
      {/* Structural Layer: Point Matrix and Architecture pillars */}
      <ArchitecturalTexture />

      {/* Interactive Layer: Beautifully transparent form view container */}
      {/* <div className="relative z-10 w-full max-w-sm"> */}
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}
      {/* </div> */}

    </div>
  );
};

export default AuthPage;