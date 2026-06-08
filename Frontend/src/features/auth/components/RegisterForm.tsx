import { useState } from "react";
import { authApi } from "../api/auth.api";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({
  onSwitchToLogin,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response =
        await authApi.register({
          name,
          email,
          password,
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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
        Create Account
      </button>

      <p>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </form>
  );
}