import { api } from "../../../services/api";
import type { Note, NotesResponse } from "../types/notes.types";

export const notesAPI = {
  async getAllNotes(notebookId: string): Promise<Note[]> {
    const response = await api.get<NotesResponse>(
      `/notes/${notebookId}`
    );
    return response.data.data;
  },

  async createNote(
    notebookId: string,
    title: string,
    content: string
  ): Promise<Note> {
    const response = await api.post<{ data: Note }>(
      `/notes/${notebookId}`,
      { title, content }
    );
    return response.data.data;
  },

  async updateNote(
    notebookId: string,
    id: string,
    title: string,
    content: string
  ): Promise<Note> {
    const response = await api.put<{ data: Note }>(
      `/notes/${notebookId}/${id}`,
      { title, content }
    );
    return response.data.data;
  },

  async deleteNote(
    notebookId: string,
    id: string
  ): Promise<void> {
    await api.delete(
      `/notes/${notebookId}/${id}`
    );
  }
};