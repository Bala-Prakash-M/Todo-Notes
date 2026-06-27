import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { notesAPI } from "../api/notes.api";
import type { Note } from "../types/notes.types";

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState<string | null>();

  const token = localStorage.getItem("token");
  const { notebookId } = useParams<{ notebookId: string }>();

  useEffect(() => {
    if (!token || !notebookId) return;

    const fetchAllNotes = async (): Promise<void> => {
      try {
        setIsNotesLoading(true);
        setNotesError(null);

        const notes = await notesAPI.getAllNotes(token, notebookId);

        setNotes(notes);
      } catch (error) {
        if (error instanceof Error) {
          setNotesError(error.message);
        } else {
          setNotesError("Failed to fetch notes");
        }
      } finally {
        setIsNotesLoading(false);
      }
    };

    fetchAllNotes();
  }, [notebookId, token]);

  return {
    notes,
    setNotes,
    isNotesLoading,
    notesError,
  };
};

export default useNotes;
