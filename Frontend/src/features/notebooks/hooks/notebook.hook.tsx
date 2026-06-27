import { useState, useEffect } from "react";
import { notebookAPI } from "../api/notebookApi";
import type { GetAllNotebook } from "../types/notebook.types";

const useNotebook = () => {
  const [notebooks, setNotebooks] = useState<GetAllNotebook[]>([]);
  const [notebookError, setNotebookError] = useState<string | null>(null);
  const [isNotebookLoading, setIsNotebookLoading] = useState(false);

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const getAllNotebooks = async (): Promise<void> => {
      try {
        setIsNotebookLoading(true);
  
        const response = await notebookAPI.getAllNotebooks(token!);
        setNotebooks(response);
      } catch (error) {
        if (error instanceof Error) {
          setNotebookError(error.message);
        } else {
          setNotebookError("Something went wrong");
        }
      } finally {
        setIsNotebookLoading(false);
      }
    };

    getAllNotebooks();

  }, [token])

  const createNotebook = async (name: string): Promise<void> => {
    setIsNotebookLoading(true);
    setNotebookError(null);

    try {
      const response = await notebookAPI.createNotebook(token!, name);

      const newNotebook = {
        ...response,
        notes: [],
      };
      setNotebooks((prev) => [...prev, newNotebook]);
    } catch (error) {
      if (error instanceof Error) {
        setNotebookError(error.message);
      } else {
        setNotebookError("Something went wrong");
      }
    } finally {
      setIsNotebookLoading(false);
    }
  };

  return {
    notebooks,
    createNotebook,
    notebookError,
    isNotebookLoading,
  };
};
export default useNotebook;
