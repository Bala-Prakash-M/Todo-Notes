import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../app/providers/AuthContext";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: contextLogin, register: contextRegister } = useAuthContext();
  const [loginError, setLoginError] = useState("");
  const [loginIsSubmitting, setLoginIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerIsSubmitting, setRegisterIsSubmitting] = useState(false);

  const getErrorMessage = (error: unknown, fallback: string): string => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      if (data && typeof data === "object") {
        if (typeof data.message === "string") {
          return data.message;
        }
        if (Array.isArray(data.message)) {
          return data.message
            .map((issue: any) => `${issue.path ? issue.path.join(".") + ": " : ""}${issue.message}`)
            .join(", ");
        }
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    return fallback;
  };

  const handleLoginSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    setLoginError("");
    setLoginIsSubmitting(true);

    const apiCall = contextLogin(email, password);
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await Promise.all([apiCall, delay]);
      navigate("/notebooks");
    } catch (error) {
      setLoginError(getErrorMessage(error, "Invalid email or password combination."));
    } finally {
      setLoginIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    e.preventDefault();
    setRegisterError("");
    setRegisterIsSubmitting(true);

    const apiCall = contextRegister(name, email, password);
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await Promise.all([apiCall, delay]);
      navigate("/notebooks");
    } catch (error) {
      setRegisterError(getErrorMessage(error, "Error in registering."));
    } finally {
      setRegisterIsSubmitting(false);
    }
  };

  return {
    handleLoginSubmit,
    loginError,
    loginIsSubmitting,
    registerError,
    registerIsSubmitting,
    handleRegisterSubmit,
  };
};
