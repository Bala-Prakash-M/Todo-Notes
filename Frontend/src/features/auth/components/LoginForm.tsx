import { useState } from "react";
import { authApi } from "../api/auth.api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({
  onSwitchToRegister,
}: LoginFormProps) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await authApi.login({
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Sign In
      </button>

      <p>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
        >
          Register
        </button>
      </p>
    </form>
  );
}