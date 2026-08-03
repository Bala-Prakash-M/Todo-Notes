import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { notesAPI } from "../api/notes.api";
import type { Note } from "../types/notes.types";

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState<string | null>();

  const { notebookId } = useParams<{ notebookId: string }>();

  useEffect(() => {
    if (!notebookId) {
      const timer = setTimeout(() => {
        setNotes([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const fetchAllNotes = async (): Promise<void> => {
      try {
        setIsNotesLoading(true);
        setNotesError(null);

        const notes = await notesAPI.getAllNotes(notebookId);
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
  }, [notebookId]);

  const createNote = async (title: string, content: string): Promise<Note> => {
    if (!notebookId) {
      throw new Error("Missing active notebook selection");
    }
    setIsNotesLoading(true);
    try {
      const newNote = await notesAPI.createNote(notebookId, title, content);
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to create note";
      setNotesError(errMsg);
      throw error;
    } finally {
      setIsNotesLoading(false);
    }
  };

  const updateNote = async (id: string, title: string, content: string): Promise<Note> => {
    if (!notebookId) {
      throw new Error("Missing active notebook selection");
    }
    try {
      const updatedNote = await notesAPI.updateNote(notebookId, id, title, content);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? updatedNote : n))
      );
      return updatedNote;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to update note";
      setNotesError(errMsg);
      throw error;
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    if (!notebookId) {
      throw new Error("Missing active notebook selection");
    }
    setIsNotesLoading(true);
    try {
      await notesAPI.deleteNote(notebookId, id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to delete note";
      setNotesError(errMsg);
      throw error;
    } finally {
      setIsNotesLoading(false);
    }
  };

  return {
    notes,
    setNotes,
    isNotesLoading,
    notesError,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
