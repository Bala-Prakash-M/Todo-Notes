import { useState, useEffect } from "react";
import { notebookAPI } from "../api/notebookApi";
import type { GetAllNotebook } from "../types/notebook.types";

// 12 Premium Light Pastel Themes
const NOTEBOOK_THEMES = [
  { bg: "#FCE7F3", accent: "#DB2777" }, // Fuchsia
  { bg: "#DBEAFE", accent: "#2563EB" }, // Blue
  { bg: "#F3F4F6", accent: "#4B5563" }, // Slate
  { bg: "#DCFCE7", accent: "#16A34A" }, // Green
  { bg: "#FEF3C7", accent: "#D97706" }, // Amber
  { bg: "#E0F2FE", accent: "#0369A1" }, // Cyan
  { bg: "#E0E7FF", accent: "#4F46E5" }, // Indigo
  { bg: "#F3E8FF", accent: "#9333EA" }, // Purple
  { bg: "#FFE4E6", accent: "#E11D48" }, // Rose
  { bg: "#FFEDD5", accent: "#EA580C" }, // Orange
  { bg: "#CCFBF1", accent: "#0D9488" }, // Teal
  { bg: "#F5F5F4", accent: "#78716C" }, // Stone
];

// Clean, high-performance vector paths
const NOTEBOOK_SHAPES = [
  {
    id: "sparkle",
    path: (
      <path d="M60 0C60 33.1 86.9 60 120 60C86.9 60 60 86.9 60 120C60 86.9 33.1 60 0 60C33.1 60 60 33.1 60 0Z" />
    ),
  },
  {
    id: "burst",
    path: (
      <path d="M60 0L75 35L115 45L85 75L95 115L60 95L25 115L35 75L5 45L45 35Z" />
    ),
  },
  {
    id: "circles",
    path: (
      <>
        <circle
          cx="60"
          cy="60"
          r="55"
          strokeWidth="6"
          stroke="currentColor"
          fill="none"
          className="opacity-40"
        />
        <circle
          cx="60"
          cy="60"
          r="32"
          strokeWidth="6"
          stroke="currentColor"
          fill="none"
          className="opacity-70"
        />
        <circle cx="60" cy="60" r="12" fill="currentColor" />
      </>
    ),
  },
  {
    id: "blob",
    path: (
      <path d="M90 20C110 45 125 75 110 95C95 115 50 125 25 110C0 95 -10 55 10 30C30 5 70 -5 90 20Z" />
    ),
  },
  { id: "diamond", path: <path d="M60 0L120 60L60 120L0 60Z" /> },
  { id: "plus", path: <path d="M45 0H75V45H120V75H75V120H45V75H0V45H45V0Z" /> },
];

const useNotebook = () => {
  const [notebooks, setNotebooks] = useState<GetAllNotebook[]>([]);
  const [notebookError, setNotebookError] = useState<string | null>(null);
  const [isNotebookLoading, setIsNotebookLoading] = useState(false);

  useEffect(() => {
    const getAllNotebooks = async (): Promise<void> => {
      try {
        setIsNotebookLoading(true);
        const response = await notebookAPI.getAllNotebooks();
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
  }, []);

  const createNotebook = async (name: string): Promise<void> => {
    setIsNotebookLoading(true);
    setNotebookError(null);

    try {
      const response = await notebookAPI.createNotebook(name);

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

  const updateNotebook = async (id: string, name: string): Promise<void> => {
    setIsNotebookLoading(true);
    setNotebookError(null);

    try {
      const response = await notebookAPI.updateNotebook(id, name);
      setNotebooks((prev) =>
        prev.map((nb) => (nb.id === id ? { ...nb, name: response.name } : nb))
      );
    } catch (error) {
      if (error instanceof Error) {
        setNotebookError(error.message);
      } else {
        setNotebookError("Something went wrong");
      }
      throw error;
    } finally {
      setIsNotebookLoading(false);
    }
  };

  const deleteNotebook = async (id: string): Promise<void> => {
    setIsNotebookLoading(true);
    setNotebookError(null);

    try {
      await notebookAPI.deleteNotebook(id);
      setNotebooks((prev) => prev.filter((nb) => nb.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setNotebookError(error.message);
      } else {
        setNotebookError("Something went wrong");
      }
      throw error;
    } finally {
      setIsNotebookLoading(false);
    }
  };

  const getNotebookStyles = (id: string) => {
    if (!id) return { theme: NOTEBOOK_THEMES[0], shape: NOTEBOOK_SHAPES[0].path };

    let hashA = 0;
    let hashB = 0;

    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      // Standard hash multiplier for colors
      hashA = char + ((hashA << 5) - hashA);
      // Alternative bitwise shift multiplier for shapes to ensure variance
      hashB = char + ((hashB << 7) - hashB) + i;
    }

    const themeIndex = Math.abs(hashA) % NOTEBOOK_THEMES.length;
    // Modulo against the separate shape array size
    const shapeIndex = Math.abs(hashB) % NOTEBOOK_SHAPES.length;

    return {
      theme: NOTEBOOK_THEMES[themeIndex],
      shape: NOTEBOOK_SHAPES[shapeIndex].path,
    };
  };

  return {
    notebooks,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    notebookError,
    isNotebookLoading,
    getNotebookStyles,
  };
};

export default useNotebook;
