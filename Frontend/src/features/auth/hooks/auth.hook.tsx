import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginIsSubmitting, setLoginIsSubmitting] = useState(false);

  const handleLoginSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    setLoginError("");
    setLoginIsSubmitting(true);

    const apiCall = authApi.login({ email, password });
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const [response] = await Promise.all([apiCall, delay]);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("email", response.user.email);
      
      navigate("/notebooks");
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("Invalid email or password combination.");
      }
    } finally {
      setLoginIsSubmitting(false);
    }
  };

  return {
    handleLoginSubmit,
    loginError,
    loginIsSubmitting,
  };
};
